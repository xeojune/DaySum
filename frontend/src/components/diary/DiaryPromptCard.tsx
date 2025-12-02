import React, { useState } from 'react';
import { Heart, Minus, Plus } from 'lucide-react';
import { Card } from '../ui/card';

interface DiaryPromptCardProps {
  userName?: string;
  promptText: string;
}

export const DiaryPromptCard: React.FC<DiaryPromptCardProps> = ({ 
  userName = "드라이어", 
  promptText,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <Card className="p-4 mb-6 bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-900 font-medium">오늘의 기록 제안</span>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label={isMinimized ? "확장" : "최소화"}
        >
          {isMinimized ? (
            <Plus className="w-4 h-4 text-gray-600" />
          ) : (
            <Minus className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
      
      {!isMinimized && (
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-900 mb-2">DEAR. {userName}님</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {promptText}
        </p>
        
        {/* Instructions Section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-3">📝 사용 방법</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-gray-500 mt-0.5">1.</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium">일기 작성:</span> 아래 카드에 제목과 내용을 입력하고 저장하세요
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-gray-500 mt-0.5">2.</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium">일기 확인:</span> 오른쪽 캘린더에서 날짜를 클릭하면 해당 날짜의 일기를 볼 수 있습니다
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-gray-500 mt-0.5">3.</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium">일기 표시:</span> 일기가 있는 날짜는 캘린더에 점으로 표시됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </Card>
  );
}
