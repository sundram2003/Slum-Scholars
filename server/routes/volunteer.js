import express from 'express';
import {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  getFullAadhar,
  updateVolunteer
} from '../controllers/volunteer.controller.js';

const router = express.Router();

router.post('/', createVolunteer);
router.get('/all', getAllVolunteers);
router.get('/:id', getVolunteerById);
router.get('/:id/aadhar', getFullAadhar);
router.put('/:id', updateVolunteer);

export default router;