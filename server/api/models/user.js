const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;
const { ROLES } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'usernmae is required'],
    unique: [true, 'Unique email is required'],
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Unique email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
    default: ROLES.USER,
  },
  timestamp: true,
});

const User = mongoose.model('User', userSchema);
module.exports = {
  User,
};
