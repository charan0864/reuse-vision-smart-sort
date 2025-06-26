
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navigation = [
    { id: 'scanner', label: 'Scanner' },
    { id: 'history', label: 'History' },
    { id: 'community', label: 'Community' },
    { id: 'education', label: 'Learn' },
    { id: 'chat', label: 'AI Assistant' },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <span className="text-xl md:text-2xl font-bold text-gray-900">ReuScan</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className="text-sm"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentView === item.id ? "default" : "ghost"}
                        onClick={() => onViewChange(item.id)}
                        className="justify-start"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
