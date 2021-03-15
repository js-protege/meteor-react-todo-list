import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import React from "react";
import { App } from "./App.jsx";
import { LogIn } from "./auth/Auth.jsx";
import { GuardProvider, GuardedRoute } from 'react-router-guards';

export const appRoutes = () => {
  // const useAccount = () => useTracker(() => {
  //   const user = Meteor.user()
  //   const userId = Meteor.userId()
  //   return {
  //     user,
  //     userId,
  //     isLoggedIn: !!userId
  //   }
  // }, [])
  const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (Meteor.userId()) {
        next();
      }
      next.redirect('/login');
    } else {
      next();
    }
  };
  return (
    <BrowserRouter>
      <GuardProvider guards={[requireLogin]} loading="" error="">
        <div className="container">
          <Switch>
            <GuardedRoute exact path="/" component={App} meta={{ auth: true }}/>
            <GuardedRoute exact path="/login" component={LogIn}/>
          </Switch>
        </div>
      </GuardProvider>
    </BrowserRouter>
  )
}