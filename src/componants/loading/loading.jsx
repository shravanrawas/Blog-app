import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Loading() {
    return (
        <div className='fixed inset-0 grid place-items-center bg-white z-30'>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="gray"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loading
