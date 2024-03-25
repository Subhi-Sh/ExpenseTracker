import React from 'react'
import { Link } from 'react-router-dom'
export default function NavBar() {
  return (
    <>
        <nav className='flex flex-col items-center justify-center w-2/12 bg-black p-2'>
            <Link to="DashBoard">Dashboard</Link>
            <Link to="Expenses">Dashboard</Link>
            <Link to="AddCategory">Dashboard</Link>
            <Link to="UserProfile">Dashboard</Link>
        </nav>
    </>
  )
}
