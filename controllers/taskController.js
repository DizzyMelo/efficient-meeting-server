const Task = require('../models/taskModel')
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createTask = async (req, res, next) => {
    req.body.createdBy = req.user.id;
    let task = await Task.create(req.body);
    res.status(201).json({
        status: 'success',
        task
    });
}

exports.getTasks = catchAsync(async (req, res, next) => {
    tasks = await Task.find({assignedTo: req.user.id})

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tasks.length,
        tasks
    });
})
exports.getTask = factory.getOne(Task)
exports.updateTask = factory.updateOne(Task)
exports.deleteTask = factory.deleteOne(Task)

exports.updateTaskStatus = catchAsync(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
        new: true,
        runValidators: true,
    });
    
    if (!task) {
      return next(new AppError('Task not found!', 404));
    }
    res.status(200).json({
      status: 'success',
      message: 'Task status updated!',
      task
    });
  });