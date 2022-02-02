const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    description: {
        type: String
    }
});

const Car = mongoose.model("Task", taskSchema);

module.exports = Car;