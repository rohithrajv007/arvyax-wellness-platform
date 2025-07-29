const mongoose = require('mongoose');

// Define the schema for the Session model
const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    tags: {
      type: [String], 
      default: [],
    },
    jsonFileUrl: {
      type: String,
      required: [true, 'Please provide a JSON file URL'],
    },
    status: {
      type: String,
      enum: ['draft', 'published'], 
      default: 'draft',
    },
  },
  {
    
    timestamps: true,
  }
);


const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;