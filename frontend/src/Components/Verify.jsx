import React, { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { MdVerified } from "react-icons/md";
import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => { 
    try {
      const email = localStorage.getItem("verify_email")
      const response = await axios.post("http://localhost:3000/verify", {
        otp: data.otp,
        email: email
      })
      toast.success(response.data.message)
      localStorage.removeItem("verify_email")
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed')
    }
  }
  return (
    <>
      <main className='flex justify-center items-center'>
        <div className='flex justify-center items-center shadow rounded-sm flex-col gap-2 p-4 w-96 my-5'>
          <p className='text-justify'>An otp sent on your e-mail. Otp is available for only 10 minutes.</p>
          <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-2'>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaLock />
              </span>
              <input
                {...register('otp')}
                name="otp"
                className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
                type="text"
                placeholder="Enter otp"
                maxLength={6}
              />
            </div>
            <button className='bg-blue-600 hover:bg-blue-800 transition-all rounded-md p-2 cursor-pointer gap-1.5 text-white font-bold flex items-center justify-center' type="submit">
              <MdVerified />
              Verify
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Verify