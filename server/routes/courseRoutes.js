import express from 'express'
import upload from '../middleware/upload.js'
import {
     addCourse, 
     educatorDashbaordData, 
     getEducatorCourses,
     getEnrolledStudentsData 
    } from '../controllers/educatorController.js'
import { adminOnly, protect } from '../middleware/verifyToken.js'
import { getAllCourse, getCourseId } from '../controllers/courseController.js'

const router = express.Router()

router.post("/add-coures", protect, adminOnly, upload.single("image"),addCourse)
router.get("/courses", protect,getEducatorCourses)
router.get("/dashboard", protect,educatorDashbaordData)
router.get('/enrolled-students',protect,getEnrolledStudentsData)

router.get('/all',getAllCourse)
router.get('/:id',getCourseId)

export default router