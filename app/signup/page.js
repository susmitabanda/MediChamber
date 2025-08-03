
"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation"; 

const Signup = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return; 
    }
   
    setError("");
    alert("Signup successful!");

    // sending SMS via API
    try{
      await fetch('/api/send-sms',{
        method: 'POST',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify({
         phone
        }),
      });
    }catch(err){
      console.error("Error sending SMS:", err);
      setError("Failed to send SMS. Please try again later.");
      return;
    }

     router.push("/book");
  };




  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <img src="/stethoscope.png" className="w-12 mx-auto mb-4" alt="MediChamber Logo" />
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-500'>SignUp to MediChamber</h1>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>


          <input type='text' 
          placeholder='Name' 
          required value={name}
          onChange={(e) => setName(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
           />

          <input type='email' 
          placeholder='Email'
          required value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400' />

          <input type='text'
          placeholder='Phone Number'
          required value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400' />
          
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          <input
            type='password'
            placeholder='Confirm Password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <label className='flex items-center text-sm'>
            <input type='checkbox' className='mr-2' required />
            I agree to the <a href='#' className='text-blue-500 hover:underline'>Terms and Conditions</a>
          </label>

          <button type="submit" className='bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200'>
            Signup
          </button>

          <p className='text-center text-gray-500 text-sm'>
            Already have an account? <a href='/login' className='text-blue-500 hover:underline'>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;