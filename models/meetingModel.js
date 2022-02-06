const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: [true, 'The date is required']
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'The host is ID required']
    },
    duration: {
        type: Number,
        require: [true, 'The duration (in minutes) is required']
    },
    participants: [
        {
            type: mongoose.Schema.ObjectId, 
            ref: 'User'
        }
    ],
    status: {
        type: String,
        default: 'coming',
        enum: ['coming', 'started', 'ended', 'canceled'],
    },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;