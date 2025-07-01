
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User, Calendar, Image, FileText, LogOut } from 'lucide-react';

interface Submission {
  id: string;
  itemName: string;
  classification: string;
  description: string;
  submittedBy: string;
  submittedAt: Date;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface CommunityAdminProps {
  adminEmail: string;
  onLogout: () => void;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    itemName: 'Clear plastic water bottle',
    classification: 'PET #1',
    description: 'Standard single-use water bottle, clear plastic with screw cap. Clean condition, no labels removed.',
    submittedBy: 'user@example.com',
    submittedAt: new Date('2024-01-15'),
    status: 'pending'
  },
  {
    id: '2',
    itemName: 'Yogurt container',
    classification: 'PP #5',
    description: 'Small yogurt container with foil lid. Container is white polypropylene, dishwasher safe marking visible.',
    submittedBy: 'recycler@email.com',
    submittedAt: new Date('2024-01-14'),
    status: 'pending'
  },
  {
    id: '3',
    itemName: 'Detergent bottle',
    classification: 'HDPE #2',
    description: 'Large laundry detergent bottle, translucent white plastic. Pump dispenser attached, recyclable marking clear.',
    submittedBy: 'greenliving@mail.com',
    submittedAt: new Date('2024-01-13'),
    status: 'approved'
  },
  {
    id: '4',
    itemName: 'Foam takeout container',
    classification: 'PS #6',
    description: 'White polystyrene foam food container. Some food residue, hinged lid design.',
    submittedBy: 'foodie@example.com',
    submittedAt: new Date('2024-01-12'),
    status: 'rejected'
  }
];

export const CommunityAdmin: React.FC<CommunityAdminProps> = ({ adminEmail, onLogout }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleApprove = (id: string) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status: 'approved' as const } : sub)
    );
  };

  const handleReject = (id: string) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status: 'rejected' as const } : sub)
    );
  };

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filter);

  const pendingCount = submissions.filter(sub => sub.status === 'pending').length;
  const approvedCount = submissions.filter(sub => sub.status === 'approved').length;
  const rejectedCount = submissions.filter(sub => sub.status === 'rejected').length;

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Community Admin Portal</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Review and manage community submissions • Logged in as {adminEmail}
          </p>
        </div>
        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('all')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{submissions.length}</div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('pending')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('approved')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('rejected')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((filterOption) => (
              <Badge
                key={filterOption}
                variant={filter === filterOption ? "default" : "outline"}
                className="cursor-pointer text-xs md:text-sm px-3 py-1 hover:bg-green-50 transition-colors capitalize"
                onClick={() => setFilter(filterOption as any)}
              >
                {filterOption}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{submission.itemName}</CardTitle>
                <Badge 
                  variant={
                    submission.status === 'approved' ? 'default' : 
                    submission.status === 'rejected' ? 'destructive' : 
                    'secondary'
                  }
                  className="capitalize"
                >
                  {submission.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FileText className="h-4 w-4" />
                      Classification: <span className="font-semibold">{submission.classification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <User className="h-4 w-4" />
                      Submitted by: {submission.submittedBy}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {submission.submittedAt.toLocaleDateString()}
                    </div>
                  </div>
                  {submission.imageUrl && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Image className="h-4 w-4" />
                      Image available
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-2">Description:</h4>
                  <p className="text-sm text-gray-700">{submission.description}</p>
                </div>

                {submission.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApprove(submission.id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleReject(submission.id)}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No submissions found for the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
