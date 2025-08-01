import Course from "../models/courseModel.js"
import {v2 as Cloudinary} from 'cloudinary'
import Purchase from "../models/purchaseModel.js"
import User from "../models/userModel.js"


export const addCourse = async (req, res) => {
    try {
          const {courseData} = req.body
          const imageFile = req.file
          const educatorId = req.user._id
          if(!imageFile){
            return res.json({success:false,message:'Thumbnail Not Attached'})
          }
          const parsedCourseData = await JSON.parse(courseData)
          parsedCourseData.educator = educatorId
          const newCourse = await Course.create(parsedCourseData)
          const imageUpload = await Cloudinary.uploader.upload(imageFile.path)
          newCourse.courseThumbnail = imageUpload.secure_url
          await newCourse.save()
          res.status(200).json({success:true,message:"Course Added"})
    }catch(error){
          res.json({success:false,message:error.message})
    }
}

export const getEducatorCourses = async (req,res) => {
    try{
       const educator = req.user._id
       const course = await Course.find({educator})
       res.status(200).json({success:true,course})
    }catch(error){
       res.json({success:false,message:error.message})
    }
}

export const educatorDashbaordData = async (req,res) => {
    try{
           const educator = req.user._id
           const courses = await Course.find({educator})
           const totalCourses = courses.length;

           const courseIds = courses.map(course => course._id)

           const purchases = await Purchase.find({
            courseId : {$in:courseIds},
            status : 'completed'
           })

           const totalEarnings = purchases.reduce((sum,purchase)=> sum += purchase.amount, 0)

           const enrolledStudentsData = []
           for(const course of courses){
             const students = await User.find({
                _id:{$in:course.enrolledStudents}
             },'name imageUrl')
             students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle:course.courseTitle,
                    student
                })
             })
           } 
           res.json({success:true,dashboard:{
            totalEarnings,enrolledStudentsData,totalCourses
           }})
    }catch(error){
         res.json({success:false,message:error.message})
    }
}

export const getEnrolledStudentsData = async (req,res) => {
    try{
         const educator = req.user._id
         const courses = await Course.find({educator})
         const courseIds = courses.map(course => course._id)

         const purchase = await Purchase.find({
            courseId : {$in:courseIds},
            status:'completed'
         }).populate("userId", "name imageUrl").populate('courseId','courseTitle')

         const enrolledStudents = purchase.map(purchase => ({
            student : purchase.userId,
            courseTitle:purchase.courseId.courseTitle,
            purchaseData : purchase.createdAt
         }));
         res.json({success:true,enrolledStudents})
    }catch(error){
         res.json({success:false,message:error.message})

    }
}