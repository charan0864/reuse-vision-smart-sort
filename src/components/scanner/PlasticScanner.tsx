
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Zap, Share2, RefreshCw, CheckCircle, AlertCircle, Recycle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScanResult {
  id: string;
  plasticType: {
    name: string;
    code: string;
    description: string;
    recyclable: boolean;
    recyclingInstructions: string;
  };
  confidence: number;
}

const mockScanResults: { [key: string]: ScanResult } = {
  bottle: {
    id: '1',
    plasticType: {
      name: 'PET (Polyethylene Terephthalate)',
      code: '1',
      description: 'Clear, lightweight plastic commonly used for water bottles and food containers.',
      recyclable: true,
      recyclingInstructions: 'Remove cap and label, rinse thoroughly. Accepted in most curbside programs.',
    },
    confidence: 0.94
  },
  container: {
    id: '2',
    plasticType: {
      name: 'HDPE (High-Density Polyethylene)',
      code: '2',
      description: 'Opaque plastic used for milk jugs, detergent bottles, and containers.',
      recyclable: true,
      recyclingInstructions: 'Rinse thoroughly, replace cap loosely. Widely accepted for recycling.',
    },
    confidence: 0.89
  }
};

export const PlasticScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIScan = async () => {
    setIsScanning(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly select a mock result
    const results = Object.values(mockScanResults);
    const randomResult = results[Math.floor(Math.random() * results.length)];
    
    setScanResult(randomResult);
    setIsScanning(false);
    
    toast({
      title: "Scan Complete! 🎯",
      description: `Identified: ${randomResult.plasticType.name} with ${Math.round(randomResult.confidence * 100)}% confidence`,
    });
  };

  const shareResults = () => {
    if (scanResult) {
      const shareText = `ReuScan identified: ${scanResult.plasticType.name} (Type ${scanResult.plasticType.code}) - ${scanResult.plasticType.recyclable ? 'Recyclable ♻️' : 'Not recyclable ❌'}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'ReuScan Results',
          text: shareText,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Results copied! 📋",
          description: "Share your scan results with others",
        });
      }
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setScanResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">AI Plastic Scanner</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Upload a photo to identify plastic type and get recycling guidance
        </p>
      </div>

      {/* Scanner Interface */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Camera className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            Plastic Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedImage ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-600 mb-2">Upload Plastic Item Photo</p>
              <p className="text-sm text-gray-500 mb-4">
                For best results: Good lighting, clear view of item
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Choose Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded plastic item"
                  className="w-full max-h-96 object-contain rounded-lg border"
                />
                <Button
                  onClick={resetScanner}
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              
              {!scanResult && !isScanning && (
                <Button onClick={simulateAIScan} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <Zap className="h-5 w-5 mr-2" />
                  Start AI Analysis
                </Button>
              )}
              
              {isScanning && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Analyzing Image...</h3>
                    <p className="text-sm text-green-700">Please wait while we identify the plastic type</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResult && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-800">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Scan Complete
              </CardTitle>
              <Button onClick={shareResults} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{scanResult.plasticType.name}</h3>
                <div className="flex items-center gap-2 mb-3">
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
                    {Math.round(scanResult.confidence * 100)}% confidence
                  </Badge>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{scanResult.plasticType.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">♻️ Recycling Instructions</h4>
                  <p className="text-sm text-gray-700">{scanResult.plasticType.recyclingInstructions}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
