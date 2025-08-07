import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/LMS_assets/assets/assets'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import instance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import { useContext } from 'react'

const StudentsEnrolled = () => {
  const {isEducator} = useContext(AppContext)
  const [enrollerdStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    try{
      const res = await instance.get('/api/course/enrolled-students')
        if(res.status === 200){
             console.log(res.data.enrolledStudents)
             setEnrolledStudents(res.data.enrolledStudents.reverse())
        }else{
          toast.error(res.data.message)
        }
    
    }catch(error){
          toast.error(error.message)
    }
  }

  useEffect(() => {
    if(isEducator){
      fetchEnrolledStudents()
    }
  }, [isEducator])

  return enrollerdStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
        <table className='md:table-auto w-full overflow-hidden table-fixed pb-4 '>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell truncate'>#</th>
              <th className='px-4 py-3 font-semibold '>Student Name</th>
              <th className='px-4 py-3 font-semibold '>Course Title</th>
              <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollerdStudents.map((course,index) => (
              <tr key={index} className='border-b border-gray-500/20'>
                <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                <td className='md:px-4 px-2 py-3 flex items-center space-x-3 '>
                  <img  src={`http://localhost:5000/uploads/${course.student.imageUrl}`} alt="" className='w-9 h-9 rounded-full'/>
                  <span className="truncate ">{course.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{course.courseTitle}</td>
                <td className="px-4 py-3 hidden sm:table-cell">{new Date(course.purchaseDate).toLocaleDateString()}</td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled