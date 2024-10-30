import express from "express";
import { contactUsController } from "../controllers/home.controller.js";
const router = express.Router();

router.post("/contactUs", contactUsController);

export default router;
