import React from 'react';
import usefetch from '../../hooks/usefetch';
import Loading from '../../loading/loading';
import Savedpost from './actions/savedpost';
import { Blog } from '../../../context/contex';
import Actions from './actions/actions';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function Postcard({ post }) {
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { data, loading } = usefetch('users');
  const { currentuser } = Blog();
  const getUsers = data && data.find((user) => user.id === userId);
  const navigate = useNavigate();
  const formattedTime = format(new Date(created), 'PPpp');

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div onClick={() => navigate(`/post/${postId}`)} className='flex flex-col sm:flex-row gap-4 cursor-pointer'>
          <div className='flex-[2.5]'>
            <div className='flex justify-start items-center gap-2 mb-5'>
              {getUsers?.userImg ? (
                <img className='h-[40px] w-[40px] object-cover rounded-full' src={getUsers?.userImg} alt="user" />
              ) : (
                <p>No Image</p>
              )}
              <p className='font-semibold capitalize'>{getUsers?.username}</p>
            </div>
            <h2 className='text-xl font-bold line-clamp-2 leading-6 capitalize'>{title}</h2>
            <div className='py-1 text-gray-500 line-clamp-2 leading-5' dangerouslySetInnerHTML={{ __html: desc }} />
          </div>
          <div className='flex-[1]'>
            <img src={postImg} alt="postimg" className='w-[55rem] h-[8rem] object-cover' />
          </div>
        </div>
      )}
      <div className='flex items-center justify-between w-full md:w-[100%] mt-[2rem] md:mt-0'>
        <p className='text-xs text-gray-600'>{formattedTime}</p>
        <div className='flex items-center gap-3'>
          <Savedpost post={post} getUsers={getUsers} />
          {currentuser?.uid === userId && <Actions post={post} />}
        </div>
      </div>
    </>
  );
}

export default Postcard;
