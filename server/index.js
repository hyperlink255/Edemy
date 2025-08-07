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


const app = express();

app.post('/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhooks);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

await conncetCloudinary();
connectDB();

app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => res.send("API Working"));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

export default app;
