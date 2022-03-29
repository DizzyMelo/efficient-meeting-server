const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect)

router.route('/').get(notificationController.getNotifications).post(notificationController.createNotification);

router.route('/:id').get().patch().delete();

module.exports = router;