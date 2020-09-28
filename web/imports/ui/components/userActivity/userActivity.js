import { UserActivities } from '/imports/api/userActivities/userActivities.js';
import { Meteor } from 'meteor/meteor';
import './userActivity.html';

var DataSource = new Meteor.Collection();
var activities;
Template.userActivity.onCreated(function () {
  Meteor.subscribe('userActivities.all');

setTimeout(function(){
  activities = UserActivities.find({}).fetch();

  DataSource.insert({ x: 'Page 1', value: activities.filter(p=> p.page == 'PageView1').length });
  DataSource.insert({ x: 'Page 2', value: activities.filter(p=> p.page == 'PageView2').length });
  DataSource.insert({ x: 'Page 3', value: activities.filter(p=> p.page == 'PageView3').length });
  DataSource.insert({ x: 'Page 4', value: activities.filter(p=> p.page == 'PageView4').length });
  DataSource.insert({ x: 'Page 5', value: activities.filter(p=> p.page == 'PageView5').length });
  DataSource.insert({ x: 'Page 6', value: activities.filter(p=> p.page == 'PageView6').length });
  DataSource.insert({ x: 'Page 7', value: activities.filter(p=> p.page == 'PageView7').length });
  DataSource.insert({ x: 'Page 8', value: activities.filter(p=> p.page == 'PageView8').length });
  DataSource.insert({ x: 'Page 9', value: activities.filter(p=> p.page == 'PageView9').length });
  },1000);

});

Template.userActivity.helpers({
  userActivities() {
    return UserActivities.find({});
  },
});

import { Template } from 'meteor/templating';

var chart;

Template.acTemplate.rendered = function () {
  /*
    Get container for chart.
    It is not actually necessary here, `chart.container('container').draw();` can be used
    for current scope, but container is found in template to avoid container ID duplication.
   */
  var container = this.find("#container");

  setTimeout(function(){
  // Turn Meteor Collection to simple array of objects.
  var data = DataSource.find({}).fetch();
  console.log('data');
  console.log(data);

  //  ----- Standard Anychart API in use -----
  chart = anychart.pie(data);
  chart.title('Page views');

  chart.legend()
    .position('bottom')
    .itemsLayout('horizontal')
    .align('center')
    .title('Pages');

  chart.animation(true);
  chart.container(container).draw();
  },1001);
};
