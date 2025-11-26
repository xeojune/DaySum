"use client"

import * as React from "react"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"

interface Calendar21Props {
  className?: string
}

export default function Calendar21({ className }: Calendar21Props = {}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
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
          const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6

          return (
            <CalendarDayButton day={day} modifiers={modifiers} {...props}>
              {children}
              {!modifiers.outside && <span>{isWeekend ? "$220" : "$100"}</span>}
            </CalendarDayButton>
          )
        },
      }}
    />
  )
}
