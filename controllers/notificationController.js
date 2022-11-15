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

exports.createNotification = catchAsync(async (notification) => {
  const x = {
    title: "New Meeting",
    message: "You were added to a meeting",
    details: "this is the details",
    sentTo: notification.to,
  };
  Notification.create(x);
  sendNotification(notification, notification.token);
});

const sendNotification = (notification, token) => {
  var message = {
    to: token,
    notification: notification,
    data: {},
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};
exports.updateNotification = factory.updateOne(Notification);
exports.deleteNotification = factory.deleteOne(Notification);
