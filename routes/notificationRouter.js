const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect)

router.route('/').get().post(notificationController.createNotification);
router.route('/:id/unread').get(notificationController.countNumberOfUnreadNotifications);


router.route('/:id')
.get(notificationController.getNotifications)
.patch(notificationController.updateNotification)
.delete(notificationController.deleteNotification);

module.exports = router;