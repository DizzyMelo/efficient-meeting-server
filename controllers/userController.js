const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getUsers = factory.getAll(User);
exports.search = catchAsync(async (req, res, next) => {
    const docs = await User.find({
        email: { $regex: req.params.email, $options: 'i' },
    });

    res.status(200).json({
        status: 'success',
        results: docs.length,
        users: docs,
    });
});