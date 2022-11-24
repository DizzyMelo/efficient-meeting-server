const Review = require('../models/reviewModel')
const User = require('../models/userModel')
const Meeting = require('../models/meetingModel')
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = factory.getAll(Review)

exports.createReview = catchAsync(async (req, res, next) => {
    const review = await Review.create(req.body);
    
    if (!review) {
        return next(new AppError('Something went wrong trying to create the review', 400));
    }

    const meeting = await Meeting.findById(req.body.meetingId)

    if (!meeting) {
        return next(new AppError('Something went wrong trying to create the review. Meeting not available', 400));
    }

    const host = await User.findById(meeting.host)

    if (!host) {
        return next(new AppError('Something went wrong trying to create the review. Host not found', 400));
    }

    const medianOfStars = {stars : ((host.stars + req.body.stars) / 2)} 

    const updatedHost = await User.findByIdAndUpdate(host._id, medianOfStars)

    if (!updatedHost) {
        return next(new AppError('Something went wrong trying to update the host stars.', 400));
    }

    res.status(200).json({
        status: 'success',
        message: 'Review created successfully!',
        review
      });
});