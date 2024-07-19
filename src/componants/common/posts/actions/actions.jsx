import React, { useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import Dropdown from '../../../../utils/dropdown';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../../../../context/contex';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';

function Actions({ postId, title, desc }) {
  const { setupdatedata } = Blog();
  const [showdrop, setshowdrop] = useState(false); 
  const navigate = useNavigate();
  const {currentuser} = Blog()

  const handelclick = () => {
    setshowdrop(!showdrop);
  }

  const handeledit = () => {
    
    console.log('Setting updatedata:', { title, description: desc });
  
    setupdatedata({
      title,
      description: desc
    });
  
    console.log('Navigating to:', `/editpost/${postId}`);
    navigate(`/editpost/${postId}`);
  };

  const handeldelete = async () => {
        try {
          const ref = doc(db, 'posts', postId)
          const likeref = doc(db, 'posts', postId, 'likes', currentuser?.uid)
          const comref = doc(db, 'posts', postId, 'comments', currentuser?.uid)
          const saveref = doc(db, 'users', currentuser?.uid, 'savepost', postId)
          await deleteDoc(ref);
          await deleteDoc(likeref);
          await deleteDoc(comref);
          await deleteDoc(comref);
          await deleteDoc(saveref);
          toast.success('Post deleted')
          navigate('/')
        } catch (error) {
          toast.error(error.message)
        }
  }
  
  return (
    <div className='relative'>
      <button onClick={handelclick}>
        <BsThreeDots className='text-2xl mt-2'/>
      </button>
      <Dropdown showdrop={showdrop} setshowdrop={setshowdrop} size='w-[7rem] mt-2'>
        <Button click={handeledit} title='Edit Story'/>
        <Button click={handeldelete} title='Delete Story'/>
      </Dropdown>
    </div>
  )
}

export default Actions;

const Button = ({ click, title }) => {
  return (
    <button onClick={click} className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left ${title === 'Delete Story' ? 'text-red-600' : ''}`}>
      {title}
    </button>
  )
}
