import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div className="w-full h-dvh bg-[#2a292b] flex flex-wrap items-center justify-center">
      <NavBar />
      <div className="w-full h-[90%]">
          <Outlet />
      </div> 
    </div>
  );
}

export default RootLayout;
