import React, { useState, useEffect } from 'react';
import { DiaryPromptCard } from '../../components/diary/DiaryPromptCard';
import { DiaryWritingCard } from '../../components/diary/DiaryWritingCard';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '../../components/ui/drawer';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { X } from 'lucide-react';
import Calendar21 from '../../components/calendar-21';

const API_BASE_URL = 'http://localhost:3000/api';
const USER_ID = 'user123'; // TODO: Replace with actual user ID from auth

interface DiaryEntry {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  date: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

export const DiaryPage: React.FC = () => {
  const [showWritingCard, setShowWritingCard] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [allDiaryDates, setAllDiaryDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all diary dates on mount to show dots on calendar
  useEffect(() => {
    const fetchAllDiaryDates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/diary/user/${USER_ID}`);
        if (response.ok) {
          const allEntries: DiaryEntry[] = await response.json();
          // Extract unique dates
          const dates = allEntries.map(entry => new Date(entry.date));
          setAllDiaryDates(dates);
          console.log('Loaded diary dates:', dates);
        }
      } catch (err) {
        console.error('Error fetching diary dates:', err);
      }
    };
    fetchAllDiaryDates();
  }, []);

  const handleSaveDiary = async (title: string, content: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/diary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          title: title,
          content: content,
          date: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save diary');
      }

      const savedEntry = await response.json();
      setDiaryEntries([...diaryEntries, savedEntry]);
      // Add the new date to the calendar dots
      setAllDiaryDates([...allDiaryDates, new Date(savedEntry.date)]);
      setShowWritingCard(false);
      console.log('Diary saved successfully:', savedEntry);
    } catch (err) {
      console.error('Error saving diary:', err);
      setError('일기 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelWriting = () => {
    setShowWritingCard(false);
  };

  const handleDateClick = async (date: Date) => {
    console.log('Date clicked:', date);
    setSelectedDate(date);
    setDrawerOpen(true);
    
    // Fetch diaries for the selected date
    try {
      setLoading(true);
      setError(null);
      
      // Format date in local timezone to avoid timezone conversion issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const url = `${API_BASE_URL}/diary/user/${USER_ID}/date?date=${dateStr}`;
      console.log('Fetching from URL:', url);
      console.log('Date string:', dateStr);
      
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch diaries: ${response.status}`);
      }

      const entries = await response.json();
      console.log('Number of entries:', entries.length);
      setDiaryEntries(entries);
    } catch (err) {
      console.error('Error fetching diaries:', err);
      setError('일기를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };


  const getEntriesForDate = () => {
    console.log('Displaying entries from state:', diaryEntries);
    return diaryEntries;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  return (
    <div className="h-full">
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
                {error && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}
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
              <Calendar21 onDateClick={handleDateClick} datesWithEntries={allDiaryDates} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Drawer for showing diary entries */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
        <DrawerContent>
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>{formatDate(selectedDate)}</DrawerTitle>
                <DrawerDescription>
                  {getEntriesForDate().length}개의 일기
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-4">
                {error}
              </div>
            )}
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>로딩 중...</p>
              </div>
            ) : getEntriesForDate().length > 0 ? (
              getEntriesForDate().map((entry) => (
                <Card key={entry._id || entry.userId} className="p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(entry.date).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                </Card>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>이 날짜에 작성된 일기가 없습니다.</p>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default DiaryPage;