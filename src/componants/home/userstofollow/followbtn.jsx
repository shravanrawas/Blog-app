import React, { useState, useEffect } from 'react';
import { Blog } from '../../../context/contex';
import { db } from '../../../firebase/firebase';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import useSingleFetch from '../../hooks/usesingelfetch';
import { useLocation } from 'react-router-dom';

function Followbtn({ userId }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentuser } = Blog();

  const { data: follows } = useSingleFetch('users', currentuser?.uid, 'follows');

  useEffect(() => {
    if (follows && currentuser) {
      setIsFollowed(follows.some((item) => item.userId === userId));
    }
  }, [follows, currentuser, userId]);

  const handleFollow = async () => {
    if (!currentuser) {
      toast.error('You need to be logged in to follow users');
      return;
    }

    const followRef = doc(db, 'users', currentuser.uid, 'follows', userId);
    const followerRef = doc(db, 'users', userId, 'followers', currentuser.uid);

    try {
      if (isFollowed) {
        await deleteDoc(followRef);
        await deleteDoc(followerRef);
        toast.success('User is unfollowed');
      } else {
        await setDoc(followRef, { userId });
        await setDoc(followerRef, { userId: currentuser.uid });
        toast.success('User is followed');
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {pathname} = useLocation();

  return (
    <button onClick={handleFollow} className={`${pathname === '/' ? 'border border-black' : '' } px-3 py-[0.2rem] rounded-full ${isFollowed ? 'text-gray-500 border-none' : ''}`}>
      {isFollowed ? 'Following' : 'Follow' }
    </button>
  );
}

export default Followbtn;
