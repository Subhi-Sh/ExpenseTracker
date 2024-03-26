import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <nav className="flex flex-col mt-4 gap-4 items-center justify-center w-full">
        <Link
          className="w-full text-center text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline focus:bg-[#8AA6A3] focus:no-underline hover:text-[#EEEEEE] focus:text-[#EEEEEE] hover:bg-[#8AA6A3] "
          to="/"
          style={{ textDecoration: "none !important" }}
        >
          Dashboard
        </Link>
        <Link
          className="w-full text-center text-[#EEEEEE] text-xl rounded-3xl p-2 hover:no-underline hover:text-[#EEEEEE] focus:bg-[#8AA6A3] focus:no-underline focus:text-[#EEEEEE] hover:bg-[#8AA6A3] "
          to="expenses"
          style={{ textDecoration: "none !important" }}
        >
          Expenses
        </Link>
      </nav>
    </>
  );
}
