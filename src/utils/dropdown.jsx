import React, { useEffect, useRef } from 'react'

function Dropdown({children, size, showdrop, setshowdrop}) {

    const dropref = useRef(null);
    useEffect(() => {
    const clickoutside = (e) => {
        if(showdrop && dropref.current && !dropref.current.contains(e.target)){
            setshowdrop(false)
        }
    }
    window.addEventListener('mousedown', clickoutside)
    return () =>  window.removeEventListener('mousedown', clickoutside)
    }, [dropref, showdrop])

  return (
   <>
   {showdrop && <div ref={dropref} className={`shadows flex flex-col absolute right-0 top-[2rem] bg-white ${size}`}>{children}</div>}
   </>
  )
}

export default Dropdown