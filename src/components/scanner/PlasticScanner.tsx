
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Zap, Share2, RefreshCw, Microscope, CheckCircle, AlertCircle, Info, Recycle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScanResult {
  id: string;
  plasticType: {
    name: string;
    code: string;
    description: string;
    recyclable: boolean;
    recyclingInstructions: string;
    commonUses: string[];
    environmentalImpact: string;
    technicalProperties: {
      density: string;
      meltingPoint: string;
      chemicalResistance: string;
      transparency: string;
    };
  };
  confidence: number;
  visualAnalysis: {
    color: string;
    texture: string;
    transparency: string;
    flexibility: string;
    surfaceQuality: string;
  };
  recommendedActions: {
    preparation: string[];
    recyclingLocation: string;
    specialInstructions: string[];
  };
  environmentalData: {
    carbonFootprint: string;
    recyclingBenefit: string;
    lifeCycleDays: string;
  };
}

const mockScanResults: { [key: string]: ScanResult } = {
  bottle: {
    id: '1',
    plasticType: {
      name: 'PET (Polyethylene Terephthalate)',
      code: '1',
      description: 'Crystal-clear, lightweight thermoplastic with excellent barrier properties. Most commonly recycled plastic worldwide.',
      recyclable: true,
      recyclingInstructions: 'Remove cap and label, rinse thoroughly with cold water, crush to save space. Accepted in most curbside programs.',
      commonUses: ['Water bottles', 'Soda bottles', 'Food containers', 'Polyester clothing', 'Carpet fiber'],
      environmentalImpact: 'Highly recyclable - can be converted to new bottles, clothing, carpets, and other products. Recycling saves 60% energy vs. virgin production.',
      technicalProperties: {
        density: '1.38 g/cm³',
        meltingPoint: '250-260°C',
        chemicalResistance: 'Excellent against acids/bases',
        transparency: 'Crystal clear'
      }
    },
    confidence: 0.96,
    visualAnalysis: {
      color: 'Transparent clear',
      texture: 'Smooth rigid surface',
      transparency: 'Crystal clear',
      flexibility: 'Rigid thermoplastic',
      surfaceQuality: 'High gloss finish'
    },
    recommendedActions: {
      preparation: ['Remove cap completely', 'Peel off label if possible', 'Rinse with cold water', 'Crush lengthwise to save space'],
      recyclingLocation: 'Curbside recycling bin',
      specialInstructions: ['Keep caps separate - different plastic type', 'Empty completely before recycling', 'No need to remove adhesive residue']
    },
    environmentalData: {
      carbonFootprint: '3.4 kg CO₂/kg plastic',
      recyclingBenefit: 'Saves 1.5 kg CO₂ per bottle',
      lifeCycleDays: '450+ years if not recycled'
    }
  },
  container: {
    id: '2',
    plasticType: {
      name: 'HDPE (High-Density Polyethylene)',
      code: '2',
      description: 'Opaque, chemical-resistant thermoplastic with excellent impact strength and environmental stress crack resistance.',
      recyclable: true,
      recyclingInstructions: 'Remove labels if easily detachable, rinse thoroughly, replace cap loosely. Excellent recycling acceptance.',
      commonUses: ['Milk jugs', 'Detergent bottles', 'Yogurt containers', 'Butter tubs', 'Shopping bags'],
      environmentalImpact: 'Second most recycled plastic. Can be recycled 7-10 times. Commonly converted to playground equipment, decking, and new containers.',
      technicalProperties: {
        density: '0.93-0.97 g/cm³',
        meltingPoint: '130-137°C',
        chemicalResistance: 'Outstanding',
        transparency: 'Opaque to translucent'
      }
    },
    confidence: 0.91,
    visualAnalysis: {
      color: 'Opaque white/colored',
      texture: 'Slightly textured surface',
      transparency: 'Opaque',
      flexibility: 'Semi-flexible',
      surfaceQuality: 'Matte to semi-gloss'
    },
    recommendedActions: {
      preparation: ['Rinse thoroughly', 'Remove easy-peel labels only', 'Replace cap loosely', 'No need to remove stubborn labels'],
      recyclingLocation: 'Curbside recycling bin',
      specialInstructions: ['Floats in water - easy sorting', 'Compatible with caps of same material', 'Food residue acceptable if minimal']
    },
    environmentalData: {
      carbonFootprint: '2.1 kg CO₂/kg plastic',
      recyclingBenefit: 'Saves 1.2 kg CO₂ per container',
      lifeCycleDays: '450 years if not recycled'
    }
  }
};

export const PlasticScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
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
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Randomly select a mock result for demonstration
    const results = Object.values(mockScanResults);
    const randomResult = results[Math.floor(Math.random() * results.length)];
    
    setScanResult(randomResult);
    setIsScanning(false);
    
    toast({
      title: "Ultra-Advanced AI Analysis Complete! 🎯",
      description: `Identified: ${randomResult.plasticType.name} with ${Math.round(randomResult.confidence * 100)}% confidence`,
    });
  };

  const shareResults = () => {
    if (scanResult) {
      const shareText = `ReuScan AI identified: ${scanResult.plasticType.name} (Type ${scanResult.plasticType.code}) with ${Math.round(scanResult.confidence * 100)}% confidence. ${scanResult.plasticType.recyclable ? 'Recyclable ♻️' : 'Not recyclable ❌'}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'ReuScan AI Results',
          text: shareText,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Results copied to clipboard! 📋",
          description: "Share your scan results with others",
        });
      }
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setScanResult(null);
    setShowDetailedView(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ultra-Advanced AI Scanner</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Revolutionary AI technology with molecular analysis and expert-level identification
        </p>
      </div>

      {/* Scanner Interface */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Microscope className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            Professional Plastic Analysis
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
                For best results: Good lighting, clear view of recycling code, clean surface
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
                  Start Ultra-Advanced AI Analysis
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
                    <h3 className="text-lg font-semibold text-green-800 mb-2">AI Analysis in Progress</h3>
                    <div className="space-y-1 text-sm text-green-700">
                      <p>🔬 Molecular structure analysis...</p>
                      <p>🎯 Visual pattern recognition...</p>
                      <p>📊 Cross-referencing database...</p>
                      <p>♻️ Calculating recycling recommendations...</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResult && (
        <div className="space-y-4">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-800">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  AI Analysis Complete
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={() => setShowDetailedView(!showDetailedView)} variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    {showDetailedView ? 'Hide' : 'Show'} Details
                  </Button>
                  <Button onClick={shareResults} variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <p className="text-gray-700 text-sm leading-relaxed">{scanResult.plasticType.description}</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">♻️ Recycling Instructions</h4>
                    <p className="text-sm text-gray-700">{scanResult.plasticType.recyclingInstructions}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🌍 Environmental Impact</h4>
                    <p className="text-sm text-gray-700">{scanResult.plasticType.environmentalImpact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {showDetailedView && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Visual Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Microscope className="h-5 w-5" />
                    Visual Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(scanResult.visualAnalysis).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technical Properties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5" />
                    Technical Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(scanResult.plasticType.technicalProperties).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="h-5 w-5" />
                    Environmental Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(scanResult.environmentalData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Preparation Steps:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {scanResult.recommendedActions.preparation.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Recycling Location:</h4>
                      <p className="text-sm text-gray-700">{scanResult.recommendedActions.recyclingLocation}</p>
                    </div>
                    {scanResult.recommendedActions.specialInstructions.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Special Instructions:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {scanResult.recommendedActions.specialInstructions.map((instruction, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-600">•</span>
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
