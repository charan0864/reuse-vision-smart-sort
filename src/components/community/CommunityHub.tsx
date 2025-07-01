
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, CheckCircle, Shield } from 'lucide-react';
import { CommunityLogin } from './CommunityLogin';
import { CommunityAdmin } from './CommunityAdmin';

export const CommunityHub: React.FC = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
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
    
    alert('Submission received! Our experts will review it within 24 hours and provide feedback to help improve our AI training data quality.');
  };

  const handleAdminLogin = (email: string) => {
    setAdminEmail(email);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    setAdminEmail(null);
  };

  // Show admin panel if logged in
  if (adminEmail) {
    return <CommunityAdmin adminEmail={adminEmail} onLogout={handleAdminLogout} />;
  }

  // Show admin login if requested
  if (showAdminLogin) {
    return <CommunityLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Help improve our AI accuracy by contributing quality plastic identification data
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Upload className="h-5 w-5 md:h-6 md:w-6" />
                Submit Item for AI Training
              </CardTitle>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Help improve our AI accuracy with quality submissions and expert feedback
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Button 
                onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                className="w-full md:w-auto"
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Item
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowAdminLogin(true)}
                className="w-full md:w-auto flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin Login
              </Button>
            </div>
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
                  <h4 className="font-semibold text-blue-800 mb-2">Submission Quality Standards:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Accurate Classification:</strong> Use correct plastic type identification</li>
                    <li>• <strong>Detailed Description:</strong> Include size, condition, and usage information</li>
                    <li>• <strong>Clear Photos:</strong> Well-lit, focused images showing recycling codes</li>
                    <li>• <strong>Recycling Information:</strong> Specify local acceptance and preparation requirements</li>
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
                    placeholder="Detailed description including recycling properties, condition, and any special notes"
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
    </div>
  );
};
