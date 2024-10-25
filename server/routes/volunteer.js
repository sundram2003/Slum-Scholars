import express from 'express';
import { createVolunteer } from '../controllers/volunteer.controller.js';

const router = express.Router();

router.post('/', createVolunteer);

export default router;