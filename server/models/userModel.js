import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    password : {type:String,required:true},
    name : {type:String,required:true},
    email:{type:String,required:true},
    imageUrl : {type:String,required:true},
    
    role : {
        type:String,
        enum:["educator", "student"],
        default:"student"
    },

    enrolledCourses : [
        
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
},{timestamps:true})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
  next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}
const User = mongoose.model("User",userSchema)
export default User