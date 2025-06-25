
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Header } from '@/components/navigation/Header';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { PlasticScanner } from '@/components/scanner/PlasticScanner';
import { CommunityHub } from '@/components/community/CommunityHub';
import { EducationalContent } from '@/components/education/EducationalContent';
import { AIAssistant } from '@/components/chat/AIAssistant';
import { UserProfile } from '@/components/profile/UserProfile';

const AuthWrapper: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm md:text-base">Loading ReuScan...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignUpForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  return <MainApp />;
};

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <UserDashboard />;
      case 'scanner':
        return <PlasticScanner />;
      case 'community':
        return <CommunityHub />;
      case 'education':
        return <EducationalContent />;
      case 'chat':
        return <AIAssistant />;
      case 'profile':
        return <UserProfile />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export const ReuScanApp: React.FC = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};
