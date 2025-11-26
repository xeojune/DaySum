import React from 'react';
import { Heart } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface DiaryPromptCardProps {
  userName?: string;
  promptText: string;
  onWriteClick: () => void;
}

export const DiaryPromptCard: React.FC<DiaryPromptCardProps> = ({ 
  userName = "드라이어", 
  promptText,
  onWriteClick 
}) => {
  return (
    <Card className="p-4 mb-6 bg-white border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-4 h-4 text-red-500" />
        <span className="text-sm text-gray-900 font-medium">오늘의 기록 제안</span>
      </div>
      
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-900 mb-2">DEAR. {userName}님</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {promptText}
        </p>
      </div>
      
      <Button 
        className="w-full bg-black text-white hover:bg-gray-800"
        onClick={onWriteClick}
      >
        작성하기
      </Button>
    </Card>
  );
}
