import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../utils/modal';
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

function Editprofile({ editmodal, seteditmodal, getUsers }) {

  const imgref = useRef(null);
  const [imgurl, setimgurl] = useState('');
  const [loading, setloading] = useState(false);

  const [form, setform] = useState({
    username: '',
    userImg: '',
    bio: '',
  });

  useEffect(() => {
    if (getUsers) {
      setform(getUsers);
    } else {
      setform({ username: '', bio: '', userImg: '' });
    }
  }, [getUsers]);

  const saveform = async () => {
    if (form.username === '' || form.bio === '') {
      toast.error('All fields are required!!');
      return;
    }

    setloading(true);

    try {
      let imageUrl = form.userImg;

      if (form.userImg instanceof File) {
        const storageRef = ref(storage, `image/${form.userImg.name}`);
        await uploadBytes(storageRef, form.userImg);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = doc(db, 'users', getUsers?.userId);
      await updateDoc(docRef, {
        bio: form.bio,
        username: form.username,
        userImg: imageUrl ? imageUrl : form.userImg,
        userId: getUsers?.userId
      });

      setloading(false);
      seteditmodal(false);
      toast.success('Profile has been updated');
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  const openfile = () => {
    imgref.current.click();
  };

  return (
    <Modal modal={editmodal} setmodal={seteditmodal}>
      <div className='center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]'>

        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-xl'>Profile information</h2>
          <button className='text-xl' onClick={() => seteditmodal(false)}>
            <LiaTimesSolid />
          </button>
        </div>

        <section className='mt-6'>
          <p className='pb-3 text-sm text-gray-500'>Photo</p>
          <div className='flex gap-[2rem]'>
            <div className='w-[5rem]'>
              <img className='min-w-[5rem] min-h-[5rem] object-cover border border-gray-400 rounded-full' src={imgurl || form.userImg || '/profile.jpg'} alt="profile" />
              <input onChange={(e) => {
                const file = e.target.files[0];
                if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
                  setimgurl(URL.createObjectURL(file));
                  setform({ ...form, userImg: file });
                } else {
                  toast.error('Invalid file type. Only PNG, JPG, and JPEG are allowed.');
                }
              }} ref={imgref} type="file" hidden accept="image/png, image/jpeg, image/jpg" />
            </div>
            <div>
              <div className='flex gap-4 text-sm'>
                <button onClick={openfile} className='text-green-600'>Update</button>
                <button onClick={() => setimgurl('')} className='text-red-600'>Remove</button>
              </div>
              <p className='w-full sm:w-[20rem] text-gray-500 text-sm pt-2'>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
            </div>
          </div>
        </section>

        <section className='pt-[1rem] text-sm'>
          <label className='pb-3 block' htmlFor="">Name</label>
          <input value={form.username} onChange={(e) => setform({ ...form, username: e.target.value })} className='p-1 border-b border-black w-full outline-none' maxLength={50} type="text" placeholder='username...' />
          <p className='text-sm text-gray-600 pt-2'>Appears on your Profile page, as your byline, and in your responses. {form.username.length}/50</p>

          <section className='pt-[1rem] text-sm'>
            <label className='pb-3 block' htmlFor="">Bio</label>
            <input value={form.bio} onChange={(e) => setform({ ...form, bio: e.target.value })} className='p-1 border-b border-black w-full outline-none' maxLength={160} type="text" placeholder='bio...' />
            <p className='text-sm text-gray-600 pt-2'>Appears on your Profile and next to your stories. {form.bio.length}/160</p>
          </section>
        </section>
        <div className='flex items-center justify-end gap-4 pt-[2rem]'>
          <button onClick={() => seteditmodal(false)} className='border border-green-600 py-2 px-5 rounded-full text-green-600'>Cancel</button>
          <button onClick={saveform} className='border border-green-600 py-2 px-5 rounded-full bg-green-800 text-white'>Save</button>
        </div>
      </div>
    </Modal>
  );
}

export default Editprofile;
