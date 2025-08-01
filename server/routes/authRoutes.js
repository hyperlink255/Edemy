import express from 'express'
import { addUserRating,
     getUserCourseProgress,
     getUserData, purchaseCourse,
     updateUserCourseProgress,
     userErolledCourses } 
from '../controllers/authController.js'
import { protect } from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/data',protect,getUserData)
router.get('/enrolled-courses',protect,userErolledCourses)
router.post('/purchase',protect,purchaseCourse)
router.post('/update-course-progress',protect,updateUserCourseProgress)
router.post('/get-course-progress',protect,getUserCourseProgress)
router.post('/add-rating',protect,addUserRating)


export default router