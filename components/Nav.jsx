
import { NavLink } from 'react-router-dom'
import '../styles/navbar/style.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'


const Nav = () => {
    const [showMenu, setshowMenu] = useState(false);
    const isLogin = useSelector((state) => state.users.isLogin);
    const isAdmin = useSelector((state) => state.users.isAdmin);

    const handler = () => {
        setshowMenu(!showMenu)
    }
    const closeMenu = () => {
        setshowMenu(false);
    }
    return (
        <div>
            <nav>
                <div className="navbar">
                    <div className={`li ${showMenu ? "menu-mobile" : "menu-window"}`} >
                        <NavLink onClick={closeMenu} to="/" style={({ isActive }) => ({
                            color: isActive ? "#56483b" : ""
                        })}>Home</NavLink>
                        <NavLink onClick={closeMenu} to="/product" style={({ isActive }) => ({
                            color: isActive ? "#56483b" : ""
                        })}>Products</NavLink>
                        {
                            isLogin &&
                            <NavLink onClick={closeMenu} to="/cart" style={({ isActive }) => ({
                                color: isActive ? "#56483b" : ""
                            })}>Cart</NavLink>
                        }

                        {
                            !isLogin &&
                            <NavLink onClick={closeMenu} to="/login" style={({ isActive }) => ({
                                color: isActive ? "#56483b" : ""
                            })}>Login</NavLink>}

                        {
                            isLogin &&
                            <NavLink onClick={closeMenu} to="/Profile" style={({ isActive }) => ({
                                color: isActive ? "#56483b" : ""
                            })}>Profile</NavLink>
                        }
                        {
                            isAdmin &&
                            <NavLink onClick={closeMenu} to="/CreateProduct" style={({ isActive }) => ({
                                color: isActive ? "#56483b" : ""
                            })}>CreateProduct</NavLink>
                        }

                    </div>
                    <button onClick={handler} className='menu'><i className="ri-more-2-fill"></i></button>
                </div>
            </nav>
        </div>
    )
}

export default Nav
