
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Scan, Loader2 } from 'lucide-react';
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
    }
  };

  const simulateAIDetection = (imageData: string): Promise<DetectionResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI detection with random results for demo
        const plasticTypes = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'];
        const randomType = plasticTypes[Math.floor(Math.random() * plasticTypes.length)];
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
        
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
      // Simulate AI detection
      const detectionResult = await simulateAIDetection(preview!);
      setResult(detectionResult);

      // Save scan to database
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

      // Update user stats
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please use file upload instead.",
        variant: "destructive",
      });
    }
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
          }
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-6 w-6" />
            AI Plastic Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-2"
            >
              <Upload className="h-8 w-8" />
              Upload Image
            </Button>
            <Button
              onClick={startCamera}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-2"
            >
              <Camera className="h-8 w-8" />
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

          <video ref={videoRef} autoPlay className="hidden w-full rounded-lg" />
          <canvas ref={canvasRef} className="hidden" />

          {preview && (
            <div className="space-y-4">
              <img src={preview} alt="Selected" className="w-full max-w-md mx-auto rounded-lg" />
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
                <CardTitle className="text-lg">Scan Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Plastic Type:</span>
                  <Badge variant={result.recyclable ? "default" : "destructive"}>
                    {result.plasticType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Confidence:</span>
                  <span>{result.confidence}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Recyclable:</span>
                  <Badge variant={result.recyclable ? "default" : "destructive"}>
                    {result.recyclable ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium mb-1">Recycling Instructions:</p>
                  <p className="text-sm text-gray-600">{result.instructions}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Environmental Impact:</p>
                  <p className="text-sm text-gray-600">{result.environmentalImpact}</p>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="font-medium text-green-700">Eco-Points Earned:</span>
                  <span className="font-bold text-green-700">+{result.ecoPoints}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
