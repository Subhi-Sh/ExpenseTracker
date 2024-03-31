import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaMoneyBill, FaMoneyCheckAlt, FaClipboardList,FaTags } from "react-icons/fa";
import { FiSettings } from 'react-icons/fi';


export default function NavBar() {
  return (
    <>
      <nav className="font-raleway flex flex-col mt-4 gap-4 items-start justify-center w-full">
        <div className="text-lg font-bold text-[#EEEEEE] ml-2">GENERAL</div>
        <Link
          className="flex justify-center items-center w-full text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline focus:bg-[#8AA6A3] focus:no-underline hover:text-[#EEEEEE] focus:text-[#EEEEEE] hover:bg-[#8AA6A3] ml-2"
          to="/"
          style={{ textDecoration: "none !important" }}
        >
          <FaChartPie className="mr-2" />
          Dashboard
        </Link>
        <Link
          className="flex justify-center items-center w-full text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline hover:text-[#EEEEEE] focus:bg-[#8AA6A3] focus:no-underline focus:text-[#EEEEEE] hover:bg-[#8AA6A3] ml-2"
          to="expenses"
          style={{ textDecoration: "none !important" }}
        >
          <FaMoneyBill className="mr-2" />
          Expenses
        </Link>
        <Link
          className="flex justify-center items-center w-full text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline hover:text-[#EEEEEE] focus:bg-[#8AA6A3] focus:no-underline focus:text-[#EEEEEE] hover:bg-[#8AA6A3] ml-2"
          to="incomes"
          style={{ textDecoration: "none !important" }}
        >
          <FaMoneyCheckAlt className="mr-2" />
          Incomes
        </Link>
        
        <Link
          className="flex justify-center items-center w-full text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline hover:text-[#EEEEEE] focus:bg-[#8AA6A3] focus:no-underline focus:text-[#EEEEEE] hover:bg-[#8AA6A3] ml-2"
          to="categories"
          style={{ textDecoration: "none !important" }}
        >
          <FaTags className="mr-2" />
          Categories
        </Link>
        <div className="text-lg font-bold text-[#EEEEEE] mt-4 ml-2">OTHERS</div>
        <Link
          className="flex justify-center items-center w-full text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline hover:text-[#EEEEEE] focus:bg-[#8AA6A3] focus:no-underline focus:text-[#EEEEEE] hover:bg-[#8AA6A3] ml-2"
          to="reports"
          style={{ textDecoration: "none !important" }}
        >
          <FaClipboardList className="mr-2" />
          Reports
        </Link>
        <Link
          className="flex justify-center items-center w-full text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline hover:text-[#EEEEEE] focus:bg-[#8AA6A3] focus:no-underline focus:text-[#EEEEEE] hover:bg-[#8AA6A3] ml-2"
          to="settings"
          style={{ textDecoration: "none !important" }}
        >
          <FiSettings className="mr-2" />
          Settings
        </Link>

      </nav>
    </>
  );
}
