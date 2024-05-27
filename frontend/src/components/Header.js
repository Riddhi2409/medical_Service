import React, { useContext, useEffect, useRef } from 'react'
import logo from '../assets/images/logo.png'
import userImg from '../assets/images/avatar-icon.png'
import { Link, NavLink } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../context/AuthContext';

const navLinks = [
    {
        path: "/home",
        show: "Home"
    },
    {
        path: "/doctors",
        show: "Doctor"
    },
    {
        path: "/services",
        show: "Services"
    },
    {
        path: "/contact",
        show: "Contact"
    }
]

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    
    const {user,token,role}=useContext(authContext);
    console.log(role);
    const menuToggler = () => {
        menuRef.current.classList.toggle('show_menu')
    }
    console.log(user,token)
    var url= user?.role==='doctor' ? '/doctors/profile/me' : '/users/profile/me'
    return (
        <header className=' header flex items-center justify-center' >
            <div className='container'>
                <div className='flex items-center justify-between'>
                    <div>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='navigation ' ref={menuRef} onClick={menuToggler}>
                        <div className='menu items-center gap-[2.5rem] flex' >
                            {navLinks.map(nav => (
                                <NavLink to={nav.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] ' : 'text-textColor text-[16px] leading-7 font-[500] hover:text-textColor'}>{nav.show}</NavLink>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center flex-row gap-2 justify-center'>
                        {user && token ?
                         <div >
                            <Link to={role==='doctor' ? '/doctors/profile/me' : 'users/profile/me'}>
                                <figure>
                                <img src={user?.photo} alt="" className='w-[35px] h-[35px] rounded-full cursor-pointer' />
                                </figure>
                            </Link>
                            {/* <h1>{user?.name}</h1> */}
                        </div> :
                         <Link to='/login'>
                            <button className=' bg-primaryColor py-2 px-6 text-white font-[600] h-[35px] flex items-center justify-center rounded-lg'>
                                Login
                            </button>
                        </Link>} 
                        
                        
                        <span className='md:hidden' onClick={menuToggler}>
                            <BiMenu className='w-6 h-8 cursor-pointer'/>
                        </span>
                    </div>
                </div>

            </div>
        </header>

    )
}

export default Header