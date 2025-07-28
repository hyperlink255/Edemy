import React from 'react'
import { assets } from '../../assets/LMS_assets/assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img src={assets.logo_dark} alt="" />
          <p className='mt-6 text-center text-white/80 md:text-left text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ab consectetur adipisci quibusdam voluptatibus repellendus quas provident inventore nemo delectus.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between  md:space-y-2 text-sm text-white/80'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tempore quas sit itaque, officia optio nemo ipsam excepturi temporibus dignissimos?</p>
          <div className='flex items-center gap-2 pt-4'>
            <input className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none
            w-64 h-9 rounded px-2 text-sm' type="email" placeholder='Enter your email'/>
            <button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='text-center py-4 text-sm md:text-sm text-white/60'>Copyright {new Date().getFullYear()} @vikram All Right Reserved.</p>
    </footer>
  )
}

export default Footer