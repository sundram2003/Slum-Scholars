import express from 'express';
import db from './db.js';
const PORT = 3001;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).send('All fields are required');
    }

    // Insert into database
    const stmt = db.prepare(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(name, email, subject, message);

    res.status(200).json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Failed to save contact information');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});