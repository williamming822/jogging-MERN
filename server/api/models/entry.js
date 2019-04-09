const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isPositive } = require('./validators');
const { User } = require('./user');

const entrySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    distance: {
      type: Number,
      validate: {
        validator: isPositive,
        message: props => `${props.value} should be greater than zero`,
      },
      default: 0,
      required: [true, 'distance is required'],
    },
    duration: {
      type: Number,
      validate: {
        validator: isPositive,
        message: props => `${props.value} should be greater than zero`,
      },
      default: 0,
      required: [true, 'duration is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const Entry = mongoose.model('Entry', entrySchema);
module.exports = {
  Entry,
};
