const express = require('express');
const meetingController = require('../controllers/meetingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(meetingController.getMeetings)
  .post(meetingController.createMeeting);

router.post('/add-participant/:meetingId/:participantId', meetingController.addParticipantToMeeting)
router.post('/add-topic/:meetingId/', meetingController.addTopicToMeeting)

router
  .route('/:id')
  .get(meetingController.getMeeting)
  .patch(meetingController.updateMeeting)
  .delete(meetingController.deleteMeeting);

module.exports = router;