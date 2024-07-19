import React, { useState } from 'react';
import Profileabout from './activities/profileabout';
import Profilehome from './activities/profilehome';
import Profilelist from './activities/profilelist';
import Modal from '../../../utils/modal';
import { LiaTimesSolid } from "react-icons/lia";
import { discoverActions } from '../../../data';
import { FaChevronLeft } from "react-icons/fa";
import Editprofile from './Editprofile';
import { Blog } from '../../../context/contex';
import { useParams } from 'react-router-dom';
import useSingleFetch from '../../hooks/usesingelfetch';

function Profile() {
  const activities = [
    { title: 'Home', comp: Profilehome },
    { title: 'Lists', comp: Profilelist },
    { title: 'About', comp: Profileabout }
  ];

  const { allusers } = Blog();
  const { userId } = useParams();
  const getUsers = allusers.find((user) => user.id === userId);

  const { data: follows, loading: followsLoading } = useSingleFetch('users', userId, 'follows');
  const { data: followers, loading: followersLoading } = useSingleFetch('users', userId, 'followers');

  const [currentactive, setcurrentactive] = useState(activities[0]);
  const [modal, setmodal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const {currentuser} = Blog();

  return (
    <section className='size flex gap-[4rem] relative'>
      <div className='mt-[2rem] flex-[2]'>
        <div className='flex items-end gap-4'>
          <h2 className='text-3xl sm:text-5xl font-bold capitalize'>{getUsers?.username}</h2>
          <p className='text-gray-500 text-xs sm:text-sm'>
            Followers({followers ? followers.length : 0})
          </p>
          <p className='text-gray-500 text-xs sm:text-sm'>
            Followings({follows ? follows.length : 0})
          </p>
        </div>

        <div className='flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]'>
          {activities.map((item, i) => (
            <div key={i} className={`py-[0.5rem] ${item.title === currentactive.title ? 'border-b border-gray-500' : ''}`}>
              <button onClick={() => setcurrentactive(item)}>{item.title}</button>
            </div>
          ))}
        </div>
        <currentactive.comp getUsers={getUsers} seteditmodal={seteditmodal}/>
      </div>
      <button onClick={() => setmodal(true)} className='fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden'>
        <FaChevronLeft/>
      </button>
      <Modal modal={modal} setmodal={setmodal}>
        <div className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:relative ${modal ? 'translate-x-0' : 'translate-x-[100%] md:translate-x-0'} transition-all duration-500`}>
          <div className='pb-4 text-right'>
            <button onClick={() => setmodal(false)} className='inline-block md:hidden'>
              <LiaTimesSolid/>
            </button>
          </div>
          <div className='sticky top-7 flex flex-col justify-between'>
            <img className='w-[3.5rem] h-[3.5rem] object-cover rounded-full' src={getUsers?.userImg || '/profile.jpg' } alt="profile-img" />
            <h2 className='py-2 font-bold capitalize'>{getUsers?.username}</h2>
            <p className='text-gray-500 first-letter:uppercase text-sm'>{getUsers?.bio}</p>
            {currentuser?.uid === getUsers?.userId && (<button onClick={() => seteditmodal(true)} className='text-green-700 pt-6 text-sm w-fit'>Edit profile</button>)}
            <div className='flex-[1] flex items-center flex-wrap gap-3 pt-8'>
              {discoverActions.map((item) => (
                <button className='text-xs text-black1' key={item}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      {editmodal && <Editprofile getUsers={getUsers} editmodal={editmodal} seteditmodal={seteditmodal}/>}
    </section>
  );
}

export default Profile;
