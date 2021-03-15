import { Meteor } from 'meteor/meteor';
import React, { useRef, useState } from 'react';
import { Button } from '../layout/button/Button.jsx'
import { Users } from '../../api/users.js';
import { useHistory } from "react-router-dom"; 

import './Auth.css';
export const LogIn = () => {
  const newPasswordRef = useRef('');
  const history = useHistory();
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  

  const submit = e => {
    e.preventDefault();
    if(signUp){
      if(newPasswordRef.current.value === password){
        Meteor.call('createUser', username, password, function(err,res){
          console.log(err,res);
        });
      } else{
        alert("Password doesn't Match");
      }
    } else{
      Meteor.loginWithPassword(username, password, function(err) {
        if (err) {
          alert(err.message)
        } else{
          history.push("/");
        }
      });
    }
  };

  return (
    <form onSubmit={submit} className="login-form" autoComplete="off">
      <div className="form-header">
        <span className={!signUp ? 'active' : ''} onClick={e => setSignUp(!signUp)}>LOG IN</span>
        {/* <span className={signUp ? 'active' : ''} onClick={e => setSignUp(!signUp)}>SIGN UP</span> */}
      </div>
      <div className="form-content">
        <div className="input-group m-b-10">
          <label htmlFor="username">Username</label>
          <input
            className=""
            type="text"
            placeholder="Username"
            name="username"
            required
            autoComplete="off"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group m-b-10">
          <label htmlFor="password">Password</label>
          <input
            className=""
            type="password"
            placeholder="Password"
            name="password"
            required
            autoComplete="new-password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {signUp ? (
          <div className="input-group m-b-10">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className=""
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              required
              autoComplete="new-password"
              ref={newPasswordRef}
            />
          </div>) : null}
      </div>
      <div className="form-footer">
        <Button type="submit" text={signUp ? 'Sign Up' : 'Log In'}/>
      </div>
    </form>
  );
};