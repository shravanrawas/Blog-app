import React from 'react'
import usefetch from '../../../hooks/usefetch'
import Loading from '../../../loading/loading'; 
import Postcard from '../../../common/posts/postcard';

function Profilehome({ getUsers }) {
  const { data, loading } = usefetch('posts');

  const userPosts = data ? data.filter(post => post.userId === getUsers?.userId) : [];

  return (
    <div className='flex flex-col gap-5 mb-[4rem]'>
      {loading ? (
        <Loading />
      ) : userPosts.length === 0 ? (
        <p className='text-gray-500'>
          <span className='capitalize'>{getUsers?.username}</span> has no posts
        </p>
      ) : (
        userPosts.map((post, i) => (
          <Postcard post={post} key={i} /> 
        ))
      )}
    </div>
  );
}

export default Profilehome;
