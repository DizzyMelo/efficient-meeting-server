const Meeting = require('../models/meetingModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getMeetings = factory.getAll(Meeting);
exports.getMeeting = factory.getOne(Meeting, 'host');
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
    return next(new AppError('Meeting was found!', 404));
  }

  tempParticipants = tempMeeting.participants.map((el) => el._id.toString())

  if(tempParticipants.includes(req.params.participantId)) {
    return next(new AppError('User already added to the meeting!', 400));
  }

  const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, {$push: {participants: participant}}, {new: true});

  res.status(200).json({
    status: 'success',
    message: 'Participant added to the meeting!',
    meeting
  });
})