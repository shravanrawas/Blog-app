import React from 'react'
import { Blog } from '../../../../context/contex'

function Profileabout({getUsers, seteditmodal}) {

  const {currentuser} = Blog(); 

  return (
    <div className='w-full'>
        <p className='text-2xl first-letter:uppercase'>
          {getUsers?.bio || getUsers?.username + ' Has no bio '}
        </p>
        <div className='text-right'>
           {currentuser?.uid === getUsers.userId &&  <button onClick={() => seteditmodal(true)} className='border border-black py-2 px-5 rounded-full text-black mt-[3rem]'>Edit</button> }
        </div>
    </div>
  )
}

export default Profileabout