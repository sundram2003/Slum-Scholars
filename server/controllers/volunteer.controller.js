import crypto from 'crypto';
import Volunteer from '../models/volunteer.model.js';

export const createVolunteer = async (req, res) => {
  console.log('Received volunteer form submission:', req.body);

  try {
    if (!/^\d{12}$/.test(req.body.aadharNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Aadhar number must be 12 digits'
      });
    }

    const hashedAadhar = crypto
      .createHash('sha256')
      .update(req.body.aadharNumber)
      .digest('hex');

    const volunteerData = {
      ...req.body,
      aadharNumber: hashedAadhar
    };

    console.log('Processing volunteer data:', volunteerData);

    const volunteer = new Volunteer(volunteerData);
    await volunteer.save();

    res.status(201).json({
      success: true,
      message: 'Volunteer application submitted successfully'
    });
  } catch (error) {
    console.error('Error in createVolunteer:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error submitting application',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};