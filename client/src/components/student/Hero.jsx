import React from 'react'
import { assets } from '../../assets/LMS_assets/assets/assets'
import Search from './Search'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 text-center bg-gradient-to-b from-cyan-100/70 space-y-7'>
      <h1 className='md:text-[48px] text-[26px] relative font-bold text-gray-800 max-w-3xl mx-auto'>Empower your future with the courses designed to <span className='text-blue-600'>
        fit your choise</span><img src={assets.sketch} className='md:block hidden absolute -bottom-7 right-0' alt="" /></h1>
        <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ea hic est ab. Doloremque vero, dolor amet odit quod adipisci!
        </p>
        <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ea hic est ab. Doloremque vero, dolor amet odit quod adipisci!
        </p>
        <Search/>
    </div>
  )
}

export default Hero