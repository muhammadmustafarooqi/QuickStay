// import express from 'express';
// import "dotenv/config";
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express'
// import ClerkWebhooks from './controllers/clerkWebhooks.js';



// dotenv.config();
// connectDB();
// const app = express();
// app.use(cors());

// app.use(express.json())
// // clerk middleware
// app.use(clerkMiddleware())

// // api to listen clerkWebhooks
// app.use("/api/clerk", ClerkWebhooks)

// app.get('/', (req, res) => {
//     res.status(200).send('API Is Working!');
// });


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });








import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import ClerkWebhooks from './controllers/clerkWebhooks.js';

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());

// JSON body parser for general API routes
app.use(express.json());

// Clerk middleware (protects routes with auth)
app.use(clerkMiddleware());

// 🔐 Webhook route — use raw body parser for Clerk verification
app.get('/api/clerk', (req, res) => {
  res.send('This endpoint only accepts POST requests from Clerk webhooks.');
});

// Test route
app.get('/', (req, res) => {
  res.status(200).send('API Is Working!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

