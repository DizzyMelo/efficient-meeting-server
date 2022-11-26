const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
var FCM = require("fcm-node");
const serverKey =
  "AAAAk3phR24:APA91bHd3vFgKFPiqmrB05QQgDChEfSmuQAz0CydQFnjsrvAUbKv_UlB7AFHEybcvdY-7bKC_cE0WpzzulOhcGM-_UNGOcYEvFeMQ5t4IkT9PNlPcuTaFxo4CHAvV4VeTchB72mS1lZl";
const fcm = new FCM(serverKey);

exports.getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ sentTo: req.params.id });

  res.status(200).json({
    status: "success",
    notifications,
  });
});

exports.getNotification = factory.getOne(Notification);

exports.countNumberOfUnreadNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ sentTo: req.params.id, wasRead: false });

  res.status(200).json({
    count: notifications.length,
  });
});

exports.createNotification = catchAsync(async (notification) => {
  const x = {
    title: notification.title,
    message: notification.body,
    details: "no details",
    sentTo: notification.to,
    notificationType: notification.notificationType || 'normal'
  };

  Notification.create(x);
  sendNotificationToOne(notification, notification.token);
});

exports.createManyNotifications = catchAsync(async (notification, participantIds, tokens) => {
  participantIds.forEach(id => {
    const n = {
      title: notification.title,
      message: notification.body,
      details: "no details",
      sentTo: id,
      optionalId: notification.optionalId,
      notificationType: notification.notificationType || 'normal'
    };
    Notification.create(n);  
  });
  
  sendNotificationToMany(notification, tokens);
});

const sendNotificationToOne = (notification, token) => {
  var message = {
    to: token,
    notification: notification,
    data: {},
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log('Something went wrong trying to send push notitication');
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

const sendNotificationToMany = (notification, tokens) => {
  var message = {
    registration_ids: tokens,
    notification: notification,
    data: {},
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log('Something went wrong trying to send push notitication');
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

exports.updateNotification = factory.updateOne(Notification);
exports.deleteNotification = factory.deleteOne(Notification);
