import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Search from '../../components/student/Search'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/LMS_assets/assets/assets'

const CourseList = () => {
  const {navigate,allCourses}  = useContext(AppContext)
  const {input} = useParams()
  const [filterCourse,setFilterCourse] = useState([])

  useEffect(() => {
   if(allCourses && allCourses.length > 0){
    const tempCourses = allCourses.slice()
    input ?  setFilterCourse(
      tempCourses.filter(
        item => item.courseTitle.toLowerCase().includes(input.toLocaleLowerCase())

      )
    )
    :setFilterCourse(tempCourses)
   }
  },[allCourses,input])

  return (
    <>
    <div className='relative md:px-20 px-8 pt-20 text-left'>
      <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
        <div>
        <h1>Course List</h1>
        <p className='text-gray-500'>Home <span onClick={() => navigate("/")}
         className='text-blue-600 cursor-pointer'> / Course List</span></p>
        </div>
      <Search data={input}/>
      </div>
      {
        input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'><p>{input}</p>
        <img src={assets.cross_icon} className='cursor-pointer' alt="" onClick={() => 
          navigate("/course-list")
        } />
        </div>
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
      {filterCourse.map((course,index) => <CourseCard key={index} course={course}/>)}
      </div>
    </div>
    </>
  )
}

export default CourseList