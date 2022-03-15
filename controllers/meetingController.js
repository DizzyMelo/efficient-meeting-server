const Meeting = require('../models/meetingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getMeetings = factory.getAll(Meeting);
exports.getMeeting = factory.getOne(Meeting, 'host');
exports.createMeeting = factory.createOne(Meeting);
exports.updateMeeting = factory.updateOne(Meeting);
exports.deleteMeeting = factory.deleteOne(Meeting);

exports.startMeeting = catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, 
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
    const doc = await Model.findByIdAndUpdate(req.params.id, 
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