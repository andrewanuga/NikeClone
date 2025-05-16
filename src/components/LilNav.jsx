import { Css as css } from "./Css"
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const NavBarMenu = [
  {
    id : 1,
    title : "Home",
    link : "/",
    delay : "0.2",
  },
  {
    id : 2,
    title : "Men",
    link : "/men",
    delay : "0.4",
  },
  {
    id : 3,
    title : "Women",
    link : "/women",
    delay : "0.6",
  },
  {
    id : 4,
    title : "Kids",
    link : "/kids",
    delay : "0.8",
  },
  {
    id : 5,
    title : "New Release",
    link : "/new",
    delay : "1",
  },
]

const slideRight = (delay) => ({
  hidden : {
    opacity : 0,
    x : -100,
  },
  show : {
    opacity : 1,
    x : 0,
    transition : {
      duration : 0.5,
      delay : delay,
    },
  },
})
const LilNav = ({setNav, funSetNav}) => {

  return (
    <nav
      className={`block md:hidden h-dvh transition-all duration-300 text-white ${setNav? "w-[80%]": "w-[0]"} fixed z-[100000000] top-0 right-0 glass`}
    >

      <div
        className={`${css.container} m-4 py-6 flex justify-between items-center flex-wrap` }
      >
        {/* LOGO SECTION */}
        <div className="w-full h-auto flex justify-center items-center relative my-10">
            <motion.div
              variants={slideRight(0.1)}
              initial="hidden"
              animate="show"
              className="w-full relative -top-10"
            >
              <img
                src="./src/assets/nikeWhiteLogo.png"
                alt="Logo"
                className="w-[100px]"
              />
            </motion.div>
            <div onClick={()=>funSetNav()} className="relative -top-10 w-auto h-auto justify-center items-center rounded-full p-3 bg-[#1e1d20] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
              </div>
        </div>
         {/* MENU SECTION */}
        <div className="w-full">
          <ul className="flex items-center gap-4 justify-center flex-wrap">
            {NavBarMenu.map((item) => {
              return (
                <NavLink
                  to={item.link}
                  className={"w-full my-5"}
                >
                  <motion.div
                    variants={slideRight(item.del)}
                    initial="hidden"
                    animate="show"
                    key={item.id}
                    className="hover:rounded-full text-black text-shade hover:bg-white hover:text-black hover:shadow-blue-700 shadow-2xl cursor-pointer"
                  >
                    
                    <motion.li
                      className={`inline-block linkto py-2 px-4 uppercase font-${css.barlow} font-semibold hover:scale-105 duration-300`}
                    >
                    {item.title}
                    </motion.li>
                  </motion.div>
                </NavLink>
              )
            })}
          </ul>
        </div>
        {/* ICON SECTION */}
        <div className="flex items-center gap-4 absolute bottom-0 left-0 m-4">
          <motion.div
            variants={slideRight(1.2)}
            initial="hidden"
            animate="show"
            className="text-2xl cursor-pointer"
          >
            <FaRegUserCircle/>
          </motion.div>
          <motion.div
            variants={slideRight(1.4)}
            initial="hidden"
            animate="show"
            className="text-2xl cursor-pointer relative"
          >
            <IoBagHandleOutline/>
            <div className="w-4 absolute -top-1 -right-1 h-4 bg-red-500 text-white text-xs flex justify-center items-center rounded-full">2</div>
          </motion.div>
        </div>
        {/* MOBILE SECTION */}
        <div className="md:hidden">

        </div>
      </div>
    </nav>
  )
}

export default LilNav
