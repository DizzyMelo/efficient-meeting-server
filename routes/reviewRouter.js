const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect);

router.route('/').get(reviewController.getAllReviews).post(reviewController.createReview);

router.route('/has-reviewed').post(reviewController.hasAlreadyReviewed);

module.exports = router;