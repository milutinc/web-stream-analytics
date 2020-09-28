import { Mongo } from 'meteor/mongo';

export const UserActivities = new Mongo.Collection('clicks.user.activity');