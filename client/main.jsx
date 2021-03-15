import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import '../imports/startup/accounts-config.js';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  {appRoutes} from '/imports/ui/routes.js';

Meteor.startup(() => {
  render(appRoutes(), document.getElementById('react-target'));
});
