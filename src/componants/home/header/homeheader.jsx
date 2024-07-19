import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiLogoMediumOld } from "react-icons/bi";
import Search from '../search';
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotifications } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from '../../../utils/modal';
import Usermodal from '../usermodal';
import { CiSearch } from "react-icons/ci";
import { Blog } from '../../../context/contex';
import Loading from '../../loading/loading';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';

function Homeheader() {
  const [modal, setmodal] = useState(false);
  const [searchModal, setsearchmodal] = useState(false);
  const { allusers, userloading, currentuser, setpublish, title, description} = Blog();
  const [loading, setloading] = useState(false);

  const { pathname } = useLocation();
  const editpath = pathname.split('/')[1];

  const getuserdata = allusers.find((user) => user.id === currentuser?.uid);

  const postId = pathname.split('/')[2];

  const navigate = useNavigate(null);

  const handeledit = async () => {
    try {
      setloading(true);

      const ref = doc(db, 'posts', postId);
      await updateDoc(ref, {
        title,
        desc: description
      });

      navigate(`/post/${postId}`);
      toast.success('Post Updated');
    } catch (error) {
      console.error('Failed to update post:', error);
      toast.error('Failed to update post');
    } finally {
      setloading(false);
    }
  };

  return (
    <header className='border-b border-gray-200'>
      {userloading && <Loading />}
      <div className='size h-[60px] flex items-center justify-between'>
        <div className='flex items-center gap-3 ml-1'>
          <Link to='/'>
            <span className='text-4xl'>
              <BiLogoMediumOld />
            </span>
          </Link>
          <Search modal={searchModal} setmodal={setsearchmodal} />
        </div>

        <div className='flex items-center gap-3 sm:gap-7'>
          <span onClick={() => setsearchmodal(true)} className='flex sm:hidden text-3xl text-gray-300 cursor-pointer'>
            <CiSearch />
          </span>
          {pathname === '/write' ? (
            <button onClick={() => setpublish(true)} className='btn !bg-green-700 !py-1 !text-white !rounded-full'>
              Publish
            </button>
          ) : editpath === 'editpost' ? (
            <button onClick={handeledit} className={`btn !bg-green-700 !py-1 !text-white !rounded-full ${loading ? 'opacity-40' : ''}`}>{loading ? 'Saving...' : 'Save Changes'}</button>
          ) : (
            <Link to='/write' className='hidden md:flex items-center gap-1 text-gray-500'>
              <span className='text-3xl'>
                <LiaEditSolid />
              </span>
              <span className='text-sm mt-2'>Write</span>
            </Link>
          )}
          <span className='text-3xl text-gray-500 cursor-pointer'>
            <IoMdNotifications />
          </span>
          <div className='flex items-center relative'>
            <img
              onClick={() => setmodal(true)}
              className='w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer'
              src={getuserdata?.userImg ? getuserdata?.userImg : '/profile.jpg'}
              alt="profile-img"
            />
            <span className='text-gray-500 cursor-pointer'>
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setmodal={setmodal}>
              <div className={`${modal ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-100`}>
                <Usermodal setmodal={setmodal} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Homeheader;
