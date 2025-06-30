
import React, { useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { PlasticScanner } from '@/components/scanner/PlasticScanner';
import { CommunityHub } from '@/components/community/CommunityHub';
import { EducationalContent } from '@/components/education/EducationalContent';
import { AIAssistant } from '@/components/chat/AIAssistant';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('scanner'); // Start with scanner

  const renderCurrentView = () => {
    switch (currentView) {
      case 'scanner':
        return <PlasticScanner />;
      case 'community':
        return <CommunityHub />;
      case 'education':
        return <EducationalContent />;
      case 'chat':
        return <AIAssistant />;
      default:
        return <PlasticScanner />;
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
  return <MainApp />;
};
