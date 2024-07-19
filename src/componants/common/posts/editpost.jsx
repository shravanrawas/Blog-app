import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Blog } from '../../../context/contex';

function Editpost() {
  const { 
    updatedata, 
    title,
    settitle,
    description,
    setdescription 
  } = Blog();

  useEffect(() => {
    console.log('updatedata in Editpost:', updatedata);
    if (updatedata) {
      settitle(updatedata.title);
      setdescription(updatedata.description);
    }
  }, [updatedata]);



  return (
    <section className='write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
      <input
        value={title}
        onChange={(e) => settitle(e.target.value)}
        type="text"
        placeholder='Title...'
        className='text-4xl outline-none w-full rounded-full p-2'
      />
      <ReactQuill
        value={description}
        onChange={setdescription}
        placeholder='Description...'
        className='text-[4rem] my-3'
        theme='bubble'
      />
    </section>
  );
}

export default Editpost;
