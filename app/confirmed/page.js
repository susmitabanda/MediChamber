import React from 'react'

const confirmed = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
        <img src="confirm.gif" className='w-25 h-25'></img>
        <h1 className='text-3xl font-bold text-red-600 mt-5'>Appointment Confirmed!</h1>
    </div>
  )
}

export default confirmed;