import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import collections
import '/imports/lib/collections/userActivities';

// Import templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/home/home.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  subscriptions() {
    this.register('userActivities.all', Meteor.subscribe('userActivities.all'));
  },
  action() {
    BlazeLayout.render('App_body', { child: 'App_home' });
  },
});

FlowRouter.notFound = {
  action() {
    FlowRouter.go('/');
  },
};
