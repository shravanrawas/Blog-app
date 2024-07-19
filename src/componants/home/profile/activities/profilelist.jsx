import React from 'react'
import usefetch from '../../../hooks/usefetch'
import usesingelfetch from '../../../hooks/usesingelfetch'
import { Blog } from '../../../../context/contex'
import Loading from '../../../loading/loading';
import Postcard from '../../../common/posts/postcard';
import { BiLock } from "react-icons/bi";

function Profilelist({ getUsers }) {
  const {currentuser} = Blog();

  const {data, loading} = usesingelfetch(
    'users',
     currentuser?.uid,
    'savepost'
  )
 

  return (
    <div>
      {currentuser?.uid === getUsers?.userId ? (
        <div className='flex flex-col gap-[2rem] mb-[2rem]'>
        {data?.length === 0 && (
          <p>
            <span className='capitalize mr-1'>{getUsers?.username}</span>
            has no saved posts
          </p>
        )}
        {loading ? <Loading /> : data?.map((post, i) => <Postcard post={post} key={i} />)}
      </div>
      
      ) : <PrivateList username={getUsers?.username}/> }
    </div>
  )
}

export default Profilelist

const PrivateList = ({username}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-[3rem] textc'>
        <p><span className='capitalize'>{username} Saved post  are private</span></p>
        <span className='text-[10rem] text-gray-500'>
             <BiLock/>
        </span>
    </div>
  )
}

