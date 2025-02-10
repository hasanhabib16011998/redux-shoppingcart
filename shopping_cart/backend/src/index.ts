import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { products } from './data/products';
require('dotenv').config();
import register from './routes/register';
import login from './routes/login';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);  // Exit process with failure
  }
};

// Call the MongoDB connection function
connectDB();
// Define a test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB!');
});

// Products route
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

app.use("/api/register",register);
app.use("/api/login",login)

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
