import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Scan, Loader2, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
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
      setResult(null);
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
          },
          LDPE: {
            plasticType: 'LDPE (Low-Density Polyethylene)',
            confidence,
            recyclable: true,
            instructions: 'Take to special collection bins at grocery stores. Not curbside recyclable.',
            environmentalImpact: 'Recyclable but requires special facilities',
            ecoPoints: 8
          },
          PP: {
            plasticType: 'PP (Polypropylene)',
            confidence,
            recyclable: true,
            instructions: 'Clean thoroughly, increasingly accepted in recycling programs.',
            environmentalImpact: 'Good recyclability, growing acceptance in programs',
            ecoPoints: 9
          },
          PS: {
            plasticType: 'PS (Polystyrene)',
            confidence,
            recyclable: false,
            instructions: 'Rarely recyclable in standard programs. Look for special collection events.',
            environmentalImpact: 'Very difficult to recycle, breaks into microplastics easily',
            ecoPoints: 3
          }
        };

        resolve(results[randomType] || results.PET);
      }, 2000);
    });
  };

  const scanImage = async () => {
    if (!selectedFile) return;

    setIsScanning(true);
    try {
      const detectionResult = await simulateAIDetection(preview!);
      setResult(detectionResult);

      toast({
        title: "Scan Complete! 🎉",
        description: `Detected ${detectionResult.plasticType}!`,
      });

    } catch (error: any) {
      console.error('Scan error:', error);
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
      stopCamera();
      
      console.log('Requesting camera permission...');
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained successfully');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraActive(true);
        setPreview(null);
        setSelectedFile(null);
        setResult(null);
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
    } catch (error: any) {
      console.error('Camera error:', error);
      let errorMessage = "Unable to access camera. Please check permissions and try again.";
      
      if (error.name === 'NotAllowedError') {
        errorMessage = "Camera permission denied. Please allow camera access and try again.";
      } else if (error.name === 'NotFoundError') {
        errorMessage = "No camera found. Please ensure your device has a camera.";
      } else if (error.name === 'NotSupportedError') {
        errorMessage = "Camera not supported by your browser. Try using file upload instead.";
      }
      
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    if (cameraActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            setPreview(canvas.toDataURL('image/jpeg', 0.8));
            stopCamera();
            console.log('Photo captured successfully');
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">AI Plastic Scanner</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Identify plastic types instantly and learn how to recycle them properly
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Scan className="h-5 w-5 md:h-6 md:w-6" />
            Scan Your Item
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Use your camera or upload an image to identify plastic types and get recycling guidance
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-20 md:h-24 flex flex-col items-center justify-center gap-2 text-sm md:text-base"
            >
              <Upload className="h-6 w-6 md:h-8 md:w-8" />
              Upload Image
              <span className="text-xs text-gray-500">JPG, PNG, WebP</span>
            </Button>
            <Button
              onClick={startCamera}
              variant="outline"
              className="h-20 md:h-24 flex flex-col items-center justify-center gap-2 text-sm md:text-base"
              disabled={cameraActive}
            >
              <Camera className="h-6 w-6 md:h-8 md:w-8" />
              Use Camera
              <span className="text-xs text-gray-500">Real-time scan</span>
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
            <Card className="overflow-hidden">
              <CardContent className="p-0 relative">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  muted
                  className="w-full h-64 md:h-80 object-cover bg-black"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <Button onClick={capturePhoto} size="lg" className="bg-white text-black hover:bg-gray-100">
                    <Camera className="h-5 w-5 mr-2" />
                    Capture
                  </Button>
                  <Button onClick={switchCamera} variant="outline" size="lg" className="bg-white/80">
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                  <Button onClick={stopCamera} variant="outline" size="lg" className="bg-white/80">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {facingMode === 'environment' ? 'Back Camera' : 'Front Camera'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {preview && !cameraActive && (
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={preview} 
                    alt="Selected for scanning" 
                    className="w-full max-h-80 object-contain bg-gray-50" 
                  />
                </CardContent>
              </Card>
              <Button 
                onClick={scanImage} 
                disabled={isScanning}
                className="w-full"
                size="lg"
              >
                {isScanning ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing with AI...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Scan className="h-5 w-5" />
                    Scan for Plastic Type
                  </div>
                )}
              </Button>
            </div>
          )}

          {result && (
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-green-800">
                  ✨ Scan Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span className="font-medium text-sm md:text-base">Plastic Type:</span>
                      <Badge variant={result.recyclable ? "default" : "destructive"} className="w-fit">
                        {result.plasticType}
                      </Badge>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span className="font-medium text-sm md:text-base">Confidence:</span>
                      <span className="text-sm md:text-base font-mono">{result.confidence}%</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span className="font-medium text-sm md:text-base">Recyclable:</span>
                      <Badge variant={result.recyclable ? "default" : "destructive"} className="w-fit">
                        {result.recyclable ? "✓ Yes" : "✗ No"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-2 text-sm md:text-base text-gray-800">♻️ Recycling Instructions:</p>
                    <p className="text-xs md:text-sm text-gray-700 bg-white p-3 rounded border">{result.instructions}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2 text-sm md:text-base text-gray-800">🌍 Environmental Impact:</p>
                    <p className="text-xs md:text-sm text-gray-700 bg-white p-3 rounded border">{result.environmentalImpact}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <Button 
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      setResult(null);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Scan Another Item
                  </Button>
                  <Button 
                    onClick={startCamera}
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Use Camera Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📱 How to Use the Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Camera Tips:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Ensure good lighting</li>
                <li>• Hold camera steady</li>
                <li>• Get close to the item</li>
                <li>• Use the switch camera button if needed</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Best Results:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Focus on recycling symbols</li>
                <li>• Include product labels</li>
                <li>• Avoid reflective surfaces</li>
                <li>• Clean items work better</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
