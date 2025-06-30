
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Zap, Share2, RefreshCw, CheckCircle, AlertCircle, Recycle, Sparkles, Brain, Microscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScanResult {
  id: string;
  plasticType: {
    name: string;
    code: string;
    description: string;
    recyclable: boolean;
    recyclingInstructions: string;
    chemicalComposition: string;
    environmentalImpact: string;
    degradationTime: string;
    alternatives: string[];
  };
  confidence: number;
  aiAnalysis: {
    condition: string;
    contamination: string;
    recyclingGrade: string;
    recommendedAction: string;
  };
}

const mockScanResults: { [key: string]: ScanResult } = {
  bottle: {
    id: '1',
    plasticType: {
      name: 'PET (Polyethylene Terephthalate)',
      code: '1',
      description: 'Crystal-clear, lightweight thermoplastic polymer commonly used for beverage containers and food packaging.',
      recyclable: true,
      recyclingInstructions: 'Remove cap and label, rinse thoroughly with warm water. Accepted in most curbside programs. Can be recycled into clothing fibers, carpets, and new bottles.',
      chemicalComposition: 'C₁₀H₈O₄ - Linear aromatic polyester',
      environmentalImpact: 'Moderate impact - takes 450+ years to decompose naturally',
      degradationTime: '450-1000 years',
      alternatives: ['Glass bottles', 'Aluminum cans', 'Stainless steel containers', 'Biodegradable PLA bottles']
    },
    confidence: 0.97,
    aiAnalysis: {
      condition: 'Excellent - clean and undamaged',
      contamination: 'Minimal food residue detected',
      recyclingGrade: 'Grade A - Premium quality for recycling',
      recommendedAction: 'Immediate recycling recommended after rinsing'
    }
  },
  container: {
    id: '2',
    plasticType: {
      name: 'HDPE (High-Density Polyethylene)',
      code: '2',
      description: 'Durable, chemical-resistant plastic with excellent barrier properties, ideal for containers and bottles.',
      recyclable: true,
      recyclingInstructions: 'Rinse thoroughly, replace cap loosely. Widely accepted for recycling into playground equipment, picnic tables, and new containers.',
      chemicalComposition: '(C₂H₄)ₙ - High-density branched polymer',
      environmentalImpact: 'Lower impact - easier to recycle, takes 20-30 years to decompose',
      degradationTime: '20-30 years',
      alternatives: ['Paper-based containers', 'Glass jars', 'Bamboo containers', 'Recycled HDPE products']
    },
    confidence: 0.94,
    aiAnalysis: {
      condition: 'Good - minor wear visible',
      contamination: 'Light residue detected',
      recyclingGrade: 'Grade B - Suitable for standard recycling',
      recommendedAction: 'Clean thoroughly before recycling'
    }
  }
};

