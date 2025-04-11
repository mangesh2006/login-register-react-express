import React from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data)
      toast.success(response.data.message)
      navigate("/welcome")
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }
  return (
    <>
      <main className="flex justify-center items-center mt-20">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/4 shadow-2xl p-7">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaUser />
            </span>
            <input
              {...register("username")}
              id="username"
              name="username"
              className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
              type="text"
              placeholder="Enter Username"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaLock />
            </span>
            <input
              {...register("password")}
              name="password"
              className="pl-10 pr-3 py-2 border rounded-md outline-none w-full"
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <button
            className="flex items-center justify-center gap-2 cursor-pointer p-2 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-md transition-all"
            type="submit"
          >
            <FaSignInAlt />
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
