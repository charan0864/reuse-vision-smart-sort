
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User, Calendar, Image, FileText, LogOut, Inbox } from 'lucide-react';

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

export const CommunityAdmin: React.FC<CommunityAdminProps> = ({ adminEmail, onLogout }) => {
  // Start with empty submissions array - only real user submissions will be shown
  const [submissions, setSubmissions] = useState<Submission[]>([]);
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
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Community Admin Portal</h1>
          <p className="text-gray-600 text-xs md:text-base">
            Review and manage community submissions • Logged in as {adminEmail}
          </p>
        </div>
        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2 w-full md:w-auto">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('all')}>
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-lg md:text-2xl font-bold text-gray-900">{submissions.length}</div>
            <div className="text-xs md:text-sm text-gray-600">Total Submissions</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('pending')}>
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-lg md:text-2xl font-bold text-orange-600">{pendingCount}</div>
            <div className="text-xs md:text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('approved')}>
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-lg md:text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-xs md:text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('rejected')}>
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-lg md:text-2xl font-bold text-red-600">{rejectedCount}</div>
            <div className="text-xs md:text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((filterOption) => (
              <Badge
                key={filterOption}
                variant={filter === filterOption ? "default" : "outline"}
                className="cursor-pointer text-xs px-2 md:px-3 py-1 hover:bg-green-50 transition-colors capitalize"
                onClick={() => setFilter(filterOption)}
              >
                {filterOption}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-3 md:space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-6 md:p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Inbox className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {filter === 'all' ? 'No submissions yet' : `No ${filter} submissions`}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">
                    {filter === 'all' 
                      ? 'Community submissions will appear here once users start contributing.' 
                      : `No submissions with ${filter} status found.`
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <CardTitle className="text-base md:text-lg">{submission.itemName}</CardTitle>
                  <Badge 
                    variant={
                      submission.status === 'approved' ? 'default' : 
                      submission.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                    className="capitalize w-fit"
                  >
                    {submission.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <FileText className="h-3 w-3 md:h-4 md:w-4" />
                        Classification: <span className="font-semibold">{submission.classification}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <User className="h-3 w-3 md:h-4 md:w-4" />
                        Submitted by: {submission.submittedBy}
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        {submission.submittedAt.toLocaleDateString()}
                      </div>
                    </div>
                    {submission.imageUrl && (
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Image className="h-3 w-3 md:h-4 md:w-4" />
                        Image attached
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-xs md:text-sm mb-2">Description:</h4>
                    <p className="text-xs md:text-sm text-gray-700">{submission.description}</p>
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button 
                        onClick={() => handleApprove(submission.id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 w-full md:w-auto"
                        size="sm"
                      >
                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleReject(submission.id)}
                        className="flex items-center gap-2 w-full md:w-auto"
                        size="sm"
                      >
                        <XCircle className="h-3 w-3 md:h-4 md:w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
