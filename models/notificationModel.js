const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    message: {
        type: String,
        required: [true, 'The message is required']
    },
    details: {
        type: String
    },
    sentFrom: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    sentTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'The receiver  is required']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    wasRead: {
        type: Boolean,
        default: false
    },
    notificationType: {
        type: String,
        default: 'normal',
        enum: ['normal', 'new-meeting', 'new-task', 'review'],
    },
    optionalId: {
        type: mongoose.Schema.ObjectId
    },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;