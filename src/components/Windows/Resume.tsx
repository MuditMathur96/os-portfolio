import React from 'react'
import Window from '../Window'

type Props = {}

function Resume({}: Props) {
  return (
    <Window
    defaultXY={{
        x:"50%",
        y:"90%"
    }}
    type='RESUME'
    title="My Resume"
    >

        <object
        className='w-full h-full'
        type="application/pdf"
        data="/Mudit Mathur 2023.pdf" >
          {/* <embed
        className='w-full h-full'
        src="/Mudit Mathur 2023.pdf">
        </embed> */}
       

        </object>
        {/* <embed
        className='w-full h-full'
        src="/Mudit Mathur 2023.pdf">
        </embed> */}
        {/* <iframe
         className='w-full h-full'
         src="/Mudit Mathur 2023.pdf#toolbar=0&scale=1.5"
        >
        </iframe> */}
    </Window>
  )
}

export default Resume