import React from 'react'
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from 'react-icons/fa'
import { signupSchema } from '../signupSchema.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data)
      if (response.data.message === 'exist') {
        toast.error('User already exist')
      } else if (response.status === 200) {
        localStorage.setItem('verify_email', data.email)
        navigate('/verify')
      }
    } catch (error) {
      const message = error.response?.data?.message;
      if (message === 'exist') {
        toast.error('User already exists');
      } else if (message === 'not verified') {
        toast.error('Email not verified please sign-up again');
      } else {
        toast.error('Signup error');
      }
    }
  }

  const onError = (errors) => {
    const firstError = Object.values(errors)[0]
    if (firstError?.message) {
      toast.error(firstError.message)
    } else {
      toast.error("Something went wrong!")
    }
  }
  return (
    <>
      <main className="flex justify-center mt-20">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4 w-1/4 shadow-2xl p-7">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaUser />
            </span>
            <input
              {...register('username')}
              id="username"
              name="username"
              className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
              type="text"
              placeholder="Enter Username"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaEnvelope />
            </span>
            <input
              {...register('email')}
              name="email"
              className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
              type="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaLock />
            </span>
            <input
              {...register('password')}
              name="password"
              className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaLock />
            </span>
            <input
              {...register('confirmPassword')}
              name="confirmPassword"
              className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button className="flex items-center justify-center gap-2 cursor-pointer p-2 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-md transition-all" type="submit">
            <FaUserPlus />
            Sign-up
          </button>
        </form>
      </main>
    </>
  )
}

export default Signup