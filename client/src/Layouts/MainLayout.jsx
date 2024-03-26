import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Logo from "../assets/Logo.png";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen justify-between p-2">
      <header className="w-2/12 flex flex-col justify-between  bg-[#222831]   m-2 p-4 rounded-3xl ">
        <article className="flex flex-col  h-auto">
          <h1 className="text-4xl text-center p-4 text-[#8AA6A3] w-full">
            Expenses Tracker
          </h1>
          <NavBar />
        </article>

        <figure className="w-full  mb-4 flex items-center justify-center">
          <img width={500} src={Logo} alt="Logo" />
        </figure>
      </header>
      <main className=" bg-[#8AA6A3] flex  justify-center shadow-lg p-4 rounded-3xl m-2 w-4/5">
        <Outlet />
      </main>
    </div>
  );
}
