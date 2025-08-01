import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoutes.js';
import connectDB from './configs/db.js';
import authRoute from './routes/authRoutes.js';
import courseRoute from './routes/courseRoutes.js';
import conncetCloudinary from './middleware/cloudinary.js';
import { stripeWebhooks } from './controllers/userControllers.js';
import bodyParser from 'body-parser';
import Stripe from 'stripe';

// ✅ Stripe instance
export const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// ✅ Stripe webhook ke liye raw body preserve karna zaroori hai
app.post('/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhooks);

// ✅ Baaki sab routes ke liye normal middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to database & cloudinary
await conncetCloudinary();
connectDB();

// ✅ Normal routes
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => res.send("API Working"));

// ✅ Server run (sirf development mode me)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// ✅ Export app for Vercel
export default app;
