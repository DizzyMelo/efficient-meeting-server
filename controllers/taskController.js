const Task = require('../models/taskModel')
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.createTask = async (req, res, next) => {
    let task = await Task.create(req.body);
    res.status(201).json({
        status: 'success',
        task
    });
}

exports.getTasks = factory.getAll(Task)
exports.getTask = factory.getOne(Task)
exports.updateTask = factory.updateOne(Task)
exports.deleteTask = factory.deleteOne(Task)