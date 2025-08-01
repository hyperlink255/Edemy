import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    // ✅ JWT Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ User Check
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// ✅ Only Educators Access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "educator") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied, educator only" });
  }
};
