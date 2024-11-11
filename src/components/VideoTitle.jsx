import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[20%] px-28 absolute bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-4xl font-bold text-white'>{title}</h1>
        <p className='py-6 text-md  w-1/4 overflow-hidden text-white'>{overview}</p> 
        <button className='bg-white hover:bg-opacity-80 text-black py-4 px-12 w-36 text-lg  mx-2 rounded-md'>Play</button>
        <button className='bg-gray-700 text-white py-4 px-12 w-44 text-lg hover:bg-opacity-50 mx-2 rounded-md'>More Info</button>
    </div>
  )
}

export default VideoTitle