const Review = require('../models/reviewModel')
const User = require('../models/userModel')
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = factory.getAll(Review)

exports.createReview = catchAsync(async (req, res, next) => {
    const review = await Review.create(req.body);
    
    if (!review) {
        return next(new AppError('Something went wrong trying to create the review', 400));
    }

    res.status(200).json({
        status: 'success',
        message: 'Review created successfully!',
        review
      });
});