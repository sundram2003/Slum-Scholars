import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import homeRoutes from "./routes/home.js";
import volunteerRoutes from "./routes/volunteer.js"; 
import paymentRoutes from "./routes/payment.js"; 
import postRoutes from './routes/post.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

connectDB();
app.use(morgan("combined"));
app.use(cors());
app.use("/api/v1/home", homeRoutes);
app.use('/api/v1/volunteer', volunteerRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/v1/posts', postRoutes);


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

