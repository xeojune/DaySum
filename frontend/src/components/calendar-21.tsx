"use client"

import * as React from "react"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"

interface Calendar21Props {
  className?: string
  onDateClick?: (date: Date) => void
  datesWithEntries?: Date[]
}

export default function Calendar21({ className, onDateClick, datesWithEntries = [] }: Calendar21Props = {}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  // Helper function to check if a date has entries
  const hasEntry = (date: Date) => {
    return datesWithEntries.some(entryDate => {
      return entryDate.getFullYear() === date.getFullYear() &&
             entryDate.getMonth() === date.getMonth() &&
             entryDate.getDate() === date.getDate()
    })
  }

  const handleSelect = (date: Date | undefined) => {
    console.log('Calendar - Date selected via onSelect:', date);
    // Don't allow deselection - if date is undefined, keep the current selection
    if (date) {
      setSelectedDate(date)
    }
  }

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={handleSelect}
      numberOfMonths={1}
      captionLayout="dropdown"
      className={`rounded-lg border shadow-sm w-full max-w-full ${className || ""}`}
      formatters={{
        formatMonthDropdown: (date) => {
          return date.toLocaleString("default", { month: "long" })
        },
      }}
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          const handleDayClick = (e: React.MouseEvent) => {
            console.log('Calendar - Day button clicked:', day.date);
            
            // Update selected date
            setSelectedDate(day.date);
            
            // Always trigger onDateClick with the clicked date
            if (onDateClick) {
              console.log('Calendar - Triggering onDateClick with:', day.date);
              onDateClick(day.date);
            }
            
            // Call the original onClick after our handling
            if (props.onClick) {
              props.onClick(e as any);
            }
          };

          const hasDiaryEntry = hasEntry(day.date);

          return (
            <CalendarDayButton 
              day={day} 
              modifiers={modifiers} 
              {...props}
              onClick={handleDayClick}
            >
                {/* Calendar Day Button */}
                <div className="relative flex flex-col items-center">
                  {children}
                </div>
                {/* Diary Entry Dot */}
                <div className="mt-2">
                  {hasDiaryEntry && !modifiers.outside && (
                    <div className={`w-1 h-1 rounded-full ${
                      modifiers.selected ? 'bg-white' : 'bg-black'
                    }`} />
                  )}
                </div>
              </CalendarDayButton>
          )
        },
      }}
    />
  )
}
