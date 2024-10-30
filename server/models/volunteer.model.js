// models/volunteer.model.js
import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  otherQualifications: String,
  email: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Volunteer', volunteerSchema);