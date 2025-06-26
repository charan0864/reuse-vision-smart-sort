
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for scan history with images
const mockRecentScans = [
  {
    id: '1',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'PET (Polyethylene Terephthalate)', plastic_code: '1', recyclable: true },
    created_at: new Date().toISOString(),
    recyclable: true
  },
  {
    id: '2',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'HDPE (High-Density Polyethylene)', plastic_code: '2', recyclable: true },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    recyclable: true
  },
  {
    id: '3',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'PVC (Polyvinyl Chloride)', plastic_code: '3', recyclable: false },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    recyclable: false
  },
  {
    id: '4',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'LDPE (Low-Density Polyethylene)', plastic_code: '4', recyclable: true },
    created_at: new Date(Date.now() - 259200000).toISOString(),
    recyclable: true
  },
  {
    id: '5',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'PP (Polypropylene)', plastic_code: '5', recyclable: true },
    created_at: new Date(Date.now() - 345600000).toISOString(),
    recyclable: true
  }
];

export const UserDashboard: React.FC = () => {
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Your previously scanned plastic items
        </p>
      </div>

      <div className="space-y-3">
        {mockRecentScans && mockRecentScans.length > 0 ? (
          mockRecentScans.map((scan) => (
            <Card key={scan.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={scan.image_url} 
                      alt="Scanned plastic item" 
                      className="w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-base md:text-lg text-gray-900">
                          {scan.plastic_types?.name || 'Unknown Plastic'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {scan.plastic_types?.plastic_code && (
                            <Badge variant="outline" className="text-xs">
                              Type {scan.plastic_types.plastic_code}
                            </Badge>
                          )}
                          <Badge variant={scan.recyclable ? "default" : "destructive"} className="text-xs">
                            {scan.recyclable ? "Recyclable" : "Non-recyclable"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      Scanned {formatTimestamp(scan.created_at)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-sm md:text-base mb-4">
                No scans yet. Start scanning to see your history here!
              </p>
              <p className="text-xs text-gray-400">
                Use the Scanner tab to identify plastic items
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
