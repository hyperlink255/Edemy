import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/LMS_assets/assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import instance from '../utils/axiosInstance'
import {toast} from 'react-hot-toast'
export const AppContext = createContext()


export const AppContextProvider = ({children}) => {
    const URL = "http://localhost:5000"
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [allCourses,setAllCourses] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [isEducator,setIsEducator] = useState(false);
    const [enrolledCourses,setEnrolledCourses] = useState([])
    const [user,setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null)
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [userData,setUserData]  = useState(null)



    useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user))
    localStorage.setItem("token",token)
    },[user,token])


    const fetchAllCourses = async () => {
        try{
            const res = await instance.get("/api/course/all")
            if(res.status === 200){ 
                setAllCourses(res.data.courses)
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }


     const fetchUserData = async () => {
        if(user.role === "educator"){
            setIsEducator(true)
        }

        try{
          const res = await instance.get('/api/auth/data')
          if(res.status === 200){
            setUserData(res.data.user)
          }else{
            toast.error(res.data.message)
          }
        }catch(error){
           toast.error(error.message)
        }
     }

    const calculateRating = (course) => {
        if(course.courseRatings.length === 0){
            return 0
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units : ["h","m"]})
    }

    const calculateCourseDuraton = (course) => {
     let time = 0;
     course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
     return humanizeDuration(time * 60 * 1000, {units : ["h","m"]})
    }

    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach((chapter) => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures +=chapter.chapterContent.length
            }
        })
        return totalLectures
    }


    const fetchUserEnrolledCourses = async () => {
        try{
           const res = await instance.get('/api/auth/enrolled-courses')
           if(res.status === 200){
            setEnrolledCourses(res.data.enrolledCourses)
           }else{
            toast.error(res.data.message)
           }
        }catch(error){
           toast.error(error.message)
        }
    }



    useEffect(() => {
     fetchAllCourses()
    },[])


    useEffect(() => {
        if(user)
        fetchUserData()
        fetchUserEnrolledCourses()
    },[user])


    const value = {
     currency,
     allCourses,navigate,calculateRating,
     showModal, setShowModal,URL,user,token,
     isEducator,setIsEducator,calculateChapterTime,setUser,setToken,
     calculateCourseDuraton,calculateNoOfLectures,enrolledCourses,fetchUserEnrolledCourses,
     userData,setUserData,fetchAllCourses
    }
return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
)
}

