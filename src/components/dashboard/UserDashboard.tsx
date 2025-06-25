
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Recycle, Trophy, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: recentScans } = useQuery({
    queryKey: ['recent-scans', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('scan_history')
        .select(`
          *,
          plastic_types (
            name,
            plastic_code,
            recyclable
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const stats = [
    {
      title: 'Eco Points',
      value: profile?.eco_points || 0,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Scans',
      value: profile?.total_scans || 0,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Items Recycled',
      value: profile?.items_recycled || 0,
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'CO2 Saved (kg)',
      value: parseFloat(profile?.co2_saved?.toString() || '0').toFixed(1),
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor} mx-auto md:mx-0 mb-2 md:mb-0`}>
                  <stat.icon className={`h-4 w-4 md:h-6 md:w-6 ${stat.color}`} />
                </div>
                <div className="text-center md:text-left md:ml-4">
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          {recentScans && recentScans.length > 0 ? (
            <div className="space-y-3">
              {recentScans.map((scan) => (
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
                    <span className="text-xs md:text-sm font-medium text-green-600">
                      +{scan.eco_points_earned}
                    </span>
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
