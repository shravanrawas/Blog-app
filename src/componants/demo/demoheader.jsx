import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../../data'
import Auth from './Auth/auth';
import { BiLogoMediumOld } from "react-icons/bi";
import { Blog } from '../../context/contex';

function Demoheader() {

    const [isActive, setactive] = useState(false);
    const {authmodal, setauthmodal} = Blog();

    useEffect(()=>{
        const scrollview = () => {
            window.scrollY > 50 ? setactive(true) : setactive(false)
        }
        window.addEventListener('scroll', scrollview)
    },[])

    return (
        <header className={`border-b border-black sticky top-0 z-50 ${isActive ? 'bg-white' : 'bg-banner'} transition-all duration-500`}>
            <div className='size h-[70px] flex items-center justify-between'>
                <Link to={'/'}>
                    <BiLogoMediumOld className='h-[2.5rem] w-[2.5rem]'/>
                </Link>
                <div className='flex items-center gap-5'>
                <div className='hidden text-sm sm:flex items-center gap-5'>
                    {nav.map((link, i) => (
                        <Link key={i} to={link.path}>
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className='relative'>
                    <button onClick={() => setauthmodal(true)} className='hidden text-sm sm:flex items-center gap-5'>Sign in</button>
                    <Auth modal={authmodal} setmodal={setauthmodal}/>
                </div>
                <button  onClick={() => setauthmodal(true)} className={`bg-black text-white rounded-full px-3 p-2 text-sm font-medium ${isActive ? 'bg-green-700' : 'black'}`}>Get started</button>
            </div>
            </div>
        </header>
    )
}

export default Demoheader
