import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import Modal from '../../utils/modal';
import usefetch from '../hooks/usefetch';
import {useNavigate} from 'react-router-dom'

function Search({ modal, setmodal }) {

  const [search, setsearch] = useState('');
  const { data } = usefetch('posts');

  const searchdata = data && data.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
  const navigate = useNavigate();

  return (
    <>
      <Modal modal={modal} setmodal={setmodal}>
        <div className={`absolute sm:relative right-4 left-4 sm:left-0 sm:top-0 ${modal ? 'visible opacity-100' : 'invisible sm:visible sm:opacity-100 opacity-0'} transition-all duration-100`}>
          <div className='flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10'>
            <span className='text-2xl text-gray-400'><CiSearch /></span>
            <input
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className='bg-transparent outline-none py-[0.7rem] text-sm w-full'
              type="text"
              placeholder='Search Blog'
            />
            { search !== "" && 
              (<div className='absolute h-[400px] overflow-y-scroll right-0 left-0 top-full bg-white shadows rounded-md'>
                {searchdata.length > 0 ?
                  <>
                    {searchdata.map((post, i) => (
                      <div key={i} onClick={() => {
                        navigate(`/post/${post.id}`)
                        setsearch('');
                        setmodal(false)
                      }} className='p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer'>
                        <h2 className='line-clamp-1 capitalize text-sm font-bold'>{post.title}</h2>
                        <div className='text-xs text-gray-500 line-clamp-2' dangerouslySetInnerHTML={{ __html: post.desc }} />
                      </div>
                    ))}
                  </>
                  :
                  <p className='text-sm text-gray-500 p-3'>No Post Found</p>}
              </div>)
            }
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Search;
