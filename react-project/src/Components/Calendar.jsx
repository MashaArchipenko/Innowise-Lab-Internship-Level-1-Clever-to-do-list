import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  endOfMonth,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfWeek,
  parseISO,
} from "date-fns";
import Events from "./Events";
import fire from "../fire";

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

  const array = [];
  const db = fire.database();
  const id = fire.auth().currentUser.uid;
  const getArray = () => {
    var eventsRef = db.ref("users/" + id + "/dates");
    eventsRef.on("value", (res) => {
      array.push(res.val());
    });
  };

  const checkEventsOnDate = (date) => {
    getArray();
    let value = [];
    if (array[0] != null) {
      array[0].forEach((i) => {
        if (date === i.dates) {
          if (i.done === true) {
            value.push(<span className="circle">&#10004;</span>);
          } else value.push(<span className="circle">&#10008;</span>);
        }
      });
      return <div className="checkVal">{value}</div>;
    }
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
        let event = checkEventsOnDate(format(cloneDay, "d MMMM yyyy"));
        days.push(
          <div
            className={`number ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              onDateClick(format(cloneDay, "d MMMM yyyy"));
            }}
          >
            {" "}
            {event}
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
    setCurrentDate(addMonths(parseISO(currentDate), 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(parseISO(currentDate), 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <>
      <div className="calendar">
        <div>{header()}</div>
        <div>{days()}</div>
        <div>{cells()}</div>
      </div>
      <Events selectedDate={selectedDate} />
    </>
  );
};

export default Calendar;
