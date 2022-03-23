const Task = require('../models/taskModel')
const AppError = require('../utils/appError');

exports.createTask = async (req, res, next) => {
    let doc = await Task.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            task: doc,
        },
    });
}

exports.getAll = async (req, res, next) => {
    let docs = await Task.find();

    res.status(200).json({
        status: 'success',
        length: docs.length,
        tasks: docs
    });
}