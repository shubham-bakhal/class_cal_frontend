import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDay } from '../actions/week.action';

export const useDay = () => {
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
      curr.setMonth(new Date().getMonth() + nav);
    }
    if (week.weekCounter !== 0) {
      const weekCounter = week.weekCounter * 7;
      curr.setDate(new Date().getDate() + weekCounter);
    }
    if (week.dayCounter !== 0) {
      
      curr.setDate(new Date().getDate() + week.dayCounter);
    }

    const day = {
      day: curr.toISOString().slice(0, 10),
      value: curr.getDate(),
      event: eventForDate(curr),
    };

    dispatch(setDay(day));
  }, [events, nav, week.weekCounter,week.dayCounter ]);
  return {};
};
