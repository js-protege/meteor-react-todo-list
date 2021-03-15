import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Tasks } from '../../api/tasks.js';

import './Task.css'

export default class Task extends Component {
  constructor(props){
    super(props);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked );
  }
  

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={()=>this.props.deleteTask(this.props.task)}>&times;</button>
        <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked}/>
        <span className="text">{this.props.task.text}</span>
      </li>
      );
    }
  }
  
// Task.propTypes = {
//   task: PropTypes.object.isRequired,
// };