
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Upload, Users } from 'lucide-react';
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
        .select(`
          *,
          profiles!community_submissions_user_id_fkey (
            username,
            full_name
          )
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-submissions'] });
      setShowSubmissionForm(false);
      setItemName('');
      setDescription('');
      setClassification('');
      toast({
        title: "Submission successful!",
        description: "Thank you for contributing to our community database.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitItemMutation.mutate({
      itemName,
      description,
      classification,
      imageUrl: '/placeholder.svg', // In real app, would upload actual image
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Community Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Help improve our AI by submitting new items and classifications
            </p>
            <Button onClick={() => setShowSubmissionForm(!showSubmissionForm)}>
              <Upload className="h-4 w-4 mr-2" />
              Submit Item
            </Button>
          </div>

          {showSubmissionForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Submit New Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Plastic type or classification"
                    value={classification}
                    onChange={(e) => setClassification(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Description and recycling notes"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submitItemMutation.isPending}>
                      {submitItemMutation.isPending ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowSubmissionForm(false)}
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
              <Card key={submission.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={submission.image_url}
                      alt={submission.item_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{submission.item_name}</h3>
                        {submission.verified && (
                          <Badge variant="default">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Classification: {submission.user_classification}
                      </p>
                      {submission.description && (
                        <p className="text-sm text-gray-700 mb-2">
                          {submission.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Submitted by {submission.profiles?.username || submission.profiles?.full_name || 'Anonymous'}
                        </span>
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
    </div>
  );
};
