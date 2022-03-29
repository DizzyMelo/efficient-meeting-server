const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notification.find({sentTo: req.user.id});

    res.status(200).json({
        status: 'success',
        notifications
    });
});
exports.getNotification = factory.getOne(Notification);
exports.createNotification = factory.createOne(Notification);
exports.updateNotification = factory.updateOne(Notification);
exports.deleteNotification = factory.deleteOne(Notification);