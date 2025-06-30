
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Enhanced mock data for scan history with actual uploaded photos
const mockRecentScans = [
  {
    id: '1',
    uploaded_image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=400&h=300&fit=crop', 
    image_url: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=400&h=300&fit=crop',
    plastic_types: { 
      name: 'PET (Polyethylene Terephthalate)', 
      plastic_code: '1', 
      recyclable: true,
      description: 'Crystal-clear, lightweight thermoplastic commonly used for water bottles, soda bottles, and food containers. Highly recyclable with excellent barrier properties.',
      detailed_info: 'Chemical resistance: Excellent against acids and bases. Heat resistance: Up to 70°C. Recycling rate: 95% acceptance in curbside programs.'
    },
    created_at: new Date(Date.now() - 3600000).toISOString(),
    recyclable: true,
    confidence: 0.94,
    scan_location: 'Home Kitchen',
    analysis_details: {
      color_analysis: 'Clear transparent plastic',
      texture_analysis: 'Smooth rigid surface',
      shape_analysis: 'Cylindrical bottle form'
    }
  },
  {
    id: '2',
    uploaded_image: 'https://images.unsplash.com/photo-1563295566-8fa83ff6e41a?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1563295566-8fa83ff6e41a?w=400&h=300&fit=crop',
    plastic_types: { 
      name: 'HDPE (High-Density Polyethylene)', 
      plastic_code: '2', 
      recyclable: true,
      description: 'Opaque, chemical-resistant thermoplastic with excellent impact strength. Used for milk jugs, detergent bottles, and outdoor furniture.',
      detailed_info: 'Density: 0.93-0.97 g/cm³. Chemical resistance: Outstanding. UV resistance: Good with additives.'
    },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    recyclable: true,
    confidence: 0.91,
    scan_location: 'Laundry Room',
    analysis_details: {
      color_analysis: 'Opaque white plastic',
      texture_analysis: 'Slightly textured surface',
      shape_analysis: 'Jug with handle'
    }
  },
  {
    id: '3',
    uploaded_image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    plastic_types: { 
      name: 'PVC (Polyvinyl Chloride)', 
      plastic_code: '3', 
      recyclable: false,
      description: 'Rigid thermoplastic containing chlorine. Difficult to recycle due to additives and chlorine content. Common in construction materials.',
      detailed_info: 'Chlorine content: 57% by weight. Melting point: 100-260°C. Recyclability: Limited due to contamination concerns.'
    },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    recyclable: false,
    confidence: 0.88,
    scan_location: 'Garage Workshop',
    analysis_details: {
      color_analysis: 'Rigid gray plastic',
      texture_analysis: 'Hard smooth surface',
      shape_analysis: 'Pipe section'
    }
  },
  {
    id: '4',
    uploaded_image: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=400&h=300&fit=crop',
    plastic_types: { 
      name: 'LDPE (Low-Density Polyethylene)', 
      plastic_code: '4', 
      recyclable: true,
      description: 'Flexible, translucent film plastic used for bags, wraps, and squeezable containers. Requires special collection programs.',
      detailed_info: 'Flexibility: High. Tear resistance: Good. Collection: Store drop-off programs primarily.'
    },
    created_at: new Date(Date.now() - 259200000).toISOString(),
    recyclable: true,
    confidence: 0.86,
    scan_location: 'Shopping Mall',
    analysis_details: {
      color_analysis: 'Translucent film',
      texture_analysis: 'Flexible thin material',
      shape_analysis: 'Shopping bag form'
    }
  },
  {
    id: '5',
    uploaded_image: 'https://images.unsplash.com/photo-1558618047-3c8681c6b3b3?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1558618047-3c8681c6b3b3?w=400&h=300&fit=crop',
    plastic_types: { 
      name: 'PP (Polypropylene)', 
      plastic_code: '5', 
      recyclable: true,
      description: 'Versatile thermoplastic with excellent fatigue resistance. Used for yogurt containers, bottle caps, and automotive parts.',
      detailed_info: 'Fatigue resistance: Excellent. Chemical resistance: Very good. Heat resistance: Up to 100°C continuous use.'
    },
    created_at: new Date(Date.now() - 345600000).toISOString(),
    recyclable: true,
    confidence: 0.89,
    scan_location: 'Office Cafeteria',
    analysis_details: {
      color_analysis: 'Opaque colored plastic',
      texture_analysis: 'Semi-flexible surface',
      shape_analysis: 'Container with lid'
    }
  }
];

