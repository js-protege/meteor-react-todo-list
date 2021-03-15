import React, { useRef } from 'react';

import './AddTask.css'

export const AddTask = (props) => {
  
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = inputRef.current.value.trim();
    if(text){
      Meteor.call('tasks.insert', text);
      inputRef.current.value = '';
    }
  }

  return (
    <form className="new-task" onSubmit={handleSubmit} >
        <input
        type="text"
        ref={inputRef}
        placeholder="Type to add new tasks"
      />
    </form>
  );
};