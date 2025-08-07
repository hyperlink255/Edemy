import React, { useContext } from 'react'
import { assets } from '../../assets/LMS_assets/assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import SignIn from '../../pages/auth/SignIn'
import instance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
const Navbar = () => {
  const isCourseListPage = location.pathname.includes('/course-list')
  const { navigate, isEducator,setToken,setUser, setShowModal,showModal,user,token,setIsEducator} = useContext(AppContext)
  
  const removeToken = () => {
    setUser(null)
    setToken(null)
    setShowModal(true)
  }


  const becomeEducator = async () => {
    try{
       if(isEducator){
        navigate("/educator")
        return
       }
       const res = await instance.get("/api/educator/update-role")
       if(res.status === 200){
        setIsEducator(true)
        toast.success(res.data.message)
       }else{
        toast.error(res.data.message)
       }
    }catch(error){ 
       toast.error(error.message)
    }
  }



  return (
    <>
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 
    lg:px- border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          {
            <>
               <button className='cursor-pointer' onClick={becomeEducator}>{isEducator ? 'Educator Dashbaord' : 'Become Educator'}</button>
              |<Link to="my-enrollments">My Enrollments</Link>
            </>

            
          }
        </div>
           {
            token && user ? 
            <> 
            <div className='flex gap-2'>
              <img className='object-cover w-[40px] h-[40px] rounded-full' src={`http://localhost:5000/uploads/${user.imageUrl}`} alt="" />
  
            <button  onClick={removeToken} className='bg-red-600 cursor-pointer text-white px-5 py-2 rounded-full'>
              Logout
            </button>

            </div>
             </>
             :
             <>
            <button onClick={() => setShowModal(true)} className='bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full'>
              Create Account
            </button>
             </>

        }
      </div>
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gra-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          {
            <>
             <button className='cursor-pointer' onClick={becomeEducator}>{isEducator ? 'Educator Dashbaord' : 'Become Educator'}</button>
              |<Link to="my-enrollments">My Enrollments</Link>
            </>
          }

        </div>
           {
            token  && user? 
            <> 
            <div className='flex items-center gap-2'>
            {<img className='object-cover w-[30px] hidden h-[30px] rounded-full' src={`http://localhost:5000/uploads/${user.imageUrl}`} alt="" />}
  
            <button  onClick={removeToken} className='bg-red-600 cursor-pointer text-white px-3 py-2 rounded-full'>
              Logout
            </button>

            </div>
             </>
             :
             <>
            <button onClick={() => setShowModal(true)} className='bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full'>
              Create Account
            </button>
             </>

        }

      </div>
    </div>
    {showModal && <SignIn/>}
    </>
  )
}

export default Navbar