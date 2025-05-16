import { NavLink } from 'react-router-dom'
import './MainNav.css'

const MainNav = () => {
  return (
    <nav className="mainNavContainer flex-wrap md:flex hidden">
      <div className='subNavContainer'>
          <NavLink to="" className='allnav'>All</NavLink>
          <NavLink to="">Addidas</NavLink>
          <NavLink to="">AirForce</NavLink>
          <NavLink to="">Jordan</NavLink>
          <NavLink to="">Sports</NavLink>
          <NavLink to="">Converse</NavLink>
          <NavLink to="">Latest</NavLink>
      </div>
    </nav>
  )
}

export default MainNav
