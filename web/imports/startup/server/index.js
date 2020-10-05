import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { insertBasicData } from './insertBasicData';
import '/imports/lib/collections';

Meteor.startup(() => {
  // code to run on server at startup
  console.log(` ${moment().format('DD.MM.YYYY HH:mm:ss')} > Server start`);
  console.log(` ${moment().format('DD.MM.YYYY HH:mm:ss')} > ${Meteor.absoluteUrl()}`);
  insertBasicData();
});
