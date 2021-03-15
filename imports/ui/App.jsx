import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './task/Task.jsx';
import  Modal  from './layout/modal/Modal.jsx';
import { AddTask } from './task/add/AddTask.jsx';
import { FilterTask } from './task/filter/FilterTask.jsx';
import { useHistory } from "react-router-dom"; 
import PropTypes from 'prop-types';

import './App.css'
import { render } from 'react-dom';
export const App = () => {
  const user = useTracker(() => Meteor.user());
  const history = useHistory();
  const tasks = useTracker(() => Tasks.find({}, { sort: { createdAt: -1 } }).fetch())
  const [hideCompleted,setHideCompleted] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = (task) => {
    setShowModal(true);
    if(task){
      setTaskToRemove(task);
    }
  }

  const setMoadalContent = (task) => {
    return task && task.text ? ('Are you sure you want to delete ' + task.text) : 'Are you sure you want to Logout';
  }

  const closeModal = (confirm) => {
    if(confirm){
      if(taskToRemove._id){
        Meteor.call('tasks.remove', taskToRemove._id);
      } else{
        Meteor.logout(function(err){
          if(!err){
            history.push("/login");
          }
        });
      }
      
    }
    setTaskToRemove('');
    setShowModal(false);
  };

  const renderTask = () => {
    return (
      filter().map(task => <Task key={ task._id } task={ task } deleteTask={openModal}/>)
    )
  }

  const filter = () => {
    if (hideCompleted) {
      // If hide completed is checked, filter tasks
      return  Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    return  Tasks.find({}, { sort: { createdAt: -1 } });
  }

  const setFilters = (set) => {
    setHideCompleted(set)
    renderTask();
  }

  return (
    <Fragment>
      {user ? (<div className="profile">
        <div>{user.username}</div>
        <span onClick={openModal}>Logout</span>
      </div>) : null}
      <div className="todo">
        <h1>Todo List</h1>
        <FilterTask condition={setFilters}/>
        <AddTask/>
        <ul>
          { renderTask() }
        </ul>
        <Modal show={showModal} closeModal={closeModal} content={setMoadalContent(taskToRemove)}/>
      </div>
    </Fragment>
  );

};

// App.propTypes = {
//   tasks: PropTypes.array.isRequired,
// };