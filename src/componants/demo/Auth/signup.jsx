import React, { useState } from 'react';
import Input from '../../../utils/input';
import { MdArrowBackIos } from "react-icons/md";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

function Signup({ setsignreq, setmodal }) {
  const navigate = useNavigate();
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    created : Date.now()
  });

  const [loading, setloading] = useState(false);

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.repassword) {
      toast.error('All fields are required');
      return;
    }
    if (form.password !== form.repassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      setloading(true)
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const ref = doc(db, 'users', user.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: user.uid,
          username: form.username,
          email: form.email,
          userImg: '',
          bio: '',
          created : Date.now()
        });
        navigate('/');
        toast.success('User has been signed in');
        setmodal(false);
        setloading(false)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='size mt-[6rem] text-center'>
      <h2 className='text-3xl'>Sign up with email</h2>
      <p className='w-full sm:w-[25rem] mx-auto py-[3rem]'>
        Enter the email address associated with your account, and we’ll send a magic link to your inbox.
      </p>
      <form onSubmit={handelsubmit} className='flex flex-col gap-4'>
        <Input form={form} setform={setform} type='text' title='username' />
        <Input form={form} setform={setform} type='email' title='email' />
        <Input form={form} setform={setform} type='password' title='password' />
        <Input form={form} setform={setform} type='password' title='repassword' />
        <button className={`px-4 py-2 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          Sign up
        </button>
      </form>
      <button onClick={() => setsignreq('')} className='mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto'>
        <MdArrowBackIos />
        All sign up Options
      </button>
    </div>
  );
}

export default Signup;
