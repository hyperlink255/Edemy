import express from 'express'
import { getUserData, purchaseCourse, userErolledCourses } from '../controllers/authController.js'
import { protect } from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/data',protect,getUserData)
router.get('/enrolled-courses',protect,userErolledCourses)
router.post('/purchase',protect,purchaseCourse)


export default router