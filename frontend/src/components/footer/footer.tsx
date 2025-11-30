import React from 'react';
import { Home, Play, FileText, Plus, User } from 'lucide-react';
import { Button } from '../ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Home className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Play className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <FileText className="w-5 h-5" />
          </Button>
        </div>

        {/* Center Plus Button */}
        <Button 
          size="icon" 
          className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="w-6 h-6" />
        </Button>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            className="px-4 py-2 text-sm font-medium"
          >
            <span className="mr-2">📱</span>
            Preview
          </Button>
        </div>
      </div>
    </footer>
  );
};