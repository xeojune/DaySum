import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Save, X } from 'lucide-react';

interface DiaryWritingCardProps {
  onSave: (content: string) => void;
  onCancel: () => void;
}

export const DiaryWritingCard: React.FC<DiaryWritingCardProps> = ({ 
  onSave,
  onCancel 
}) => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };

  return (
    <Card className="p-4 bg-white border border-gray-200">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-gray-900">오늘의 업무 일기</h3>
        <p className="text-sm text-gray-500 mt-1">자유롭게 작성해주세요</p>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘 하루는 어떠셨나요? 자유롭게 작성해주세요..."
        className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
      
      <div className="flex gap-2 mt-4">
        <Button 
          className="flex-1 bg-black text-white hover:bg-gray-800"
          onClick={handleSave}
          disabled={!content.trim()}
        >
          <Save className="w-4 h-4 mr-2" />
          저장하기
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          <X className="w-4 h-4 mr-2" />
          취소
        </Button>
      </div>
    </Card>
  );
}
