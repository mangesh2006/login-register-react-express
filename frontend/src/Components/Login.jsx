import React from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data)
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true")
        toast.success(response.data.message)
        navigate("/welcome")
      }
    } catch (error) {
      const message = error.response?.data?.message;
      if (message === 'not exist') {
        toast.error('User dose not exists');
      } else if (message === 'Invalid password') {
        toast.error('Invalid Password');
      } else if (message === 'not verified') {
        toast.error('Please verify your email before logging in');
      }
    }
  }

  const onInvalid = () => {
    const firstError = Object.values(errors)[0];
    toast.error(firstError?.message);
  }
  return (
    <>
      <main className="flex justify-center items-center mt-20">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 w-1/4 shadow-2xl p-7">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaUser />
            </span>
            <input
              {...register("username", { required: "Username is required" })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
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
