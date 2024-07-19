import React from 'react'
import { useParams } from 'react-router-dom'
import usefetch from '../hooks/usefetch';
import Loading from '../loading/loading';
import Postcard from '../common/posts/postcard';

function Filterpost() {

  const {tag} = useParams();  
  const {data, loading} = usefetch('posts');
  const filtereddata = data.filter((post) => post.tag.includes(tag));
   

  return (
    <section className='size my-[2rem]'> 
          <div>
            <h3 className='text-3xl pb-6 border-b border-black mb-[3rem]'>
                {filtereddata.length 
                ? `Posts Related To ${tag} :`
                :  `There Is No Post With Related To ${tag}`
                }
            </h3>
            {loading ? <Loading/> : (
                <div className='lg:max-w-[60%] flex flex-col gap-[2rem]'>
                    {filtereddata && filtereddata.map((post, i) => (
                        <Postcard post={post} key={i}/>
                    ))}
                </div>
            )}
          </div>
    </section>
  )
}

export default Filterpost