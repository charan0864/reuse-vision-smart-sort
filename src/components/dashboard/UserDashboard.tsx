
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Enhanced mock data for scan history with better image handling
const mockRecentScans = [
  {
    id: '1',
    image_url: '/placeholder.svg',
    plastic_types: { 
      name: 'PET (Polyethylene Terephthalate)', 
      plastic_code: '1', 
      recyclable: true,
      description: 'Clear, lightweight plastic commonly used for beverage bottles and food containers.'
    },
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    recyclable: true,
    confidence: 0.94,
    scan_location: 'Home'
  },
  {
    id: '2',
    image_url: '/placeholder.svg',
    plastic_types: { 
      name: 'HDPE (High-Density Polyethylene)', 
      plastic_code: '2', 
      recyclable: true,
      description: 'Durable, opaque plastic used for milk jugs and detergent bottles.'
    },
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    recyclable: true,
    confidence: 0.91,
    scan_location: 'Kitchen'
  },
  {
    id: '3',
    image_url: '/placeholder.svg',
    plastic_types: { 
      name: 'PVC (Polyvinyl Chloride)', 
      plastic_code: '3', 
      recyclable: false,
      description: 'Rigid plastic containing chlorine, used for pipes and window frames.'
    },
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    recyclable: false,
    confidence: 0.88,
    scan_location: 'Office'
  },
  {
    id: '4',
    image_url: '/placeholder.svg',
    plastic_types: { 
      name: 'LDPE (Low-Density Polyethylene)', 
      plastic_code: '4', 
      recyclable: true,
      description: 'Flexible plastic used for bags, food wraps, and squeezable bottles.'
    },
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    recyclable: true,
    confidence: 0.86,
    scan_location: 'Grocery Store'
  },
  {
    id: '5',
    image_url: '/placeholder.svg',
    plastic_types: { 
      name: 'PP (Polypropylene)', 
      plastic_code: '5', 
      recyclable: true,
      description: 'Versatile plastic used for yogurt containers and bottle caps.'
    },
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    recyclable: true,
    confidence: 0.89,
    scan_location: 'Restaurant'
  }
];

export const UserDashboard: React.FC = () => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return {
        relative: 'Just now',
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Your previously scanned plastic items with detailed analysis
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
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img 
                          src={scan.image_url} 
                          alt={`Scanned ${scan.plastic_types?.name || 'plastic item'}`}
                          className="w-full lg:w-32 xl:w-36 h-32 lg:h-32 xl:h-36 object-cover rounded-xl shadow-md border-2 border-gray-200"
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
                Start scanning plastic items to see your detailed history here
              </p>
              <p className="text-xs text-gray-400">
                Use the Scanner tab to identify plastic items and get recycling guidance
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
