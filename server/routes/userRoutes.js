import express from 'express'
import { login, register } from '../controllers/userControllers.js'
import upload from '../middleware/upload.js'
const router = express.Router()

router.post("/register", upload.single("imageUrl"), register)
router.post("/login", login)

export default router