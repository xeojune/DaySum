import React from 'react';
import { Calendar, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface HeaderProps {
  onCalendarClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCalendarClick, onSettingsClick, onProfileClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 z-50">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-gray-900">DAYSUM</h1>
            </div>
            
            <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 cursor-pointer" onClick={onProfileClick}>
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                        P
                    </AvatarFallback>
                </Avatar>
                
                <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={onCalendarClick}
                >
                    <Calendar className="w-5 h-5" />
                </Button>
                
                <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={onSettingsClick}
                >
                    <Settings className="w-5 h-5" />
                </Button>
            </div>
        </header>
    );
};

export default Header;