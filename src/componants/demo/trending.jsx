import React from 'react';
import usefetch from '../hooks/usefetch';
import { BsGraphUpArrow } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function Trending() {
  const { data } = usefetch('posts');
  const gettrending = data && [...data].sort((a, b) => b.pageViews - a.pageViews);

  return (
    <section className='border-b border-gray-600'>
      <div className='size py-[2rem]'>
        <div className='flex items-center gap-3 font-semibold'>
          <span>
            <BsGraphUpArrow />
          </span>
          <h2>Trending</h2>
        </div>
        <div className='grid grid-cols-card gap-3'>
          {gettrending && gettrending.slice(0, 6).map((post, i) => (
            <Trend post={post} key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trending;

const Trend = ({ post, index }) => {
  if (!post) return null; 
  const navigate = useNavigate();
  const formattedTime = format(new Date(post.created), 'PPpp');

  return (
    <main className='flex gap-4 w-full'>
      <span className='text-gray-400 text-4xl mt-4'>{index + 1}</span>
      <div className='py-6 flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <div onClick={() => navigate(`/profile/${post?.userId}`)} className='flex items-center gap-2 cursor-pointer hover:opacity-75'>
            <img
              className='w-[2rem] h-[2rem] object-cover rounded-full'
              src={post.postImg || '/profile.jpg'} 
              alt='img'
            />
            <h2 className='font-semibold text-sm capitalize'>{post.username}</h2>
          </div>
        </div>
        <div onClick={() => navigate(`/post/${post?.id}`)} className='flex flex-col gap-4 cursor-pointer hover:opacity-75'>
          <p className='w-full md:w-[18rem] text-md font-bold line-clamp-2'>{post.title}</p>
          <p className='text-gray-500 text-xs'>{formattedTime}</p>
        </div>
      </div>
    </main>
  );
};
