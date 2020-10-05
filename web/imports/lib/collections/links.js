import { Mongo } from 'meteor/mongo';

Links = new Mongo.Collection('links');

Links.userCanInsert = ( userId, doc ) => true;
Links.userCanUpdate = ( userId, doc ) => true;
Links.userCanRemove = ( userId, doc ) => true;

if (Meteor.isServer) {
  Links.allow({
    insert: (userId, doc) => Links.userCanInsert(userId, doc),
    update: (userId, doc, fields, modifier) => Links.userCanUpdate(userId, doc),
    remove: (userId, doc) => Links.userCanRemove(userId, doc),
  });
  // Links.before.insert((userId, doc) => {
  //   doc.createdAt = new Date();
  //   doc.createdBy = userId;
  //   doc.modifiedAt = doc.createdAt;
  //   doc.modifiedBy = doc.createdBy;
  //   if (!doc.createdBy) doc.createdBy = userId;
  // });
  // Links.before.update((userId, doc, fieldNames, modifier, options) => {
  //   modifier.$set = modifier.$set || {};
  //   modifier.$set.modifiedAt = new Date();
  //   modifier.$set.modifiedBy = userId;
  // });
  // Links.before.remove((userId, doc) => {});
  // Links.after.insert((userId, doc) => {});
  // Links.after.update((userId, doc, fieldNames, modifier, options) => {});
  // Links.after.remove((userId, doc) => {});
  Meteor.publish('links.all', () => Links.find({}, {}));
}
