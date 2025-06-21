import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';


connectDB();
const app = express();
app.use(cors());

app.use(express.json())
// clerk middleware
app.use(clerkMiddleware())

// api to listen clerkWebhooks
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req, res) => {
    res.status(200).send('API Is Working!');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});