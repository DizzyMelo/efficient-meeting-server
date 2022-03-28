const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getNotifications = factory.getAll(Notification);
exports.getNotification = factory.getOne(Notification);
exports.createNotification = factory.createOne(Notification);
exports.updateNotification = factory.updateOne(Notification);
exports.deleteNotification = factory.deleteOne(Notification);