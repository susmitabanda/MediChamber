import React from 'react'

const login = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <img src="/stethoscope.png" className="w-12 mx-auto mb-4" alt="MediChamber Logo" />
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-500'>Login to MediChamber</h1>
        <form className='flex flex-col space-y-4'>
          <input type='text' placeholder='Name' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400' />
          <input type='email' placeholder='Email' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400' />
          <input type='text' placeholder='Phone Number' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400' />
          <input type='password' placeholder='Password' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400' />
          <button className='bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200'>Login</button>
          <p className='text-center text-gray-500 text-sm'>
           Don't have an account? <a href='/signup' className='text-blue-500 hover:underline'>SignUp</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default login;