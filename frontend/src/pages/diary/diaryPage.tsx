import React, { useState } from 'react';
import { DiaryPromptCard } from '../../components/diary/DiaryPromptCard';
import { DiaryWritingCard } from '../../components/diary/DiaryWritingCard';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';
import Calendar21 from '../../components/calendar-21';

export const DiaryPage: React.FC = () => {
  const [showWritingCard, setShowWritingCard] = useState(false);

  const handleSaveDiary = (content: string) => {
    console.log('Diary saved:', content);
    // TODO: Save diary to backend
    setShowWritingCard(false);
  };

  const handleCancelWriting = () => {
    setShowWritingCard(false);
  };

  return (
    <div className="h-[calc(100vh-64px)]">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel - Diary Prompt Card */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-6 overflow-auto">
            <DiaryPromptCard
              userName="Juneyoung"
              promptText="오늘은 업무에서 무엇을 하셨나요? 뿌듯한 성취감을 느낄 수 있었나요? 성과나 업무과정을 알려주세요!"
              onWriteClick={() => setShowWritingCard(true)}
            />
            
            {showWritingCard && (
              <div className="mt-4">
                <DiaryWritingCard
                  onSave={handleSaveDiary}
                  onCancel={handleCancelWriting}
                />
              </div>
            )}
          </div>
        </ResizablePanel>

        {/* Resizable Handle */}
        <ResizableHandle withHandle />

        {/* Right Panel - Content Area */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="w-full flex items-center justify-center bg-white p-6">
            <div className="w-full max-w-4xl">
              <Calendar21 />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default DiaryPage;