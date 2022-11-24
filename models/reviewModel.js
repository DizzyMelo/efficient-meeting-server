const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    meetingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meeting'
    },
    reviewedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    stars: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;