import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteEvent } from '../../actions/date.action';
import '../../Styles/day.css';

const MonthDay = ({ day, onClick }) => {
  const dispatch = useDispatch();
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${
    day.isCurrentDay ? 'currentDay' : ''
  }`;

  return (
    <div onClick={onClick} className={className}>
      {day.value === 'padding' ? '' : day.value}

      {day.event &&
        day.event.length > 0 &&
        day.event.map(event => (
          <div
            key={event.id}
            className="event"
            onClick={e => {
              e.stopPropagation();

              dispatch(setDeleteEvent(event));
            }}
          >
            {event.Note}
          </div>
        ))}
    </div>
  );
};

export default MonthDay;
