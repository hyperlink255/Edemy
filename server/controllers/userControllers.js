import Stripe from "stripe";
import User from "../models/userModel.js";

import jwt from 'jsonwebtoken'
import Purchase from "../models/purchaseModel.js";
import Course from "../models/courseModel.js";

function generateToken(user){
return jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'1h'})
}

export const register = async (req, res) => {
  try {
    const { name, email, password, educatorInviteToken } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    if (req.file && !req.file.filename) {
      return res.status(400).json({ success: false, message: "Image upload failed" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    let role = "student";
    if (educatorInviteToken && educatorInviteToken === process.env.EDUCATOR_ONLY ) {
      role = "educator";
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      imageUrl: req.file?.filename || null,
    });

    await newUser.save();
    const token = generateToken(newUser);

    res.status(200).json({
      success: true,
      message: "Register Successfully",
      token,
      newData: newUser
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async(req,res) => {
    try{
     const {email,password} = req.body;
     if(!email || !password){
        return res.status(401).json({success:false,message:"Please fill all fields"})
     }
     const user = await User.findOne({email})
     if(!user || (!await user.comparePassword(password))){
      return res.status(401).json('invliad creaditails')
     }
     const token = generateToken(user)
     res.status(200).json({success:true,message:"Login SuccessFully", newData:user, token})
    }catch(error){
     res.status(500).json({success:false,message:error.message})
    }
}
 const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // ✅ Get Stripe Checkout Session
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (!session.data.length) {
        return res.status(400).send("No session found");
      }

      const { purchaseId } = session.data[0].metadata;

      // ✅ Find purchase in DB
      const purchaseData = await Purchase.findById(purchaseId);
      if (!purchaseData) return res.status(400).send("Purchase not found");

      // ✅ Find user & course
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(purchaseData.courseId);

      // ✅ Add student to course
      if (!courseData.enrolledStudents.includes(userData._id)) {
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();
      }

      // ✅ Add course to user
      if (!userData.enrolledCourses.includes(courseData._id)) {
        userData.enrolledCourses.push(courseData._id);
        await userData.save();
      }

      // ✅ Update purchase status
      purchaseData.status = "completed";
      await purchaseData.save();

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (!session.data.length) {
        return res.status(400).send("No session found");
      }

      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);

      if (purchaseData) {
        purchaseData.status = "failed";
        await purchaseData.save();
      }
      break;
    }

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
