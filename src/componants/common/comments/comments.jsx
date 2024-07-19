import React, { useState, useEffect } from 'react';
import Modal from '../../../utils/modal';
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from '../../../context/contex';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import useSingleFetch from '../../hooks/usesingelfetch';
import Loading from '../../loading/loading';
import Comment from './comment';

function Comments({ postId }) {

    const { currentuser, allusers, showcomment, setshowcomment, setcommentlength} = Blog();
    const [comment, setcomment] = useState('');
    const getuser = allusers.find((user) => user.id === currentuser?.uid);

    const writeresponse = async () => {
        try {
            if (comment === '') {
                toast.error('The input must be filled');
                return;
            }
            const comRef = collection(db, 'posts', postId, 'comments');
            await addDoc(comRef, {
                commentText: comment,
                created: Date.now(),
                userId: currentuser.uid
            });
            setcomment('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const { data, loading } = useSingleFetch('posts', postId, 'comments');

    const toggleModal = () => {
        setshowcomment(!showcomment);
    };

    useEffect(() => {
        if (!showcomment) {
            setcomment('');
        }
    }, [showcomment]);

    useEffect(() => {
        if(data){
            setcommentlength(data.length)
        }
    }, [data])

    return (
        <Modal setmodal={setshowcomment} modal={showcomment}>
            <section className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadow p-5 overflow-y-auto transition-transform duration-500 ${showcomment ? 'translate-x-0' : 'translate-x-[22rem]'}`}>
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>Responses({data?.length || 0})</h3>
                    <button className='text-xl' onClick={toggleModal}>
                        <LiaTimesSolid />
                    </button>
                </div>
                {currentuser && (
                    <div className='shadows p-3 my-5 overflow-hidden'>
                        <div className='flex items-center gap-2 mb-6'>
                            <img className='w-[2rem] h-[2rem] object-cover rounded-full' src={getuser?.userImg || '/profile.jpg'} alt="user img" />
                            <h3 className='capitalize text-sm'>{getuser?.username}</h3>
                        </div>
                        <textarea value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='What are your thoughts?' className='w-full outline-none resize-none text-sm border px-2 pt-4'></textarea>
                        <div className='flex items-center justify-end gap-4 mt-[1rem]'>
                            <button className='text-sm' onClick={() => setcomment('')}>Cancel</button>
                            <button onClick={writeresponse} className='btn !text-xs !bg-green-700 !text-white !rounded-full'>Response</button>
                        </div>
                    </div>
                )}
                {loading ? <Loading /> : (
                    data && data.length === 0 ? (
                        <p>This post has no comments</p>
                    ) : (
                        <div className='border-t py-4 mt-8 flex flex-col gap-8'>
                            {data.map((item, i) => (
                                <Comment item={item} key={i} postId={postId} />
                            ))}
                        </div>
                    )
                )}
            </section>
        </Modal>
    );
}

export default Comments;
