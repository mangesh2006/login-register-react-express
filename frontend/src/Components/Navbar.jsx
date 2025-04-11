import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa'

const Navbar = () => {
    return (
        <>
            <nav className='text-white p-3 bg-blue-700 flex justify-between gap-1 px-7'>
                <Link to={'/'} className='text-2xl font-bold'>Logo</Link>
                <ul>
                    <li className='flex gap-2'>
                        <Link to={'/login'} className='flex items-center justify-center gap-1.5 border bg-transparent p-1.5 rounded-md'>
                            <FaSignInAlt/>
                            Login
                        </Link>
                        <Link to={'/signup'} className='flex items-center justify-center gap-1.5 border bg-transparent p-1.5 rounded-md'>
                            <FaUserPlus />
                            Sign-up
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar