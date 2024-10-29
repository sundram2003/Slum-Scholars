import mongoose from "mongoose";
const connectDB = async () => {
  try {
    //const mongoURI = process.env.MONGO_URI;
    const mongoURI ="mongodb+srv://shivanshtiwari3001:fW4fUzhcfE39pRLc@vaish1047.mu68a.mongodb.net/?retryWrites=true&w=majority&appName=Vaish1047"
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

export { connectDB };
