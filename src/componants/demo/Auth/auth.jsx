import React, { useState } from 'react';
import Modal from '../../../utils/modal';
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import Signin from './signin';
import Signup from './signup';
import { signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Auth({ modal, setmodal }) {
  const [creatuser, setcreateuser] = useState(false);
  const [signreq, setsignreq] = useState('');
  const navigate = useNavigate();

  const googelauth = async () => {
    try {
      const createuser = await signInWithPopup(auth, provider);
      const newUser = createuser.user;
      const ref = doc(db, 'users', newUser.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: '',
        });
        navigate('/');
        toast.success('User has been signed in');
        setmodal(false);
      } else {
        console.log('User already exists:', userDoc.data());
        navigate('/');
        setmodal(false);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={modal} setmodal={setmodal}>
      <section className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadows ${modal ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-500`}>
        <button onClick={() => setmodal(false)} className='absolute top-8 right-8 text-2xl hover:opacity-50'>
          <LiaTimesSolid />
        </button>
        <div className='flex flex-col justify-center items-center gap-[3rem]'>
          {signreq === '' ? (
            <>
              <h2 className='text-2xl pt-[5rem]'>{creatuser ? 'Join Medium' : 'Welcome Back'}</h2>
              <div className='flex flex-col gap-2 w-fit mx-auto'>
                <Button click={googelauth} icon={<FcGoogle className='text-xl' />} text={`${creatuser ? 'Sign Up with Google' : 'Sign In with Google'}`} />
              
                <Button click={() => setsignreq(creatuser ? 'sign-up' : 'sign-in')} icon={<AiOutlineMail className='text-xl' />} text={`${creatuser ? 'Sign Up with Email' : 'Sign In with Email'}`} />
              </div>
              <p>
                {creatuser ? 'Already have an account' : 'No Account?'}
                <button onClick={() => setcreateuser(!creatuser)} className='text-green-600 hover:text-green-700 font-bold ml-1'>{creatuser ? 'Sign In' : 'Create one'}</button>
              </p>
            </>
          ) : signreq === 'sign-in' ? (
            <Signin setmodal={setmodal} setsignreq={setsignreq} />
          ) : signreq === 'sign-up' ? (
            <Signup setmodal={setmodal} setsignreq={setsignreq} />
          ) : null}
          <p className='md:w-[30rem] mx-auto text-center text-sm mb-[3rem]'>
            Click “Sign In” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.
          </p>
        </div>
      </section>
    </Modal>
  );
}

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <button onClick={click} className='flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full'>
      {icon} {text}
    </button>
  );
};
