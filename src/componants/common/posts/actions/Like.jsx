import React, { useEffect, useState } from 'react'
import { SlLike } from "react-icons/sl";
import { Blog } from '../../../../context/contex';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/usesingelfetch';
import { formatnum } from '../../../../utils/helper';

function Like({post, postId}) {

   const [isliked, setisliked] = useState(false);
   const {currentuser, setauthmodal} = Blog();

   const {data} = useSingleFetch('posts', postId, 'likes')

   useEffect(() => {
     setisliked(data && data.findIndex((item) => item.id === currentuser?.uid) !== -1) 
   }, [data])

   const handellike = async () => {
       try {
         if(currentuser){
           const likeRef = doc(db, 'posts', postId, 'likes', currentuser?.uid) 
           if(isliked){
            await deleteDoc(likeRef)
           }
           else {
            await setDoc(likeRef, {
               userId : currentuser?.uid
            })
           }
         }
         else {
            setauthmodal(true);
         }
       } catch (error) {
         toast.error(error.message)
       }
   }
    
  return (
     <button onClick={handellike} className='flex items-center gap-1 text-sm'>
        <SlLike className={`text-xl ${isliked ? 'text-black' : 'text-gray-500'}`}/>
        <span>{formatnum(data?.length)}</span>
     </button>
  )
}

export default Like