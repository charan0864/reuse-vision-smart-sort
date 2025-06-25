
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThumbsUp, ThumbsDown, Upload, Users, History, Trophy, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/components/ui/use-toast';

export const CommunityHub: React.FC = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: submissions = [] } = useQuery({
    queryKey: ['community-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: userSubmissions = [] } = useQuery({
    queryKey: ['user-submissions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('community_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('eco_points, total_scans')
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const submitItemMutation = useMutation({
    mutationFn: async (submission: {
      itemName: string;
      description: string;
      classification: string;
      imageUrl: string;
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('community_submissions')
        .insert({
          user_id: user.id,
          item_name: submission.itemName,
          description: submission.description,
          user_classification: submission.classification,
          image_url: submission.imageUrl,
        });
      if (error) throw error;

      // Award 5 eco-points for community submission
      const { error: statsError } = await supabase.rpc('update_user_stats', {
        p_user_id: user.id,
        p_eco_points: 5,
        p_co2_saved: 0.1
      });
      if (statsError) throw statsError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['user-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setShowSubmissionForm(false);
      setItemName('');
      setDescription('');
      setClassification('');
      toast({
        title: "Submission successful! 🎉",
        description: "Thank you for contributing! You earned 5 eco-points.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitItemMutation.mutate({
      itemName,
      description,
      classification,
      imageUrl: '/placeholder.svg',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Community Hub</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Share knowledge, earn rewards, and build a sustainable future together
        </p>
      </div>

      {/* User Stats Card */}
      {user && userStats && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Your Community Impact</h3>
                  <p className="text-sm text-green-600">Keep up the great work!</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-green-700">{userStats.eco_points}</p>
                  <p className="text-xs md:text-sm text-green-600">Eco Points</p>
                </div>
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-blue-700">{userSubmissions.length}</p>
                  <p className="text-xs md:text-sm text-blue-600">Contributions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all-submissions" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="all-submissions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Submissions
          </TabsTrigger>
          <TabsTrigger value="my-history" className="flex items-center gap-2" disabled={!user}>
            <History className="h-4 w-4" />
            My History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Users className="h-5 w-5 md:h-6 md:w-6" />
                    Community Submissions
                  </CardTitle>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    Help improve our AI by submitting new items • Earn 5 eco-points per submission
                  </p>
                </div>
                <Button 
                  onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                  className="w-full md:w-auto"
                  disabled={!user}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!user && (
                <div className="text-center p-6 bg-yellow-50 rounded-lg mb-4">
                  <p className="text-yellow-800">Please sign in to submit items and earn eco-points!</p>
                </div>
              )}

              {showSubmissionForm && user && (
                <Card className="mb-6 border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-green-600" />
                      Submit New Item (+5 Eco Points)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="Item name (e.g., Plastic water bottle)"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                        className="w-full"
                      />
                      <Input
                        placeholder="Plastic type or classification (e.g., PET, HDPE)"
                        value={classification}
                        onChange={(e) => setClassification(e.target.value)}
                        required
                        className="w-full"
                      />
                      <Textarea
                        placeholder="Description and recycling notes (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-[100px]"
                      />
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button 
                          type="submit" 
                          disabled={submitItemMutation.isPending}
                          className="w-full md:w-auto"
                        >
                          {submitItemMutation.isPending ? 'Submitting...' : 'Submit & Earn 5 Points'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowSubmissionForm(false)}
                          className="w-full md:w-auto"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <img
                          src={submission.image_url}
                          alt={submission.item_name}
                          className="w-full md:w-16 h-32 md:h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base md:text-lg">{submission.item_name}</h3>
                            {submission.verified && (
                              <Badge variant="default">✓ Verified</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Classification: <span className="font-medium">{submission.user_classification}</span>
                          </p>
                          {submission.description && (
                            <p className="text-sm text-gray-700 mb-2">
                              {submission.description}
                            </p>
                          )}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(submission.created_at)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {submission.votes_helpful || 0}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                {submission.votes_not_helpful || 0}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <History className="h-5 w-5 md:h-6 md:w-6" />
                Your Submission History
              </CardTitle>
              <p className="text-gray-600 text-sm md:text-base">
                Track all your community contributions and their impact
              </p>
            </CardHeader>
            <CardContent>
              {userSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-sm md:text-base mb-4">
                    You haven't submitted any items yet
                  </p>
                  <Button onClick={() => setShowSubmissionForm(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Make Your First Submission
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userSubmissions.map((submission) => (
                    <Card key={submission.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <img
                            src={submission.image_url}
                            alt={submission.item_name}
                            className="w-full md:w-16 h-32 md:h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-base md:text-lg">{submission.item_name}</h3>
                              <div className="flex items-center gap-2">
                                {submission.verified && (
                                  <Badge variant="default">✓ Verified</Badge>
                                )}
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  +5 Points
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Classification: <span className="font-medium">{submission.user_classification}</span>
                            </p>
                            {submission.description && (
                              <p className="text-sm text-gray-700 mb-2">
                                {submission.description}
                              </p>
                            )}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                Submitted {formatDate(submission.created_at)}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Community votes:</span>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3 text-green-600" />
                                  <span className="text-xs">{submission.votes_helpful || 0}</span>
                                  <ThumbsDown className="h-3 w-3 text-red-600 ml-2" />
                                  <span className="text-xs">{submission.votes_not_helpful || 0}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
