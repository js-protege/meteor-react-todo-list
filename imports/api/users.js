import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Users = Meteor.users.find().fetch();

if (Meteor.isServer) {
  Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
  });
}

Meteor.methods({
  'createUser'(username, password) {
    check(username, String);
    check(password, String);
    if(Meteor.isClient){
      Accounts.createUser({
        username: username,
        password: password,
      }, function(err,res){
        if(err){
          console.log(err); // Output error if registration fails
        } else {
            console.log(Meteor.userId());
        }
      }) 
    }
  },
});