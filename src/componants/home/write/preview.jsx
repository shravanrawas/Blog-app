import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from 'react-quill';
import { TagsInput } from "react-tag-input-component";
import {toast} from 'react-toastify'
import { db, storage } from '../../../firebase/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { Blog } from '../../../context/contex';
import { useNavigate } from 'react-router-dom';

function Preview({ setpublish, title, discription }) {

    const imageRef = useRef(null);
    const [imgurl, setimgurl] = useState('');
    const [tag, settag] = useState([]);
    const [desc, setdesc] = useState('');
    const {currentuser} = Blog();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const [preview, setpreview] = useState({
        title: '',
        photo: ''
    })

    useEffect(() => {
        if (title || discription) {
            setpreview({ ...preview, title: title })
            setdesc(discription)
        }
        else {
            setpreview({ ...preview, title: '' })
            setdesc('')
        }
    }, [title, discription])

    const handelclick = () => {
        imageRef.current.click();
    }

    const handelsubmit = async () => {
        setloading(true);
        try {
            if (preview.title === '' || desc === '' || tag.length === 0) {
                toast.error('All fields are required');
                setloading(false);
                return;
            }
    
            if (preview.title.length < 15) {
                toast.error('Title must be at least 15 letters');
                setloading(false);
                return;
            }
    
            const collections = collection(db, 'posts');
    
            let url;
            if (imageRef.current && imageRef.current.files[0]) {
                const storageRef = ref(storage, `image/${preview.photo.name}`);
                await uploadBytes(storageRef, preview.photo);
                url = await getDownloadURL(storageRef);
            }
    
            await addDoc(collections, {
                userId: currentuser?.uid,
                title: preview.title,
                desc,
                tag,
                postImg: url || '',
                userImg: currentuser?.photoURL || '',
                created: Date.now(),
                pageviews: 0,
            });
    
            toast.success('Post has been added');
            navigate('/');
            setpublish(false);
            setpreview({ title: '', photo: '' });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    };
    

    return (
        <section className='absolute inset-0 bg-white z-30'>
            <div className='size my-[2rem]'>
                <span onClick={() => setpublish(false)} className='absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer'><LiaTimesSolid /></span>

                <div className='mt-[8rem] flex flex-col md:flex-row gap-10'>

                    <div className='flex-[1]'>
                        <h3>Story Preview</h3>
                        <div style={{ backgroundImage: `url(${imgurl})` }} onClick={handelclick} className='w-full h-[200px] object-cover bg-gray-100 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat'>{imgurl ? '' : 'Add Image'}</div>

                        <input onChange={(e) => {
                            setimgurl(URL.createObjectURL(e.target.files[0]));
                            setpreview({ ...preview, photo: e.target.files[0] })

                        }} ref={imageRef} type="file" hidden />

                        <input value={preview.title} onChange={(e) => {
                            setpreview({ ...preview, title: e.target.value })
                        }} type="text" placeholder='Title' className='outline-none w-full border-b border-gray-300 py-2' />
                        <ReactQuill value={desc} onChange={setdesc} className='py-5 border-b border-y-gray-300' placeholder='Tell your story...' theme="bubble" />

                        <p className='text-gray-500 pt-4 text-sm'>
                            <span className='font-bold'>Note:</span> Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.
                        </p>
                    </div>

                    <div className='flex-[1] flex flex-col gap-4 mb-5 md:mb-0'>
                        <h3 className='text-2xl'>Publishing to: <span className='font-bold capitalize'>Shravan rawas</span></h3>
                        <p className=''>Add or change topics up to 5 so readers know what your story is about</p>
                        <TagsInput value={tag} onChange={settag} placeHolder='Add a tag' />
                        <button onClick={handelsubmit} className='btn !bg-green-800 !w-fit !text-white rounded-full'>{loading ? 'Submitting...' : 'Publish Now'}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Preview