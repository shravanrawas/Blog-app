import React from 'react'
import ReactQuill from 'react-quill';
import { useState } from 'react';
import Preview from './preview';
import { Blog } from '../../../context/contex';

function Write() {

  const [discription, setdiscription] = useState('');
  const [title, settitle] = useState('');
  const {publish, setpublish} = Blog();

  return (
     <section className='w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]'>
          <input value={title} onChange={(e)=> settitle(e.target.value)}ype="text" placeholder='Title' className='text-4xl outline-none w-full rounded-full p-2' />
          <ReactQuill className='write my-5' placeholder='Tell your story...' theme="bubble" value={discription} onChange={setdiscription} />
          <div className={`${publish ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-200`}>
            <Preview title={title} discription={discription} setpublish={setpublish}/>
          </div>
     </section>
  )
}

export default Write