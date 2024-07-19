import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import Loading from '../../loading/loading';
import { Blog } from '../../../context/contex';
import Followbtn from '../../home/userstofollow/followbtn';
import Savedpost from './actions/savedpost';
import Actions from './actions/actions';
import Like from './actions/Like';
import Sharepost from './actions/Sharepost';
import Comment from './actions/Comment';
import Recommended from './recommended';
import Comments from '../comments/comments';
import { readTime } from '../../../utils/helper';

function Singelpost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const { currentuser } = Blog();
  const inrender = useRef(true);

  useEffect(() => {
    if (inrender?.current) {
      const inpageview = async () => {
        try {
          const ref = doc(db, 'posts', postId);
          await updateDoc(ref, {
            pageViews: increment(1)
          }, { merge: true });
        } catch (error) {
          toast.error(error.message);
        }
      };
      inpageview();
    }
    inrender.current = false;
  }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, 'posts', postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const postData = postSnap.data();
          if (postData?.userId) {
            const userRef = doc(db, 'users', postData.userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const userData = userSnap.data();
              setPost({ ...postData, ...userData, id: postId });
              const time = readTime({ __html: postData.desc });
              setReadingTime(time);
            }
          }
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const { title, desc, postImg, username, created, userImg, userId } = post;
  const navigate = useNavigate();

  return (
    <>
      {loading ? <Loading /> :
        <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
          <h2 className='text-4xl font-extrabold capitalize'>{title}</h2>
          <div className='flex items-center gap-2 py-[2rem]'>
            <img onClick={() => navigate(`/profile/${userId}`)} className='w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer' src={userImg} alt="img" />
            <div>
              <div className='capitalize'>
                <span>{username} .</span>
                {currentuser?.uid !== userId && <Followbtn userId={userId} />}
              </div>
              <p className='text-sm text-gray-500'>
                {`reading time: ${readingTime} min`}
                <span className='ml-1'></span>
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]'>
            <div className='flex items-center gap-5'>
              <Like postId={postId} />
              <Comment />
            </div>
            <div className='flex items-center pt-2 gap-5'>
              {post && <Savedpost post={post} />}
              <Sharepost />
              {currentuser?.uid === post.userId && <Actions postId={postId} title={title} desc={desc} />}
            </div>
          </div>
          <div className='mt-[3rem]'>
            {postImg && <img src={postImg} alt="img" className='w-full h-[400px] object-cover' />}
            <div className='mt-6' dangerouslySetInnerHTML={{ __html: desc }} />
          </div>
        </section>}
      {post && <Recommended post={post} />}
      <Comments postId={postId} />
    </>
  );
}

export default Singelpost;