export const PlasticScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [captureMethod, setCaptureMethod] = useState<'upload' | 'camera' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setScanResult(null);
        setCaptureMethod('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setCaptureMethod('camera');
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try uploading an image instead.",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setSelectedImage(imageData);
        setScanResult(null);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraActive(false);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
      setCaptureMethod(null);
    }
  };

  const simulateUltraAIScan = async () => {
    setIsScanning(true);
    
    // Simulate ultra AI processing time with multiple stages
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "🔬 Molecular Analysis Started",
      description: "Analyzing plastic structure and composition...",
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "🧠 AI Pattern Recognition",
      description: "Identifying plastic type with neural network...",
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "♻️ Environmental Impact Analysis",
      description: "Calculating recycling potential and alternatives...",
    });
    
    // Randomly select a mock result
    const results = Object.values(mockScanResults);
    const randomResult = results[Math.floor(Math.random() * results.length)];
    
    setScanResult(randomResult);
    setIsScanning(false);
    
    toast({
      title: "✨ Ultra AI Scan Complete!",
      description: `Advanced analysis identified: ${randomResult.plasticType.name} with ${Math.round(randomResult.confidence * 100)}% confidence`,
    });
  };

  const shareResults = () => {
    if (scanResult) {
      const shareText = `🔬 ReuScan Ultra AI Analysis:\n${scanResult.plasticType.name} (Type ${scanResult.plasticType.code})\n${scanResult.plasticType.recyclable ? '♻️ Recyclable' : '❌ Non-recyclable'}\nConfidence: ${Math.round(scanResult.confidence * 100)}%\nCondition: ${scanResult.aiAnalysis.condition}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'ReuScan Ultra AI Results',
          text: shareText,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Results copied! 📋",
          description: "Ultra AI analysis results copied to clipboard",
        });
      }
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setScanResult(null);
    setCaptureMethod(null);
    if (isCameraActive) {
      stopCamera();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-purple-600" />
          Ultra AI Plastic Scanner
          <Brain className="h-8 w-8 text-blue-600" />
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Advanced AI-powered plastic identification with molecular analysis and environmental impact assessment
        </p>
      </div>

      {/* Scanner Interface */}
      <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Microscope className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            Ultra AI Scanner
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800">
              ✨ Powered by Advanced AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedImage && !isCameraActive ? (
            <div className="space-y-4">
              <div className="text-center p-8 border-2 border-dashed border-purple-300 rounded-lg bg-gradient-to-br from-purple-25 to-blue-25">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Camera className="h-16 w-16 text-purple-400" />
                    <Sparkles className="h-6 w-6 text-blue-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">Choose Capture Method</p>
                <p className="text-sm text-gray-500 mb-6">
                  For optimal results: Good lighting, clear view of recycling symbols
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <Button 
                    onClick={startCamera}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Use Camera
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : isCameraActive ? (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-h-96 rounded-lg"
                />
                <div className="absolute inset-0 border-4 border-purple-400 rounded-lg pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-lg"></div>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={capturePhoto} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Photo
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  Cancel
                </Button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Captured plastic item"
                  className="w-full max-h-96 object-contain rounded-lg border-2 border-purple-200"
                />
                <Button
                  onClick={resetScanner}
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              
              {!scanResult && !isScanning && (
                <Button 
                  onClick={simulateUltraAIScan} 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
                  size="lg"
                >
                  <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                  Start Ultra AI Analysis
                  <Brain className="h-5 w-5 ml-2" />
                </Button>
              )}
              
              {isScanning && (
                <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Microscope className="h-5 w-5 text-purple-600 animate-pulse" />
                      <h3 className="text-lg font-semibold text-purple-800">Ultra AI Processing...</h3>
                      <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                    </div>
                    <p className="text-sm text-purple-700">Advanced molecular analysis in progress</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ultra AI Scan Results */}
      {scanResult && (
        <Card className="border-2 border-gradient-to-r from-green-200 to-blue-200 bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-800">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Ultra AI Analysis Complete
                <Sparkles className="h-5 w-5 text-purple-600" />
              </CardTitle>
              <Button onClick={shareResults} variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share Analysis
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Identification */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{scanResult.plasticType.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Type {scanResult.plasticType.code}
                  </Badge>
                  <Badge variant={scanResult.plasticType.recyclable ? "default" : "destructive"}>
                    {scanResult.plasticType.recyclable ? (
                      <>
                        <Recycle className="h-3 w-3 mr-1" />
                        Recyclable
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Non-recyclable
                      </>
                    )}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <Brain className="h-3 w-3 mr-1" />
                    {Math.round(scanResult.confidence * 100)}% confidence
                  </Badge>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{scanResult.plasticType.description}</p>
              </div>

              {/* AI Analysis */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Advanced AI Analysis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Condition:</span>
                    <p className="text-gray-600">{scanResult.aiAnalysis.condition}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Contamination:</span>
                    <p className="text-gray-600">{scanResult.aiAnalysis.contamination}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Recycling Grade:</span>
                    <p className="text-gray-600">{scanResult.aiAnalysis.recyclingGrade}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Recommended Action:</span>
                    <p className="text-gray-600">{scanResult.aiAnalysis.recommendedAction}</p>
                  </div>
                </div>
              </div>

              {/* Chemical & Environmental Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">🧪 Chemical Composition</h4>
                  <p className="text-sm text-green-700">{scanResult.plasticType.chemicalComposition}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">🌍 Environmental Impact</h4>
                  <p className="text-sm text-orange-700">{scanResult.plasticType.environmentalImpact}</p>
                  <p className="text-xs text-orange-600 mt-1">Degradation: {scanResult.plasticType.degradationTime}</p>
                </div>
              </div>

              {/* Recycling Instructions */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                  <Recycle className="h-4 w-4 text-green-600" />
                  Recycling Instructions
                </h4>
                <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                  {scanResult.plasticType.recyclingInstructions}
                </p>
              </div>

              {/* Eco-Friendly Alternatives */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🌱 Eco-Friendly Alternatives</h4>
                <div className="flex flex-wrap gap-2">
                  {scanResult.plasticType.alternatives.map((alt, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      {alt}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
