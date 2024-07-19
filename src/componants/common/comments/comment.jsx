import React, { useState, useEffect } from 'react';
import { Blog } from '../../../context/contex';
import { BiDotsHorizontal } from "react-icons/bi";
import Dropdown from '../../../utils/dropdown';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';

function Comment({ item: comment, postId, i }) {
  const { allusers, currentuser } = Blog();
  const getuser = allusers?.find((user) => user.id === comment?.userId);
  const { userId, commentText, created } = comment;
  const [drop, setdrop] = useState(false);
  const [more, setmore] = useState(false);
  const [isEdit, setisEdit] = useState(false); 
  const [editcomment, seteditcomment] = useState('');
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      seteditcomment(commentText);
    }
  }, [isEdit, commentText]);

  const removecomment = async () => {
    try {
      const ref = doc(db, 'posts', postId, 'comments', comment?.id)
      await deleteDoc(ref);
      setdrop(false);
      toast.success('Response deleted');
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleditcomment = () => {
    setisEdit(true);
    setdrop(false);
  }

  const handelEdit = async () => {
    setloading(true);
    try {
      const ref = doc(db, 'posts', postId, 'comments', comment.id);
      await updateDoc(ref, {
        commentText: editcomment,
        created: Date.now(),
        userId: currentuser?.uid
      });
      seteditcomment('');
      setisEdit(false);
      setdrop(false);
      toast.success('Comment has been updated');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <section className='border-b'>
      {!isEdit ? (
        <>
          <div className='flex items-center gap-5 pt-[1rem]'>
            <img className='w-[2rem] h-[2rem] object-cover rounded-full' src={getuser?.userImg || '/profile.jpg'} alt="user img " />
            <div className='flex-1 flex justify-between'>
              <div>
                <h2 className='text-sm capitalize'>{getuser?.username}</h2>
                <p className='text-sm text-gray-400'>pending work</p>
              </div>
              <div className='relative'>
                {currentuser && currentuser?.uid === userId && (
                  <>
                    <button
                      className='text-2xl hover:opacity-70'
                      onClick={() => setdrop(!drop)}
                    >
                      <BiDotsHorizontal />
                    </button>
                    <Dropdown showdrop={drop} setshowdrop={setdrop} size='w-[10rem]'>
                      <Button click={handleditcomment} title='Edit this response' />
                      <Button click={removecomment} title='Delete this response' />
                    </Dropdown>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className='py-4 text-sm'>
            {more ? commentText : commentText?.substring(0, 100)}
            {commentText.length > 100 && (
              <button onClick={() => setmore(!more)}>{more ? '...less' : '...more'}</button>
            )}
          </p>
        </>
      ) : (
        <div className='bg-white shadows p-4'>
          <textarea
            value={editcomment}
            onChange={(e) => seteditcomment(e.target.value)}
            className='w-full p-2 resize-none outline-none text-sm'
            placeholder='Write your updated thoughts?'
          ></textarea>
          <div className='flex items-center justify-end gap-2 mt-[1rem]'>
            <button onClick={() => {
              setisEdit(false);
              setdrop(false);
            }} className='w-fit text-sm'>Cancel</button>
            <button onClick={handelEdit} className='btn !text-white !bg-green-700 rounded-full text-xs'>
              {loading ? 'Updating' : 'Update'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Comment;

const Button = ({ click, title }) => {
  return (
    <button onClick={click} className='p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left'>
      {title}
    </button>
  );
};
