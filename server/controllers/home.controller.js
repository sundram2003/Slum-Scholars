import { Contact } from "../models/contact.model.js";
export const contactUsController = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log("haeiahwith");
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).send("All fields are required");
    }

    // Create and save new contact using MongoDB
    const contact = await Contact.create({ name, email, subject, message });
    await contact.save();

    res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).send("Failed to save contact information");
  }
};
