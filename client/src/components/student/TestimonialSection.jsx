import React from 'react'
import { assets, dummyTestimonial } from '../../assets/LMS_assets/assets/assets'

const TestimonialSection = () => {
  return (
    <div className=' md:px-20 px-8'>
    <div className='pb-14 px-8 md:px-0 '>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugit architecto expedita minima, nulla quia enim, facere iure porro, delectus sunt <br/> soluta ducimus? Officiis nulla in ipsum culpa praesentium ipsam.</p>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-14'>
        {dummyTestimonial.map((testimonial,index) => {
          return (
            <div className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden' key={index}>
              <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
                <img src={testimonial.image} alt="" className='w-12 h-12 rounded0full' />
                <div >
                  <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                  <p className='text-gray-800/80'>{testimonial.role}</p>
                  </div>
                </div>
                  <div className='p-5 pb-7'>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((_,i) => (
                        <img src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt=""/>
                      ))}
                      </div>
                        <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
                    </div>
                    <a href='#' className='text-blue-500 underline px-5'>Read More</a>
            </div> 
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default TestimonialSection