export const UserDashboard: React.FC = () => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return {
        relative: diffInMinutes < 1 ? 'Just now' : `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`,
        absolute: date.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };
    } else if (diffInHours < 24) {
      return {
        relative: `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`,
        absolute: date.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return {
          relative: `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`,
          absolute: date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        };
      } else {
        return {
          relative: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          absolute: date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        };
      }
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Scan History</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Your personal scan history with uploaded photos and detailed AI analysis
        </p>
      </div>

      <div className="space-y-4">
        {mockRecentScans && mockRecentScans.length > 0 ? (
          mockRecentScans.map((scan) => {
            const timeInfo = formatDateTime(scan.created_at);
            return (
              <Card key={scan.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section - Show User's Uploaded Photo */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="text-center mb-2">
                          <p className="text-xs text-gray-500 font-medium">Your Uploaded Photo</p>
                        </div>
                        <img 
                          src={scan.uploaded_image} 
                          alt={`Your uploaded photo of ${scan.plastic_types?.name || 'plastic item'}`}
                          className="w-full lg:w-32 xl:w-36 h-32 lg:h-32 xl:h-36 object-cover rounded-xl shadow-md border-2 border-gray-200"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/placeholder.svg';
                          }}
                        />
                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border">
                          <Badge variant={scan.recyclable ? "default" : "destructive"} className="text-xs px-2 py-1">
                            {scan.recyclable ? "♻️" : "🚫"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg md:text-xl text-gray-900 leading-tight">
                            {scan.plastic_types?.name || 'Unknown Plastic'}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {scan.plastic_types?.description || 'No description available'}
                          </p>
                          
                          {/* AI Analysis Details */}
                          {scan.analysis_details && (
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <h4 className="text-sm font-semibold text-blue-800 mb-2">🔬 AI Analysis Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="font-medium text-blue-700">Color:</span>
                                  <p className="text-blue-600">{scan.analysis_details.color_analysis}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-700">Texture:</span>
                                  <p className="text-blue-600">{scan.analysis_details.texture_analysis}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-700">Shape:</span>
                                  <p className="text-blue-600">{scan.analysis_details.shape_analysis}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {scan.plastic_types?.plastic_code && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                Type {scan.plastic_types.plastic_code}
                              </Badge>
                            )}
                            <Badge variant={scan.recyclable ? "default" : "destructive"} className="text-xs">
                              {scan.recyclable ? "Recyclable" : "Non-recyclable"}
                            </Badge>
                            {scan.confidence && (
                              <Badge variant="secondary" className="text-xs bg-gray-100">
                                {Math.round(scan.confidence * 100)}% confidence
                              </Badge>
                            )}
                            {scan.scan_location && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                📍 {scan.scan_location}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Detailed Information */}
                      {scan.plastic_types?.detailed_info && (
                        <div className="bg-gray-50 rounded-lg p-4 border">
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">📊 Technical Details</h4>
                          <p className="text-xs md:text-sm text-gray-700">{scan.plastic_types.detailed_info}</p>
                        </div>
                      )}
                      
                      {/* Time and Date Section */}
                      <div className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">📅 Scanned:</span>
                            <span className="text-sm text-gray-900 font-medium">{timeInfo.relative}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">🕒 Full date:</span>
                            <span className="text-xs text-gray-600">{timeInfo.absolute}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <p className="text-gray-500 text-base md:text-lg mb-2 font-medium">
                No scans yet
              </p>
              <p className="text-xs md:text-sm text-gray-400 mb-4">
                Start scanning plastic items to see your detailed history with uploaded photos
              </p>
              <p className="text-xs text-gray-400">
                Use the Scanner tab to identify plastic items and get comprehensive recycling guidance
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
