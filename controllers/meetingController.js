const Meeting = require('../models/meetingModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const notificationController = require('./notificationController')


exports.getMeetings = catchAsync(async (req, res, next) => {
  const meetings = await Meeting.find({$or: [{host:req.user.id}, {participants: {$in: req.user.id}}]})

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: meetings.length,
    meetings
  });
});
exports.getMeeting = factory.getOne(Meeting, 'host participants');
exports.createMeeting = factory.createOne(Meeting);
exports.updateMeeting = factory.updateOne(Meeting);
exports.deleteMeeting = factory.deleteOne(Meeting);

exports.startMeeting = catchAsync(async (req, res, next) => {
    const doc = await Meeting.findByIdAndUpdate(req.params.id, 
        {
            timeStarted: Date.now(), 
            status: 'in progress'
        }, 
        {
            new: true,
            runValidators: true,
        }
      );
  
      if (!doc) {
        return next(new AppError('Meeting was found!', 404));
      }

      res.status(200).json({
        status: 'success',
        message: 'Meeting started'
      });
});

exports.finishMeeting = catchAsync(async (req, res, next) => {
    const doc = await Meeting.findByIdAndUpdate(req.params.id, 
        {
            timeEnded: Date.now(), 
            status: 'ended'
        }, 
        {
            new: true,
            runValidators: true,
        }
      );
  
      if (!doc) {
        return next(new AppError('Meeting was found!', 404));
      }

      res.status(200).json({
        status: 'success',
        message: 'Meeting started'
      });
});

exports.addParticipantToMeeting = catchAsync(async (req, res, next) => {
  const participant = await User.findById(req.params.participantId)

  if (!participant) {
    return next(new AppError('User was found!', 404));
  }

  const tempMeeting = await Meeting.findById(req.params.meetingId)
  
  if (!tempMeeting) {
    return next(new AppError('Meeting was not found!', 404));
  }

  tempParticipants = tempMeeting.participants.map((el) => el._id.toString())

  if(tempParticipants.includes(req.params.participantId)) {
    return next(new AppError('User already added to the meeting!', 400));
  }

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, {$push: {participants: participant}}, {new: true});

  const notification = {
    title: 'You were invited to a new meeting',
    body: 'You were invited to a new meeting',
    token: participant.token || 'no token',
    to: participant._id
  }

  notificationController.createNotification(notification);
  res.status(200).json({
    status: 'success',
    message: 'Participant added to the meeting!',
    meeting
  });
});

exports.removeParticipantFromMeeting = catchAsync(async (req, res, next) => {
  
  const tempMeeting = await Meeting.findById(req.params.meetingId)
  
  if (!tempMeeting) {
    return next(new AppError('Meeting was not found!', 404));
  }

  participantIndex = tempMeeting.participants.map((el) => el._id.toString()).indexOf(req.params.participantId);

  tempParticipant = tempMeeting.participants[participantIndex]
  if(!tempParticipant) {
    return next(new AppError('Participant not found!', 400));
  }

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, {$pull: {participants: tempParticipant}}, {new: true});

  res.status(200).json({
    status: 'success',
    message: 'Participant removed from the meeting!',
    meeting
  });
});

exports.addTopicToMeeting = catchAsync(async (req, res, next) => {
  const tempMeeting = await Meeting.findById(req.params.meetingId)
  
  if (!tempMeeting) {
    return next(new AppError('Meeting was not found!', 404));
  }

  
  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, {$push: {topics: {name:req.body.topic}}}, {new: true});

  res.status(200).json({
    status: 'success',
    message: 'Topic added to the meeting!',
    meeting
  });
});

exports.removeTopicFromMeeting = catchAsync(async (req, res, next) => {
  const tempMeeting = await Meeting.findById(req.params.meetingId)
  
  if (!tempMeeting) {
    return next(new AppError('Meeting was not found!', 404));
  }

  topicIndex = tempMeeting.topics.map(el => el._id.toString()).indexOf(req.params.topicId);
  
  tempTopic = tempMeeting.topics[topicIndex];

  if(!tempTopic) {
    return next(new AppError('Topic not found!', 404));
  }

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, {$pull: {topics: tempTopic}}, {new: true});

  res.status(200).json({
    status: 'success',
    message: 'Topic removed from the meeting!',
    meeting
  });
});

exports.updateTopicStatus = catchAsync(async (req, res, next) => {
  const tempMeeting = await Meeting.findById(req.params.meetingId)
  
  if (!tempMeeting) {
    return next(new AppError('Meeting was not found!', 404));
  }

  topicIndex = tempMeeting.topics.map(el => el._id.toString()).indexOf(req.params.topicId);
  
  tempTopic = tempMeeting.topics[topicIndex];

  if(!tempTopic) {
    return next(new AppError('Topic not found!', 404));
  }

  tempMeeting.topics[topicIndex].completed = req.body.completed;

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, {topics: tempMeeting.topics}, {new: true});

  res.status(200).json({
    status: 'success',
    message: 'Topic status updated!',
    meeting
  });
});

exports.startMeeting = catchAsync(async (req, res, next) => {
  const meetingToUpdate = {
    status: 'in progress',
    startedAt: Date.now()
  };

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, meetingToUpdate, {new: true});
  
  if (!meeting) {
    return next(new AppError('Meeting not found!', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Meeting started successfuly',
    meeting
  });
});

exports.finishMeeting = catchAsync(async (req, res, next) => {
  const meetingToUpdate = {
    status: 'ended',
    finishedAt: Date.now()
  };

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, meetingToUpdate, {new: true}).populate('participants');
  
  if (!meeting) {
    return next(new AppError('Meeting not found!', 404));
  }

  console.log(meeting)

  participantIds = meeting.participants.map(participant => participant._id.toString());
  participantTokens = meeting.participants.map(participant => participant.token.toString());
  console.log(participantIds)
  console.log(participantTokens)

  const notification = {
    title: 'Your opinion is important',
    body: 'Please, take a few seconds to leave a review',
  }

  notificationController.createManyNotifications(notification, participantIds, participantTokens)
  
  res.status(200).json({
    status: 'success',
    message: 'Meeting finished successfuly',
    meeting
  });
});