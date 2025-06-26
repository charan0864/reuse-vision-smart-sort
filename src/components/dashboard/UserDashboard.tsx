
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for scan history since we removed authentication
const mockRecentScans = [
  {
    id: '1',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'PET (Polyethylene Terephthalate)', plastic_code: '1', recyclable: true },
    created_at: new Date().toISOString(),
    recyclable: true,
    eco_points_earned: 10
  },
  {
    id: '2',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'HDPE (High-Density Polyethylene)', plastic_code: '2', recyclable: true },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    recyclable: true,
    eco_points_earned: 12
  },
  {
    id: '3',
    image_url: '/placeholder.svg',
    plastic_types: { name: 'PVC (Polyvinyl Chloride)', plastic_code: '3', recyclable: false },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    recyclable: false,
    eco_points_earned: 5
  }
];

export const UserDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
        <p className="text-gray-600 text-sm md:text-base">
          View your previous scans and recycling activity
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          {mockRecentScans && mockRecentScans.length > 0 ? (
            <div className="space-y-3">
              {mockRecentScans.map((scan) => (
                <div key={scan.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-3 border rounded-lg gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={scan.image_url} 
                      alt="Scanned item" 
                      className="w-12 h-12 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm md:text-base truncate">
                        {scan.plastic_types?.name || 'Unknown Plastic'}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {new Date(scan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-2">
                    <Badge variant={scan.recyclable ? "default" : "destructive"} className="text-xs">
                      {scan.recyclable ? "Recyclable" : "Non-recyclable"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 text-sm md:text-base">
              No scans yet. Start scanning to see your history here!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
