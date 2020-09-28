// All links-related publications

import { Meteor } from 'meteor/meteor';
import { UserActivities } from '../userActivities.js';

Meteor.publish('userActivities.all', function () {
  return UserActivities.find();
});
