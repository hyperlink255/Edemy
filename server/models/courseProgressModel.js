import mongoose from "mongoose";


const courseProgressSechema = new mongoose.Schema({
    userId:{type:String,required:true},
    courseId:{type:String,required:true},
    completed:{type:Boolean,default:false},
    lectureCompleted:[],
},{minimize:false})

const CourseProgress = mongoose.model("CourseProgress",courseProgressSechema)
export default CourseProgress