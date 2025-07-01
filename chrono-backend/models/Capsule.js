const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    unlockDate: {
      type: Date,
      required: true,
    },
    file: {
      type: String, // filename (e.g., myfile.jpg)
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Capsule', capsuleSchema);

