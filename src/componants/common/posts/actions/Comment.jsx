import React from 'react'
import { FaRegComment } from "react-icons/fa";
import { Blog } from '../../../../context/contex';
import { formatnum } from '../../../../utils/helper';

function Comment() {

  const {setshowcomment, commentlength} = Blog();

  return (
    <button onClick={() => setshowcomment(true)} className='flex items-center gap-1 text-sm'>
        <FaRegComment className='text-xl'/>
        <span>{formatnum(commentlength)}</span>
    </button>
  )
}

export default Comment