import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteEvent } from '../../actions/date.action';
import '../../Styles/day.css';

const MonthDay = ({ day, onClick }) => {
  const [DragEvent, setDragEvent] = useState();
  const dispatch = useDispatch();
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${
    day.isCurrentDay ? 'currentDay' : ''
  }`;

  const drop = e => {
    e.preventDefault();

    const card_id = e.dataTransfer.getData('card_id');

    const card = document.getElementById(card_id);
    card.style.dispaly = 'block';
    e.target.appendChild(card);
  };
  const dropOver = e => {
    e.preventDefault();
  };

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    e.dataTransfer.setData('event', target.event);
  };

  const dragOver = e => {
    setDragEvent(e.target.event);

    e.stopPropagation();
  };

  return (
    <div
      onClick={onClick}
      onDrop={drop}
      onDragOver={dropOver}
      className={className}
    >
      {day.value === 'padding' ? '' : day.value}

      {day.event &&
        day.event.length > 0 &&
        day.event.map(event => (
          <div
            id={event.id}
            draggable="true"
            onDragStart={dragStart}
            onDragOver={dragOver}
            key={event.id}
            event={event.day}
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
