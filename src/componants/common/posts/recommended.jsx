import React, { useEffect, useState } from 'react';
import usefetch from '../../hooks/usefetch';
import { useNavigate } from 'react-router-dom';

function Recommended({ post: singlepost }) {
  const { data } = usefetch('posts');
  const [commontags, setcommontags] = useState([]);
  
  let recommendedpost = [];

  useEffect(() => {
    data && data.forEach((post) => {
      if (post?.id === singlepost.id) {
        return;
      }
      const postags = post.tag;
      const commentags = postags.filter((tag) => singlepost?.tag?.includes(tag));
      
      if (commentags.length > 0) {
        recommendedpost.push({
          ...post,
          commentags
        });
      }
    });
    recommendedpost.sort(() => Math.round() * -0.5);
    const minRecommendation = 4;
    const slicepost = recommendedpost.slice(0, minRecommendation);
    setcommontags(slicepost);
  }, [data, singlepost]);

  console.log('this is common tags', commontags);

  return (
    <section className='bg-gray-100'>
      <div className='w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]'>
        <h2 className='text-xl font-bold'>Recommended from Medium</h2>
        {commontags.length === 0 ? <p>No recommended post</p> : (
          <div className='grid grid-cols-card gap-[2rem] my-[3rem]'>
            {commontags.map((post) => (<Post post={post} key={post.id} />))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Recommended;

const Post = ({ post }) => {
  const navigate = useNavigate();
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { data } = usefetch('users');
  const user = data ? data.find((user) => user?.id === userId) : null;

  if (!user) {
    return null; 
  }

  const { username, userImg } = user;

  // Format the creation date
  const formattedDate = new Date(created).toLocaleDateString();

  return (
    <div onClick={() => navigate(`/post/${postId}`)} className='w-full cursor-pointer'>
      <img src={postImg} alt="img" className='w-full h-[200px] object-cover' />
      <div className='flex items-center gap-1 py-3'>
        <img src={userImg} alt="" className='w-[2rem] h-[2rem] object-cover rounded-full' />
        <h3 className='text-sm capitalize'>{username}</h3>
      </div>
      <h2 className='font-extrabold leading-5 line-clamp-2'>{title}</h2>
      <div className='line-clamp-2 my-3 text-gray-500 leading-5' dangerouslySetInnerHTML={{ __html: desc }} />
      <p className='text-sm text-gray-600'>
        {`Posted on: ${formattedDate}`}
      </p>
    </div>
  );
};
