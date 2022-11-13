const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
var FCM = require("fcm-node");
const serverKey =
  "AAAAk3phR24:APA91bHd3vFgKFPiqmrB05QQgDChEfSmuQAz0CydQFnjsrvAUbKv_UlB7AFHEybcvdY-7bKC_cE0WpzzulOhcGM-_UNGOcYEvFeMQ5t4IkT9PNlPcuTaFxo4CHAvV4VeTchB72mS1lZl";
const fcm = new FCM(serverKey);

exports.getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ sentTo: req.user.id });

  res.status(200).json({
    status: "success",
    notifications,
  });
});

exports.getNotification = factory.getOne(Notification);
// exports.createNotification = factory.createOne(Notification);
exports.createNotification = catchAsync(async (req, res, next) => {
  console.log(req.body);
  sendNotification();
  res.status(200).json({
    status: "success",
  });
});

const sendNotification = () => {
  var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: "chNd15wIR8emtOHMfv6rWt:APA91bFuuF7oufSkocjM1jftoC4-tms-_OilgTt1ajyHy_j2N-aqr19xqdwc4vxYUmUA3sgfVyLgA-GcCXAr9e_jNX1L4b5_Dv88UpJZUenZXvKJvsr7nyw0DVtphwOP3ffx0f93JB0V",
    // collapse_key: "your_collapse_key",

    notification: {
      title: "Title of your push notification",
      body: "Body of your push notification",
    },

    data: {
      //you can send only notification or only data(or include both)
      my_key: "my value",
      my_another_key: "my another value",
    },
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
