
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, History, CheckCircle, Calendar, AlertCircle } from 'lucide-react';

const mockUserSubmissions = [
  {
    id: '1',
    item_name: 'Organic Shampoo Bottle',
    user_classification: 'HDPE (Type 2)',
    description: 'Clear HDPE bottle with pump dispenser, completely clean',
    image_url: '/placeholder.svg',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    verified: true,
    status: 'approved',
    votes_helpful: 15,
    votes_not_helpful: 1,
    points_earned: 10,
    verification_notes: 'Excellent identification and description. High-quality submission.'
  },
  {
    id: '2',
    item_name: 'Microwave Food Container',
    user_classification: 'PP (Type 5)',
    description: 'Microwave-safe plastic food storage container with tight-fitting lid',
    image_url: '/placeholder.svg',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    verified: true,
    status: 'approved',
    votes_helpful: 12,
    votes_not_helpful: 0,
    points_earned: 8,
    verification_notes: 'Correct identification. Well-documented recycling properties.'
  },
  {
    id: '3',
    item_name: 'Disposable Coffee Cup',
    user_classification: 'Mixed Material',
    description: 'Paper cup with plastic lining - not recyclable in standard programs',
    image_url: '/placeholder.svg',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    verified: false,
    status: 'under_review',
    votes_helpful: 3,
    votes_not_helpful: 2,
    points_earned: 0,
    verification_notes: 'Under expert review. Complex mixed-material classification.'
  },
  {
    id: '4',
    item_name: 'Yogurt Container',
    user_classification: 'PS (Type 6)',
    description: 'Single-use polystyrene yogurt container',
    image_url: '/placeholder.svg',
    created_at: new Date(Date.now() - 345600000).toISOString(),
    verified: false,
    status: 'rejected',
    votes_helpful: 1,
    votes_not_helpful: 8,
    points_earned: 0,
    verification_notes: 'Incorrect classification. This appears to be PP (Type 5), not PS (Type 6).'
  }
];

export const CommunityHub: React.FC = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setShowSubmissionForm(false);
    setItemName('');
    setDescription('');
    setClassification('');
    setIsSubmitting(false);
    
    alert('Submission received! Our experts will review it within 24 hours. Points will be awarded based on accuracy and quality.');
  };

  const formatDate = (dateString: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">✓ Approved</Badge>;
      case 'under_review':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">🔍 Under Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">✗ Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const totalPointsEarned = mockUserSubmissions.reduce((sum, submission) => sum + submission.points_earned, 0);
  const approvedSubmissions = mockUserSubmissions.filter(s => s.status === 'approved').length;

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Contribute to our AI training and earn points through quality submissions
        </p>
      </div>

      {/* User Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-green-600">{totalPointsEarned}</div>
              <div className="text-sm text-gray-600">Total Points Earned</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{approvedSubmissions}</div>
              <div className="text-sm text-gray-600">Approved Submissions</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{mockUserSubmissions.length}</div>
              <div className="text-sm text-gray-600">Total Contributions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Upload className="h-5 w-5 md:h-6 md:w-6" />
                Submit Item for AI Training
              </CardTitle>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Help improve our AI accuracy • Earn 3-15 points per valid submission
              </p>
            </div>
            <Button 
              onClick={() => setShowSubmissionForm(!showSubmissionForm)}
              className="w-full md:w-auto"
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showSubmissionForm && (
            <Card className="mb-6 border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Quality Submission Guidelines
                </CardTitle>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Point System:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>3-5 points:</strong> Basic correct identification</li>
                    <li>• <strong>6-10 points:</strong> Detailed description with recycling info</li>
                    <li>• <strong>11-15 points:</strong> Expert-level submission with technical details</li>
                    <li>• <strong>0 points:</strong> Incorrect or low-quality submissions</li>
                  </ul>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Item name (e.g., Clear plastic water bottle)"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                    className="w-full"
                  />
                  <Input
                    placeholder="Plastic classification (e.g., PET #1, HDPE #2, PP #5)"
                    value={classification}
                    onChange={(e) => setClassification(e.target.value)}
                    required
                    className="w-full"
                  />
                  <Textarea
                    placeholder="Detailed description, recycling properties, and any special notes (higher quality = more points)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[120px]"
                    required
                  />
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? 'Submitting for Review...' : 'Submit for Expert Review'}
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <History className="h-5 w-5 md:h-6 md:w-6" />
            My Submissions
          </CardTitle>
          <p className="text-gray-600 text-sm md:text-base">
            Track your contributions, points earned, and expert feedback
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUserSubmissions.map((submission) => (
              <Card key={submission.id} className={`border-l-4 ${
                submission.status === 'approved' ? 'border-l-green-500' : 
                submission.status === 'rejected' ? 'border-l-red-500' : 
                'border-l-yellow-500'
              }`}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <img
                      src={submission.image_url}
                      alt={submission.item_name}
                      className="w-full md:w-20 h-32 md:h-20 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h3 className="font-semibold text-base md:text-lg">{submission.item_name}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(submission.status)}
                          {submission.points_earned > 0 && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              +{submission.points_earned} Points
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Classification:</span> {submission.user_classification}
                      </p>
                      {submission.description && (
                        <p className="text-sm text-gray-700 mb-3">
                          {submission.description}
                        </p>
                      )}
                      
                      {/* Expert Feedback */}
                      {submission.verification_notes && (
                        <div className={`rounded-lg p-3 mb-3 border ${
                          submission.status === 'approved' ? 'bg-green-50 border-green-200' :
                          submission.status === 'rejected' ? 'bg-red-50 border-red-200' :
                          'bg-yellow-50 border-yellow-200'
                        }`}>
                          <div className="flex items-start gap-2">
                            {submission.status === 'approved' ? 
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> :
                              submission.status === 'rejected' ?
                              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> :
                              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            }
                            <div>
                              <p className="text-sm font-medium text-gray-800">Expert Feedback:</p>
                              <p className="text-sm text-gray-700">{submission.verification_notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          Submitted {formatDate(submission.created_at)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Community votes:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-green-600">👍 {submission.votes_helpful || 0}</span>
                            <span className="text-xs text-red-600 ml-2">👎 {submission.votes_not_helpful || 0}</span>
                          </div>
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
