import React, { useEffect, useState } from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import {Blog} from '../../../../context/contex'
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import {toast} from 'react-toastify'
import usesingelfetch from '../../../hooks/usesingelfetch';

function Savedpost({post}) {

  const [isSaved, setisSaved] = useState(false);
  const {currentuser, setauthmodal} = Blog();
  const {data, loading} = usesingelfetch('users', currentuser?.uid, 'savepost');

  useEffect(() => {
    setisSaved(data && data.find((item) => item.id === currentuser?.uid)) !== -1
  }, [data, post?.id])
   
  const handelsave = async () => {
        try {
            if(currentuser){
                const saveRef = doc(db, 'users', currentuser?.uid, 'savepost', post?.id)
                if(isSaved){
                    await deleteDoc(saveRef)
                    toast.success('Post has been unsaved')
                }
                else {
                    await setDoc(saveRef, {
                        ...post,
                    })
                    toast.success('Post has been saved')
                }
            }
            else {
               setauthmodal(true)
            }
        } catch (error) {
            
        }
  }

  return (
    <>
    <button onClick={handelsave} className='hover:opacity-60'>
          <CiSaveDown2 className={`text-2xl pointer-events-none ${isSaved ? 'text-yellow-600' : ''}`}/>
    </button>
    </>
  )
}

export default Savedpost