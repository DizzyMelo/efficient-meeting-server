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
        required: [true, 'The duration (in minutes) is required']
    },
    topics: [
        {
            name: {
                type: String, 
                required:[true, 'A description of the topic is required']
            },
            completed: {type: Boolean, default: false}
        }
    ],
    participants: [
        {
            type: mongoose.Schema.ObjectId, 
            ref: 'User'
        }
    ],
    status: {
        type: String,
        default: 'coming',
        enum: ['coming', 'started', 'in progress', 'ended', 'paused', 'canceled'],
    },
    timeStarted: Date,
    timeEnded: Date,
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;