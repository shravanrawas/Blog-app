import React, { useState } from 'react'
import Dropdown from '../../../../utils/dropdown'
import { CiShare1 } from "react-icons/ci";
import {LinkedinShareButton, TwitterShareButton} from 'react-share'
import { MdContentCopy} from "react-icons/md";
import {BiLogoTwitter, BiLogoLinkedinSquare} from 'react-icons/bi'
import {toast} from 'react-toastify'

function Sharepost() {

    const [showdrop, setshowdrop] = useState(false)
    const path = window.location.href;

    const copylink = async () => {
         try {
            await navigator.clipboard.writeText(path)
            toast.success('Link copied')
            setshowdrop(false)
         } catch (error) {
            toast.error(error.message)
            setshowdrop(false)
         }
    }

    return (
        <div className='relative mt-2'>
            <button onClick={()=> setshowdrop(!showdrop)}>
                <CiShare1 className='text-2xl'/>
            </button>
            <Dropdown showdrop={showdrop} setshowdrop={setshowdrop} size='w-[12rem]'>
                
                 <Button click={copylink} title='Copy Link' icon={<MdContentCopy/>}/>

                 <TwitterShareButton url={path}>
                   <Button click={()=> setshowdrop(false)} title='Share On Twitter' icon={<BiLogoTwitter/>}/>
                 </TwitterShareButton>

                 <LinkedinShareButton url={path}>
                   <Button click={() => setshowdrop(false)} title='Share On Linkedin' icon={<BiLogoLinkedinSquare/>}/>
                 </LinkedinShareButton>

            </Dropdown>
        </div>
    )
}

export default Sharepost

const Button = ({click, icon, title}) => {
    return (
    <button onClick={click} className='p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left flex items-center gap-2 cursor-pointer text-gray-500'>
        <span className='text-[1.2rem]'>{icon}</span>
        {title}
    </button>
    )
}