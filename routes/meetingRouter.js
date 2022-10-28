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
router.post('/remove-participant/:meetingId/:participantId', meetingController.removeParticipantFromMeeting)
router.post('/add-topic/:meetingId/', meetingController.addTopicToMeeting)
router.post('/remove-topic/:meetingId/:topicId', meetingController.removeTopicFromMeeting)
router.post('/update-topic/:meetingId/:topicId', meetingController.updateTopicStatus)
router.post('/start/:meetingId', meetingController.startMeeting)
router.post('/finish/:meetingId', meetingController.finishMeeting)

router
  .route('/:id')
  .get(meetingController.getMeeting)
  .patch(meetingController.updateMeeting)
  .delete(meetingController.deleteMeeting);

module.exports = router;