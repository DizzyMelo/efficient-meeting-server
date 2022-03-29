const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(taskController.getAll).post(taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;