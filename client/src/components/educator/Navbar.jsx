import React from 'react'
import { assets, dummyEducatorData } from '../../assets/LMS_assets/assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
const Navbar = () => {
  const {user} = useContext(AppContext)

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to="/">
      <img src={assets.logo} className='w-28 lg:w-32' alt="" />
      </Link>
      <div className='flex gap-3 items-center'>
        <p>Hi! {user ? user.name : 'Developers'}</p>
        {user && <img className='w-[40px] h-[40px] object-cover rounded-full' src={`http://localhost:5000/uploads/${user.imageUrl}`}/>}
      </div>
    </div>
  )
}

export default Navbar