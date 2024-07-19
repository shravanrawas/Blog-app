import React from 'react';
import usefetch from '../../hooks/usefetch';
import Loading from '../../loading/loading';
import Postcard from './postcard';

function Posts() {
  const { data, loading } = usefetch('posts');
  
  return (
    <section className='flex flex-col gap-[2.5rem]'>
      {loading ? (
        <Loading />
      ) : (
        data.map((post, i) => <Postcard post={post} key={i} />)
      )}
    </section>
  );
}

export default Posts;
