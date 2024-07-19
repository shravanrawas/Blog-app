import React, { useState } from 'react'
import usefetch from '../../hooks/usefetch'
import { Blog } from '../../../context/contex';
import Followbtn from './followbtn';
import { useNavigate } from 'react-router-dom';

function Follow() {

  const { data, loading } = usefetch('users');
  const [count, setcount] = useState(5);
  const { currentuser } = Blog();
  const users = data && data?.slice(0, count).filter((user) => user.userId !== currentuser?.uid);

  const navigate = useNavigate()

  return (
    <>
      {data && users?.map((user, i) => {
        const { username, bio, userImg, userId } = user;
        return (
          <div key={i} className='flex items-start gap-2 my-4 overflow-y-scroll'>
            <div onClick={()=> navigate('/profile' + '/' + userId)} className='flex-1 flex items-center gap-2 cursor-pointer'>
              <img className='w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full' src={userImg} alt="userimg" />
              <div className='flex flex-col gap-1'>
                <h2 className='font-bold capitalize'>{username}</h2>
                <span className='leading-4 text-gray-500 text-sm line-clamp-2'>{bio || 'This user has no bio'}</span>
              </div>

            </div>
            <Followbtn userId={userId}/>
          </div>
        )
      })}
      {data?.length > 5 && (
        <button onClick={()=> setcount((prev) => users.length < data?.length && prev + 3 )} className='mb-3 text-green-900 text-sm hover:underline'>Load more users</button>
      )}
    </>
  )
}

export default Follow