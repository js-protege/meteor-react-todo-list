import React, { useState } from 'react';
//import ReactDOM from 'react-dom';

export const FilterTask = (props) => {
  
  const showHideCompleted = (event) => {
    props.condition(event.target.checked);
  }

  return (
    <label className="hide-completed">
      <input type="checkbox" onChange={showHideCompleted}/>
      Hide Completed Tasks
    </label>
  );
};