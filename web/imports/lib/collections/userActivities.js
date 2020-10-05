import { Mongo } from 'meteor/mongo';

UserActivities = new Mongo.Collection('clicks.user.activity');

UserActivities.userCanInsert = ( userId, doc ) => true;
UserActivities.userCanUpdate = ( userId, doc ) => true;
UserActivities.userCanRemove = ( userId, doc ) => true;

if (Meteor.isServer) {
  UserActivities.allow({
    insert: (userId, doc) => UserActivities.userCanInsert(userId, doc),
    update: (userId, doc, fields, modifier) => UserActivities.userCanUpdate(userId, doc),
    remove: (userId, doc) => UserActivities.userCanRemove(userId, doc),
  });
  // UserActivities.before.insert((userId, doc) => {
  //   doc.createdAt = new Date();
  //   doc.createdBy = userId;
  //   doc.modifiedAt = doc.createdAt;
  //   doc.modifiedBy = doc.createdBy;
  //   if (!doc.createdBy) doc.createdBy = userId;
  // });
  // UserActivities.before.update((userId, doc, fieldNames, modifier, options) => {
  //   modifier.$set = modifier.$set || {};
  //   modifier.$set.modifiedAt = new Date();
  //   modifier.$set.modifiedBy = userId;
  // });
  // UserActivities.before.remove((userId, doc) => {});
  // UserActivities.after.insert((userId, doc) => {});
  // UserActivities.after.update((userId, doc, fieldNames, modifier, options) => {});
  // UserActivities.after.remove((userId, doc) => {});
  Meteor.publish('userActivities.all', () => UserActivities.find({}, {}));
}
