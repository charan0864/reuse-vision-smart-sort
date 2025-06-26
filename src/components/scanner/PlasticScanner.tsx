
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, RotateCcw, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ScanResult {
  plasticType: string;
  recyclable: boolean;
  confidence: number;
  recommendations: string[];
  description: string;
  plasticCode?: string;
}

export const PlasticScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const advancedPlasticAnalysis = (imageData: string): ScanResult => {
    // Enhanced AI simulation with more detailed analysis
    const plasticTypes = [
      {
        type: 'PET (Polyethylene Terephthalate)',
        code: '1',
        recyclable: true,
        confidence: 0.92,
        description: 'Clear plastic commonly used for water bottles and food containers',
        recommendations: [
          'Remove caps and labels before recycling',
          'Rinse thoroughly to remove any residue',
          'Check if your local facility accepts PET',
          'Look for the recycling symbol with number 1'
        ]
      },
      {
        type: 'HDPE (High-Density Polyethylene)',
        code: '2',
        recyclable: true,
        confidence: 0.89,
        description: 'Durable plastic used for milk jugs, detergent bottles, and pipes',
        recommendations: [
          'Remove all caps and labels',
          'Clean thoroughly before recycling',
          'HDPE is widely accepted in curbside programs',
          'Can be recycled into new bottles and containers'
        ]
      },
      {
        type: 'PVC (Polyvinyl Chloride)',
        code: '3',
        recyclable: false,
        confidence: 0.85,
        description: 'Rigid plastic used for pipes, window frames, and some packaging',
        recommendations: [
          'PVC is rarely accepted in curbside recycling',
          'Check for specialized PVC recycling programs',
          'Consider reusing for other purposes',
          'Dispose of as regular waste if no recycling option'
        ]
      },
      {
        type: 'LDPE (Low-Density Polyethylene)',
        code: '4',
        recyclable: true,
        confidence: 0.78,
        description: 'Flexible plastic used for bags, food wraps, and squeezable bottles',
        recommendations: [
          'Take plastic bags to store drop-off locations',
          'Clean squeeze bottles before recycling',
          'Not accepted in most curbside programs',
          'Look for special collection points'
        ]
      },
      {
        type: 'PP (Polypropylene)',
        code: '5',
        recyclable: true,
        confidence: 0.87,
        description: 'Versatile plastic used for yogurt containers, bottle caps, and straws',
        recommendations: [
          'Growing acceptance in recycling programs',
          'Clean containers thoroughly',
          'Check local guidelines for PP acceptance',
          'Can be recycled into clothing fibers and carpets'
        ]
      }
    ];

    // Simulate more sophisticated image analysis
    const selectedType = plasticTypes[Math.floor(Math.random() * plasticTypes.length)];
    
    return {
      plasticType: selectedType.type,
      plasticCode: selectedType.code,
      recyclable: selectedType.recyclable,
      confidence: selectedType.confidence + (Math.random() * 0.08 - 0.04), // Add slight variation
      recommendations: selectedType.recommendations,
      description: selectedType.description
    };
  };

  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions and try again.",
        variant: "destructive",
      });
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (cameraActive) {
      stopCamera();
      setTimeout(() => startCamera(), 100);
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
    
    // Simulate processing
    setIsScanning(true);
    setTimeout(() => {
      const result = advancedPlasticAnalysis(imageData);
      setScanResult(result);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete! 🎉",
        description: `Identified as ${result.plasticType} with ${Math.round(result.confidence * 100)}% confidence`,
      });
    }, 2000);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
      
      setIsScanning(true);
      setTimeout(() => {
        const result = advancedPlasticAnalysis(imageData);
        setScanResult(result);
        setIsScanning(false);
        
        toast({
          title: "Analysis Complete! 🎉",
          description: `Identified as ${result.plasticType} with ${Math.round(result.confidence * 100)}% confidence`,
        });
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const resetScan = () => {
    setScanResult(null);
    setCapturedImage(null);
    stopCamera();
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Plastic Scanner</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Scan or upload a photo to identify plastic types and get recycling guidance
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Camera className="h-5 w-5 md:h-6 md:w-6" />
            AI-Powered Plastic Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!capturedImage && !cameraActive && (
              <div className="flex flex-col md:flex-row gap-4">
                <Button 
                  onClick={startCamera} 
                  className="w-full md:w-auto flex items-center gap-2"
                  size="lg"
                >
                  <Camera className="h-5 w-5" />
                  Start Camera
                </Button>
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="outline" 
                  className="w-full md:w-auto flex items-center gap-2"
                  size="lg"
                >
                  <Upload className="h-5 w-5" />
                  Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}

            {cameraActive && (
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-64 md:h-80 object-cover"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 rounded-lg pointer-events-none"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Button onClick={capturePhoto} className="w-full md:w-auto flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Capture Photo
                  </Button>
                  <Button onClick={switchCamera} variant="outline" className="w-full md:w-auto flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Switch Camera
                  </Button>
                  <Button onClick={stopCamera} variant="outline" className="w-full md:w-auto">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {capturedImage && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured item" 
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-lg font-medium">Analyzing plastic...</p>
                        <p className="text-sm opacity-90">AI is identifying the material type</p>
                      </div>
                    </div>
                  )}
                </div>

                {!isScanning && (
                  <Button onClick={resetScan} variant="outline" className="w-full md:w-auto">
                    Scan Another Item
                  </Button>
                )}
              </div>
            )}

            {scanResult && !isScanning && (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {scanResult.recyclable ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      )}
                      <CardTitle className="text-lg md:text-xl text-gray-900">
                        {scanResult.plasticType}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {scanResult.plasticCode && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Type {scanResult.plasticCode}
                        </Badge>
                      )}
                      <Badge variant={scanResult.recyclable ? "default" : "destructive"}>
                        {scanResult.recyclable ? "Recyclable" : "Non-recyclable"}
                      </Badge>
                      <Badge variant="secondary">
                        {Math.round(scanResult.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    {scanResult.description}
                  </p>
                  
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      Recycling Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm md:text-base">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
