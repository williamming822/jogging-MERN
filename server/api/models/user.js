const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { ROLES } = require('../constants');
const saltRounds = 10;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'LastName is required'],
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
  },
  { timestamps: true },
);

userSchema.methods.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
};

userSchema.methods.authentiate = async function authenticate(password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.pre('save', async function preSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = await this.hashPassword(this.password);
    next();
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = {
  User,
};
