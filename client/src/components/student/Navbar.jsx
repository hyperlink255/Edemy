import React, { useContext } from 'react'
import { assets } from '../../assets/LMS_assets/assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import SignIn from '../../pages/auth/SignIn'
const Navbar = () => {
  const isCourseListPage = location.pathname.includes('/course-list')
  const { navigate, isEducator, setShowModal,showModal } = useContext(AppContext)
  


  return (
    <>
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 
    lg:px- border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          {
            <>
              <button className='cursor-pointer' onClick={() => navigate("/educator")}>{isEducator ? 'Educator Dashbaord' : 'Become Educator'}</button>
              |<Link to="my-enrollments">My Enrollments</Link>
            </>
          }
        </div>
        {
            <button onClick={() => setShowModal(true)} className='bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full'>
              Create Account
            </button>

        }
      </div>
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gra-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          {
            <>
              <button className='cursor-pointer' onClick={() => navigate("/educator")}>{isEducator ? 'Educator Dashbaord' : 'Become Educator'}</button>
              |<Link to="my-enrollments">My Enrollments</Link>
            </>
          }

        </div>
        {
            <button className='cursor-pointer' onClick={() => openSignIn()}><img src={assets.user_icon} alt="" /></button>
        }
      </div>
    </div>
    {showModal && <SignIn/>}
    </>
  )
}

export default Navbar