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
const NavBar = ({funSetNav}) => {

  return (
    <nav
      className={`bg-[#121212] text-white h-[10%] w-full`}
    >

      <div
        className={`${css.container} py-6 flex justify-evenly items-center` }
      >
        {/* LOGO SECTION */}
        <motion.div
          variants={slideRight(0.1)}
          initial="hidden"
          animate="show"
        >
          <img 
            src="./src/assets/nikeWhiteLogo.png"
            alt="Logo"
            className="w-[100px]"
          />
        </motion.div>
         {/* MENU SECTION */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            {NavBarMenu.map((item) => {
              return (
                <NavLink
                  to={item.link}
                >
                  <motion.div
                    variants={slideRight(item.del)}
                    initial="hidden"
                    animate="show"
                    key={item.id}
                    className="hover:rounded-full hover:bg-white hover:text-black hover:shadow-blue-700 shadow-2xl cursor-pointer"
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
        <div className="md:flex items-center gap-4 hidden">
          <motion.div
            variants={slideRight(1.2)}
            initial="hidden"
            animate="show"
            className="text-2xl cursor-pointer"
          >
            <FaRegUserCircle />
          </motion.div>
          <motion.div
            variants={slideRight(1.4)}
            initial="hidden"
            animate="show"
            className="text-2xl cursor-pointer relative"
          >
            <IoBagHandleOutline />
            <div className="w-4 absolute -top-1 -right-1 h-4 bg-red-500 text-white text-xs flex justify-center items-center rounded-full">2</div>
          </motion.div>
        </div>
        {/* MOBILE SECTION */}
        <div className="md:hidden" onClick={()=>funSetNav()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z"/></svg>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
