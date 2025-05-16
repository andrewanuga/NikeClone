import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import LilNav from "../components/LilNav";
import { useState } from "react";

const RootLayout = () => {
    const [openNav, setOpenNav] = useState(false)
    const NavSetter=()=>{
    setOpenNav(!openNav)
  }
  return (
    <div className="w-full h-dvh bg-[#2a292b] flex flex-wrap items-center justify-center">
      <NavBar funSetNav={NavSetter}/>
      <LilNav setNav={openNav} funSetNav={NavSetter}/>
      <div className="w-full h-[90%]">
          <Outlet />
      </div> 
    </div>
  );
}

export default RootLayout;
