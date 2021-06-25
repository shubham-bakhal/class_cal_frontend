import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaddingWeekDay, setWeek } from '../actions/week.action';
export const useWeek = () => {
  const date = useSelector(state => state.date);
  const week = useSelector(state => state.week);
  const dispatch = useDispatch();
  const nav = date.nav;
  const events = date.events;
  const eventForDate = date =>
    events.filter(e => {
      let day = new Date(e.day).getDate();
      let month = new Date(e.day).getMonth();
      let year = new Date(e.day).getFullYear();

      return (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });

  useEffect(() => {
    let curr = new Date();
    if (nav !== 0) {
      curr.setMonth(new Date().getMonth() + (nav - 1));
    }
    if (week.weekCounter !== 0) {
      const weekCounter = week.weekCounter * 7;
      curr.setDate(new Date().getDate() + weekCounter);
    }

    let weekArr = [];
    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      let dt = new Date();
      dt.setMonth(new Date().getMonth() + nav);
      console.log(dt.getMonth(), day.getMonth());
      if (dt.getMonth() === day.getMonth()) {
        dispatch(setPaddingWeekDay(false));
      }else{
        dispatch(setPaddingWeekDay(true));
      }
      weekArr.push({
        day: day.toISOString().slice(0, 10),
        value: day.getDate(),
        paddingWeekDay: dt.getMonth() !== day.getMonth(),
        isCurrentDay:
          day.getDate() === new Date().getDate() &&
          day.getMonth() === new Date().getMonth() &&
          day.getFullYear() === new Date().getDate(),
        event: eventForDate(day),
      });
    }
    dispatch(setWeek(weekArr));
  }, [events, nav, week.weekCounter]);
  return {};
};
