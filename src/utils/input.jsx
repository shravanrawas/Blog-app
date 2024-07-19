import React from 'react'

function Input({type, title, form, setform}) {

  const handelchange = (e) => {
     setform({...form, [e.target.name]: e.target.value})
  }

  return (
    <div className='flex flex-col gap-2'>
        <label className='text-sm capitalize'>{title}</label>
        <input onChange={handelchange} className='text-center border-b border-black outline-none' type={type} name={title}/>
    </div>
  )
}

export default Input