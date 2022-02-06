const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.route('/').get(userController.getUsers).post();

router.route('/:id').get().patch().delete();

module.exports = router;