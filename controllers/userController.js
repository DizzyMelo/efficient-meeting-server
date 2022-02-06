const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.getUsers = factory.getAll(User);