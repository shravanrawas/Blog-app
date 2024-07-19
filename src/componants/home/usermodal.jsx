import React from 'react'
import { LiaUserAltSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { BiSpreadsheet } from "react-icons/bi";
import { Blog } from '../../context/contex';
import { LiaEditSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { secreteEmail } from '../../utils/helper';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import {toast} from 'react-toastify'
import { FaHome } from "react-icons/fa";


function Usermodal({setmodal}) {

    const { currentuser , setauthmodal} = Blog();

    const userModal = [
        {
            title: 'Home',
            icon: <FaHome/>,
            path: '/'
        },
        {
            title: 'Profile',
            icon: <LiaUserAltSolid />,
            path: `/profile/${currentuser?.uid}`
        },
        {
            title: 'Library',
            icon: <MdOutlineLocalLibrary />,
            path: `/library`
        },
        {
            title: 'Stories',
            icon: <BiSpreadsheet />,
            path: `/stories`
        },
        {
            title: 'Stats',
            icon: <HiOutlineChartBar />,
            path: `/stats`
        },

    ];

    const navigate = useNavigate();
    const handelsignout = async () => {
          try {
            await signOut(auth);
            navigate('/demo');
            setauthmodal(false)
          } catch (error) {
            toast.error(error.message)
          }
    }

    return (
        <section className='absolute w-[18rem] p-6 bg-white right-0 top-[100%] shadow rounded-md z-50 text-gray-500'>
            <Link onClick={() => setmodal(false)} to='/write' className='flex md:hidden items-center gap-1 text-gray-500 pb-2 border-b border-gray-300'>
                <span className='text-3xl'><LiaEditSolid /></span>
                <span className='text-sm mt-2 '>Write</span>
            </Link>
            <div className='flex flex-col gap-4 border-b border-gray-300 pb-5 pt-4'>
                {userModal.map((item, i) => (
                    <Link onClick={()=>setmodal(false)} className='flex items-center gap-2 text-gray-500 hover:text-black/70' key={i} to={item.path}>
                        <span className='text-2xl'>{item.icon}</span>
                        <h2 className='text-md'>{item.title}</h2>
                    </Link>
                ))}
            </div>
            <button onClick={handelsignout} className='flex flex-col gap-2 pt-5 cursor-pointer hover: text-black/70'>
                <span className='flex items-center gap-2'><BiLogOut />Sign out</span>
                <span className='text-sm'>{secreteEmail(currentuser?.email)}</span>
            </button>
        </section>
    )
}

export default Usermodal