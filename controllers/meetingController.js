const Meeting = require('../models/meetingModel');
const factory = require('./handlerFactory');

exports.getMeetings = factory.getAll(Meeting);
exports.getMeeting = factory.getOne(Meeting);
exports.createMeeting = factory.createOne(Meeting);
exports.updateMeeting = factory.updateOne(Meeting);
exports.deleteMeeting = factory.deleteOne(Meeting);