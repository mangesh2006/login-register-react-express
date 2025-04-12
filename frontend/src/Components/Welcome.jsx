import React, { useEffect } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Welcome = () => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    const navigate = useNavigate()
    useEffect(() => {
        if (!loggedIn) {
            navigate('/login')
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        toast.success("Logged out successfully");
        navigate("/login");
    }

    return (
        <>
            <main className='flex flex-col gap-2 justify-center items-center text-center mt-10'>
                <p className='text-2xl font-bold'>Welcome</p>
                <button className='flex justify-center items-center bg-blue-600 hover:bg-blue-800 rounded-md font-bold p-2 text-white cursor-pointer' onClick={handleLogout}>
                    <FaSignOutAlt />
                    Log-out
                </button>
            </main>
        </>
    )
}

export default Welcome