const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/search/:email', userController.search);

router.route('/').get(userController.getUsers);

router.route('/:id').get().patch().delete();

module.exports = router;