
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Scan, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface DetectionResult {
  plasticType: string;
  confidence: number;
  recyclable: boolean;
  instructions: string;
  environmentalImpact: string;
  ecoPoints: number;
}

export const PlasticScanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      setCameraActive(false);
      stopCamera();
    }
  };

  const simulateAIDetection = (imageData: string): Promise<DetectionResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plasticTypes = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'];
        const randomType = plasticTypes[Math.floor(Math.random() * plasticTypes.length)];
        const confidence = Math.floor(Math.random() * 30) + 70;
        
        const results: Record<string, DetectionResult> = {
          PET: {
            plasticType: 'PET (Polyethylene Terephthalate)',
            confidence,
            recyclable: true,
            instructions: 'Rinse clean, remove caps and labels. Most recycling programs accept PET bottles.',
            environmentalImpact: 'Highly recyclable, can be turned into new bottles, clothing, and carpets',
            ecoPoints: 10
          },
          HDPE: {
            plasticType: 'HDPE (High-Density Polyethylene)',
            confidence,
            recyclable: true,
            instructions: 'Rinse thoroughly, keep caps on. Widely accepted in curbside recycling.',
            environmentalImpact: 'Very recyclable, minimal environmental impact when recycled properly',
            ecoPoints: 12
          },
          PVC: {
            plasticType: 'PVC (Polyvinyl Chloride)',
            confidence,
            recyclable: false,
            instructions: 'Generally not recyclable in curbside programs. Check for special collection sites.',
            environmentalImpact: 'Contains harmful chemicals, difficult to recycle safely',
            ecoPoints: 5
          }
        };

        resolve(results[randomType] || results.PET);
      }, 2000);
    });
  };

  const scanImage = async () => {
    if (!selectedFile || !user) return;

    setIsScanning(true);
    try {
      const detectionResult = await simulateAIDetection(preview!);
      setResult(detectionResult);

      const { error } = await supabase
        .from('scan_history')
        .insert({
          user_id: user.id,
          image_url: preview!,
          detected_items: { plastic_type: detectionResult.plasticType },
          confidence_score: detectionResult.confidence,
          recyclable: detectionResult.recyclable,
          disposal_method: detectionResult.instructions,
          eco_points_earned: detectionResult.ecoPoints
        });

      if (error) throw error;

      await supabase.rpc('update_user_stats', {
        p_user_id: user.id,
        p_eco_points: detectionResult.ecoPoints,
        p_co2_saved: detectionResult.recyclable ? 0.5 : 0
      });

      toast({
        title: "Scan Complete!",
        description: `Earned ${detectionResult.ecoPoints} eco-points for this scan!`,
      });

    } catch (error: any) {
      toast({
        title: "Scan failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraActive(true);
        setPreview(null);
        setSelectedFile(null);
        setResult(null);
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please use file upload instead.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            setPreview(canvasRef.current!.toDataURL());
            stopCamera();
          }
        });
      }
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Scan className="h-5 w-5 md:h-6 md:w-6" />
            AI Plastic Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-24 md:h-32 flex flex-col items-center justify-center gap-2 text-sm md:text-base"
            >
              <Upload className="h-6 w-6 md:h-8 md:w-8" />
              Upload Image
            </Button>
            <Button
              onClick={startCamera}
              variant="outline"
              className="h-24 md:h-32 flex flex-col items-center justify-center gap-2 text-sm md:text-base"
            >
              <Camera className="h-6 w-6 md:h-8 md:w-8" />
              Use Camera
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {cameraActive && (
            <div className="relative">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="w-full rounded-lg max-h-[400px] object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button onClick={capturePhoto} size="lg">
                  Capture Photo
                </Button>
                <Button onClick={stopCamera} variant="outline" size="lg">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {preview && !cameraActive && (
            <div className="space-y-4">
              <img 
                src={preview} 
                alt="Selected" 
                className="w-full max-w-md mx-auto rounded-lg object-cover max-h-[400px]" 
              />
              <Button 
                onClick={scanImage} 
                disabled={isScanning}
                className="w-full"
              >
                {isScanning ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </div>
                ) : (
                  'Scan for Plastic Type'
                )}
              </Button>
            </div>
          )}

          {result && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Scan Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="font-medium text-sm md:text-base">Plastic Type:</span>
                  <Badge variant={result.recyclable ? "default" : "destructive"} className="w-fit">
                    {result.plasticType}
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="font-medium text-sm md:text-base">Confidence:</span>
                  <span className="text-sm md:text-base">{result.confidence}%</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="font-medium text-sm md:text-base">Recyclable:</span>
                  <Badge variant={result.recyclable ? "default" : "destructive"} className="w-fit">
                    {result.recyclable ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium mb-1 text-sm md:text-base">Recycling Instructions:</p>
                  <p className="text-xs md:text-sm text-gray-600">{result.instructions}</p>
                </div>
                <div>
                  <p className="font-medium mb-1 text-sm md:text-base">Environmental Impact:</p>
                  <p className="text-xs md:text-sm text-gray-600">{result.environmentalImpact}</p>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="font-medium text-green-700 text-sm md:text-base">Eco-Points Earned:</span>
                  <span className="font-bold text-green-700 text-sm md:text-base">+{result.ecoPoints}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
