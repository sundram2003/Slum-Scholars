// controllers/volunteer.controller.js
import { encrypt, decrypt } from '../config/encryption.js';
import Volunteer from '../models/volunteer.model.js';

export const createVolunteer = async (req, res) => {
  console.log('Received volunteer form submission:', req.body);

  try {
    const {
      fullName,
      currentAddress,
      permanentAddress,
      aadharNumber,
      phoneNumber,
      activity,
      dateOfBirth,
      qualification,
      otherQualifications,
      email
    } = req.body;

    // Validate Aadhar number
    if (!/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Aadhar number must be 12 digits'
      });
    }

    const encryptedAadhar = encrypt(aadharNumber);

    const volunteerData = {
      fullName,
      currentAddress,
      permanentAddress,
      aadharNumber: JSON.stringify(encryptedAadhar), 
      phoneNumber, 
      aadharLast4: aadharNumber.slice(-4), 
      activity,
      dateOfBirth,
      qualification,
      otherQualifications,
      email
    };

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

export const getVolunteerAadhar = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    const decryptedAadhar = decrypt(JSON.parse(volunteer.aadharNumber));

    res.json({
      success: true,
      aadharNumber: decryptedAadhar,
      phoneNumber: volunteer.phoneNumber, 
      aadharLast4: volunteer.aadharLast4
    });
  } catch (error) {
    console.error('Error in getVolunteerAadhar:', error);
    res.status(400).json({
      success: false,
      message: 'Error retrieving volunteer information',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();

    const decryptedVolunteers = volunteers.map(volunteer => {
      const volunteerObj = volunteer.toObject();
      if (volunteerObj.aadharNumber) {
          const decryptedAadhar = decrypt(JSON.parse(volunteerObj.aadharNumber));
          volunteerObj.aadharNumber = `********${decryptedAadhar.aadharLast4}`; 
      }
      return volunteerObj;
    });

    res.status(200).json({
      success: true,
      count: decryptedVolunteers.length,
      data: decryptedVolunteers
    });
  } catch (error) {
    console.error('Error in getAllVolunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving volunteers'
    });
  }
};

export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    const volunteerObj = volunteer.toObject();
    
    try {
      if (volunteerObj.aadharNumber) {
        const decryptedAadhar = decrypt(JSON.parse(volunteerObj.aadharNumber));
        volunteerObj.aadharNumber = `********${volunteerObj.aadharLast4}`;
      }
      volunteerObj.phoneNumber = volunteer.phoneNumber; 
    } catch (error) {
      console.error('Error decrypting volunteer data:', error);
    }

    res.status(200).json({
      success: true,
      data: volunteerObj
    });
  } catch (error) {
    console.error('Error in getVolunteerById:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving volunteer'
    });
  }
};

export const getFullAadhar = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    const decryptedAadhar = decrypt(JSON.parse(volunteer.aadharNumber));

    res.status(200).json({
      success: true,
      data: {
        fullName: volunteer.fullName,
        aadharNumber: decryptedAadhar,
        phoneNumber: volunteer.phoneNumber 
      }
    });
  } catch (error) {
    console.error('Error in getFullAadhar:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving Aadhar and phone information'
    });
  }
};

export const updateVolunteer = async (req, res) => {
  try {
    const { aadharNumber, phoneNumber, ...otherData } = req.body;
    const updateData = { ...otherData };

    if (aadharNumber) {
      if (!/^\d{12}$/.test(aadharNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Aadhar number must be 12 digits'
        });
      }
      const encryptedAadhar = encrypt(aadharNumber);
      updateData.aadharNumber = JSON.stringify(encryptedAadhar);
      updateData.aadharLast4 = aadharNumber.slice(-4);
    }

    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber; 
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Volunteer updated successfully'
    });
  } catch (error) {
    console.error('Error in updateVolunteer:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
