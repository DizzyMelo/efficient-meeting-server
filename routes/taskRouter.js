const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.route('/').get(taskController.getAll).post(taskController.createTask)

module.exports = router;