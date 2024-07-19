import React, { useState } from 'react'
import Input from '../../../utils/input'
import { MdArrowBackIos } from "react-icons/md";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Signin({setsignreq}) {
  
  const navigate = useNavigate();
  const [form, setform] = useState({
    email: '',
    password: '',
  }) 

  const [loading, setloading] = useState(false);

  const handelsubmit = async (e) => {
    e.preventDefault();
    if(!form.email || !form.password){
      toast.error('All fields are required!!')
    }
    try {
      setloading(true)
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/');
      toast.success('User has been logged in')
      setloading(false)
    } catch (error) {
      toast.error(error.message);
      setloading(false);
    }
    
  } 

  return (
    <div className='size mt-[6rem] text-center'>
        <h2 className='text-3xl'>Sign in with email</h2>
        <p className='w-full sm:w-[25rem] mx-auto py-[3rem]'>Enter the email address associated with your account, and we’ll send a magic link to your inbox.</p>
        <form onSubmit={handelsubmit} className='flex flex-col gap-4'>
            <Input form={form} setform={setform} type='email' title='email'/>
            <Input form={form} setform={setform} type='password' title='password'/>
            <button className={`px-4 py-2 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto ${loading ? 'opacity-50 pointer-events-none' : ''}`}>Sign in</button>
        </form>
        <button onClick={()=>setsignreq('')} className='mt-5 text-sm text-green-600 hover:text-green-700 flex items-center  mx-auto'>
            <MdArrowBackIos/>
            All sign In Options
        </button>
    </div>
  )
}

export default Signin