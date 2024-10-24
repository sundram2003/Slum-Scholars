import express from 'express';
import { connectDB, Contact } from './db.js'; 

const PORT = 3001;
const app = express();
app.use(express.json());

connectDB();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

// POST route to save contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).send('All fields are required');
    }

    // Create and save new contact using MongoDB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Failed to save contact information');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
