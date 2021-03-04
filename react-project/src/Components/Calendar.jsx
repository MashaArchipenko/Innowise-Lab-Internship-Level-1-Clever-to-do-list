import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  endOfMonth,
  startOfMonth,
  endOfWeek,
} from "date-fns";
import Events from "./Events";



const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const header = () => {
    const monthFormat = "MMMM yyyy";
    return (
      <div className="calendarHeader">
        <div className="icon" onClick={prevMonth}>
          &lt;
        </div>
        <div className="centerClndr">
          <span>{format(currentDate, monthFormat)}</span>
        </div>
        <div className="icon" onClick={nextMonth}>
          &gt;
        </div>
      </div>
    );
  };

  const days = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="dayColumn" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="daysRow">{days}</div>;
  };

  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        let cloneDay = day;
        days.push(
          <div
            className ="number"
            key={day}
            onClick={() => onDateClick(format(cloneDay,'d MMMM yyyy'))}>
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="rowCal" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const onDateClick = (day) => {
    console.log(day);
    setSelectedDate(day);
    
    console.log(selectedDate);
  };

  return (
    <>
      <div className="calendar">
        <div>{header()}</div>
        <div>{days()}</div>
        <div>{cells()}</div>
      </div>
      <Events selectedDate={selectedDate}/>
    </>
  );
};

export default Calendar;
