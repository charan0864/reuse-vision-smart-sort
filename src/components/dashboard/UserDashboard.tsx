
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Simple mock data for recent scans
const mockRecentScans = [
  {
    id: '1',
    image_url: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=400&h=300&fit=crop',
    plastic_name: 'PET Water Bottle',
    plastic_code: '1',
    recyclable: true,
    scanned_at: '2 hours ago'
  },
  {
    id: '2',
    image_url: 'https://images.unsplash.com/photo-1563295566-8fa83ff6e41a?w=400&h=300&fit=crop',
    plastic_name: 'HDPE Milk Jug',
    plastic_code: '2',
    recyclable: true,
    scanned_at: '1 day ago'
  },
  {
    id: '3',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    plastic_name: 'PVC Pipe',
    plastic_code: '3',
    recyclable: false,
    scanned_at: '2 days ago'
  }
];

export const UserDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Your recent plastic scans and identifications
        </p>
      </div>

      <div className="space-y-4">
        {mockRecentScans && mockRecentScans.length > 0 ? (
          mockRecentScans.map((scan) => (
            <Card key={scan.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image Section */}
                  <div className="flex-shrink-0">
                    <img 
                      src={scan.image_url} 
                      alt={`Scanned ${scan.plastic_name}`}
                      className="w-full lg:w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{scan.plastic_name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            Type {scan.plastic_code}
                          </Badge>
                          <Badge variant={scan.recyclable ? "default" : "destructive"} className="text-xs">
                            {scan.recyclable ? "Recyclable" : "Non-recyclable"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Scanned {scan.scanned_at}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <p className="text-gray-500 text-base md:text-lg mb-2 font-medium">
                No scans yet
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Use the Scanner tab to identify plastic items
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
