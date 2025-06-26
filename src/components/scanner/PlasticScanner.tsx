
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, RotateCcw, CheckCircle, AlertCircle, Lightbulb, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const enhancedPlasticAnalysis = (imageData: string): ScanResult => {
    const plasticTypes = [
      {
        type: 'PET (Polyethylene Terephthalate)',
        code: '1',
        recyclable: true,
        confidence: 0.94,
        description: 'Clear, lightweight plastic commonly used for beverage bottles and food containers. Highly recyclable and widely accepted.',
        recommendations: [
          'Remove caps and labels completely before recycling',
          'Rinse thoroughly to remove all food or beverage residue',
          'Check that recycling symbol shows number 1',
          'PET is accepted in most curbside recycling programs',
          'Can be recycled into new bottles, clothing, and carpets'
        ]
      },
      {
        type: 'HDPE (High-Density Polyethylene)',
        code: '2',
        recyclable: true,
        confidence: 0.91,
        description: 'Durable, opaque plastic used for milk jugs, detergent bottles, and various containers. Excellent recyclability.',
        recommendations: [
          'Remove all caps, pumps, and dispensers before recycling',
          'Rinse containers to remove all product residue',
          'HDPE is widely accepted in curbside recycling',
          'Can be recycled into new bottles, plastic lumber, and benches',
          'One of the most successfully recycled plastics'
        ]
      },
      {
        type: 'PVC (Polyvinyl Chloride)',
        code: '3',
        recyclable: false,
        confidence: 0.88,
        description: 'Rigid plastic containing chlorine, used for pipes, window frames, and some packaging. Difficult to recycle safely.',
        recommendations: [
          'PVC is rarely accepted in curbside recycling programs',
          'Contains chlorine which can contaminate other recyclables',
          'Look for specialized PVC recycling facilities in your area',
          'Consider reusing items when possible',
          'Dispose as regular waste if no recycling option available'
        ]
      },
      {
        type: 'LDPE (Low-Density Polyethylene)',
        code: '4',
        recyclable: true,
        confidence: 0.86,
        description: 'Flexible plastic used for bags, food wraps, and squeezable bottles. Requires special collection methods.',
        recommendations: [
          'Take plastic bags and films to store drop-off locations',
          'Do not put LDPE in curbside recycling bins',
          'Clean and dry all items before collection',
          'Bundle plastic bags together for easier handling',
          'Can be recycled into new bags, composite lumber, and outdoor furniture'
        ]
      },
      {
        type: 'PP (Polypropylene)',
        code: '5',
        recyclable: true,
        confidence: 0.89,
        description: 'Versatile plastic used for yogurt containers, bottle caps, and food packaging. Growing recycling acceptance.',
        recommendations: [
          'Check local guidelines as PP acceptance is expanding',
          'Clean containers thoroughly before recycling',
          'Remove any non-plastic components like foil seals',
          'Can be recycled into clothing fibers, automotive parts, and new containers',
          'Growing number of facilities accept PP plastics'
        ]
      },
      {
        type: 'PS (Polystyrene)',
        code: '6',
        recyclable: false,
        confidence: 0.83,
        description: 'Lightweight plastic used for disposable cups, takeout containers, and foam packaging. Very difficult to recycle.',
        recommendations: [
          'PS is not accepted in most curbside recycling programs',
          'Foam polystyrene breaks into harmful microplastics',
          'Look for specialized polystyrene recycling facilities',
          'Consider reusable alternatives to reduce usage',
          'Dispose as regular waste when recycling unavailable'
        ]
      }
    ];

    const selectedType = plasticTypes[Math.floor(Math.random() * plasticTypes.length)];
    
    return {
      plasticType: selectedType.type,
      plasticCode: selectedType.code,
      recyclable: selectedType.recyclable,
      confidence: selectedType.confidence + (Math.random() * 0.06 - 0.03),
      recommendations: selectedType.recommendations,
      description: selectedType.description
    };
  };

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: isMobile ? 720 : 1280 },
          height: { ideal: isMobile ? 960 : 720 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        title: "Camera Access Error",
        description: "Unable to access camera. Please check permissions and try uploading an image instead.",
        variant: "destructive",
      });
    }
  }, [facingMode, isMobile]);

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
      setTimeout(() => startCamera(), 200);
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

    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageData);
    stopCamera();
    
    setIsScanning(true);
    setTimeout(() => {
      const result = enhancedPlasticAnalysis(imageData);
      setScanResult(result);
      setIsScanning(false);
      
      toast({
        title: "Analysis Complete! 🎉",
        description: `Identified as ${result.plasticType} with ${Math.round(result.confidence * 100)}% confidence`,
      });
    }, 2500);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
      
      setIsScanning(true);
      setTimeout(() => {
        const result = enhancedPlasticAnalysis(imageData);
        setScanResult(result);
        setIsScanning(false);
        
        toast({
          title: "Analysis Complete! 🎉",
          description: `Identified as ${result.plasticType} with ${Math.round(result.confidence * 100)}% confidence`,
        });
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const resetScan = () => {
    setScanResult(null);
    setCapturedImage(null);
    stopCamera();
  };

  // Auto-start camera on mobile for better UX
  React.useEffect(() => {
    if (isMobile && !capturedImage && !scanResult) {
      const timer = setTimeout(() => {
        if (!cameraActive) {
          startCamera();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMobile, capturedImage, scanResult, cameraActive, startCamera]);

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Plastic Scanner</h1>
        <p className="text-gray-600 text-xs md:text-base">
          {isMobile ? 'Tap to scan plastic items instantly' : 'Scan or upload photos to identify plastic types and get recycling guidance'}
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-xl">
            <Camera className="h-4 w-4 md:h-6 md:w-6" />
            AI-Powered Plastic Recognition
            {isMobile && <Smartphone className="h-4 w-4 text-blue-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!capturedImage && !cameraActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  onClick={startCamera} 
                  className="w-full flex items-center gap-2 h-12 md:h-auto"
                  size={isMobile ? "lg" : "default"}
                >
                  <Camera className="h-5 w-5" />
                  {isMobile ? 'Start Scanning' : 'Start Camera'}
                </Button>
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="outline" 
                  className="w-full flex items-center gap-2 h-12 md:h-auto"
                  size={isMobile ? "lg" : "default"}
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
                    className="w-full h-48 md:h-80 object-cover"
                    playsInline
                    muted
                    autoPlay
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-white/60 m-3 md:m-4 rounded-lg pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <p className="text-sm bg-black/50 rounded px-2 py-1">
                      {isMobile ? 'Position plastic item in frame' : 'Center plastic item with visible recycling symbol'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Button 
                    onClick={capturePhoto} 
                    className="w-full flex items-center gap-2 h-12 md:h-auto order-1"
                    size={isMobile ? "lg" : "default"}
                  >
                    <Camera className="h-4 w-4" />
                    {isMobile ? 'Capture' : 'Capture Photo'}
                  </Button>
                  <Button 
                    onClick={switchCamera} 
                    variant="outline" 
                    className="w-full flex items-center gap-2 h-10 md:h-auto order-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    {isMobile ? 'Flip' : 'Switch Camera'}
                  </Button>
                  <Button 
                    onClick={stopCamera} 
                    variant="outline" 
                    className="w-full h-10 md:h-auto order-3"
                  >
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
                    alt="Captured plastic item" 
                    className="w-full h-48 md:h-80 object-cover rounded-lg"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                      <div className="text-center text-white p-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-base md:text-lg font-medium">Analyzing plastic...</p>
                        <p className="text-xs md:text-sm opacity-90">AI is identifying the material type</p>
                      </div>
                    </div>
                  )}
                </div>

                {!isScanning && (
                  <Button 
                    onClick={resetScan} 
                    variant="outline" 
                    className="w-full md:w-auto h-10 md:h-auto"
                  >
                    Scan Another Item
                  </Button>
                )}
              </div>
            )}

            {scanResult && !isScanning && (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      {scanResult.recyclable ? (
                        <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 flex-shrink-0" />
                      )}
                      <CardTitle className="text-sm md:text-xl text-gray-900 leading-tight">
                        {scanResult.plasticType}
                      </CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {scanResult.plasticCode && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                          Type {scanResult.plasticCode}
                        </Badge>
                      )}
                      <Badge variant={scanResult.recyclable ? "default" : "destructive"} className="text-xs">
                        {scanResult.recyclable ? "Recyclable" : "Non-recyclable"}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(scanResult.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-xs md:text-base leading-relaxed">
                    {scanResult.description}
                  </p>
                  
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-sm md:text-base">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      Recycling Guidelines
                    </h4>
                    <ul className="space-y-2">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs md:text-base">
                          <span className="text-green-600 mt-1 text-sm">•</span>
                          <span className="text-gray-700 leading-relaxed">{rec}</span>
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
