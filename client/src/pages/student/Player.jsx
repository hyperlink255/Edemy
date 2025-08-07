import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/LMS_assets/assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Rating from '../../components/student/Rating'
import instance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import Loading from '../../components/student/Loading'


const Player = () => {
  const {enrolledCourses,calculateChapterTime,userData,fetchUserEnrolledCourses} = useContext(AppContext)
  const {courseId} = useParams()
  const [courseData,setCourseData] = useState(null)
  const [openSections,setOpenSections] = useState({})
  const [playerData,setPlayerData] = useState(null)
  const [progressData,setProgressData] = useState(null)
  const [initialRating,setInitialRating] = useState(0)

 console.log(progressData)

  const getCourseData = () => {
   enrolledCourses.map((course) => {
    if(course._id === courseId){
      setCourseData(course)
      course.courseRatings.map((item) => {
        if(item.userId === userData._id){
          setInitialRating(item.rating)
        }
      })
    }
   })
  }

    const toggleSection = (index) => {
    setOpenSections((prev) => (
      {...prev,
        [index] : !prev[index], 
      }
    ))
  }


  useEffect(() => {
     if(enrolledCourses.length > 0){
       getCourseData()
     }
  },[enrolledCourses])

  const markLectureAsCompleted = async (lectureId) => {
   try{
     const res = await instance.post("/api/auth/update-course-progress")
     if(res.status === 200){
      toast.success(res.data.message)
       getCourseProgress()
     }else{
      toast.error(res.data.message)
     }
   }catch(error){
      toast.error(error.message)
   }
  }

  const getCourseProgress = async () => {
    try{
         const res = await instance.post('/api/auth/get-course-progress',{courseId})
         if(res.status === 200){
          setProgressData(res.data.progressData)
         }else{
          toast.error(res.data.message)
         }
    }catch(error){
           toast.error(error.message)
    }
  }

  const handleRate = async (rating) => {
    try{
       const res = await instance.post("/api/auth/add-rating",{courseId,rating})
       if(res.status === 200){
        toast.success(res.data.message)
        fetchUserEnrolledCourses()
       }else{
        toast.error(res.data.message)
       }
    }catch(error){
         toast.error(error.message)
    }
  }
  useEffect(() => {
    getCourseProgress()
  },[])

  return courseData ? (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-20'>
      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
                 <div className='pt-5'>
                  {courseData && courseData.courseContent.map((chapter,index) => (
                      <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
        
                        <div onClick={() => toggleSection(index)} className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                          <div className='flex items-center gap-2'>
                            <img src={assets.down_arrow_icon} className={`transform transition-transform ${openSections[index] ? 'rotate-180': ''}`} alt="" />
                            <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                            </div>
                            <p className='text-sm md:text-default'>{chapter.chapterContent.length} - {calculateChapterTime(chapter)}</p>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                          <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                            {chapter.chapterContent.map((lecture,i) => (
                               <li key={i} className='flex items-start gap-2 py-1'>
                                <img src={ progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} className='w-4 h-4 mt-1' alt="" />
                                <div className='flex items-center justify-between w-full text-gray-800 text-sm md:text-default'>
                                  <p className=''>{lecture.lectureTitle}</p>
                                  <div className='flex gap-2'>
                                    {lecture.lectureUrl && <p onClick={() => setPlayerData({
                                      ...lecture, chapter : index + 1, lecture : i + 1
                                  })} className='text-blue-500 cursor-pointer' >Watch</p>}
                                  <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {units:['h','m']})}</p>
                                  </div>
                                </div>
                               </li>
        
                            ))}
                          </ul>
                          </div>
                      </div>
                  ))}
                 </div>
                 <div className='flex items-center gap-2 py-3 mt-10'>
                  <h1 className='text-xl font-bold'>Rate this Course:</h1>
                  <Rating initialRating={initialRating} onRate={handleRate}/>
                 </div>
                 
                </div>
           {/* Right div */}
      <div className='md:mt-10'>
        {
          playerData ? (
            <div>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="w-full aspect-video"/>
              <div className='w-full flex justify-between items-center mt-1'>
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className='text-blue-600'>{
                progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'Complete' : 'Mark Complete'}</button>
              </div>
            </div>
          ) : (
             <img src={courseData ? courseData.courseThumbnail : ""} alt="" />
          )

        }
      </div>
    </div>
    </>
  ) : <Loading/>
}

export default Player