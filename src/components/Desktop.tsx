import React, {  useState } from 'react'

import useTaskManagerStore, { WindowType } from '../store/TaskManagerStore'
import Menu from './Menu/Menu';

import template from '../template';
import SideBar from './SideBar/SideBar';
import { useMediaQuery } from 'usehooks-ts';


function Desktop() {

    const windows = useTaskManagerStore(state=>state.windows);
    const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    
   
    


  return (
    <div className='h-screen w-full '>
     {isMenuOpen && <Menu onClose={setIsMenuOpen} />}
         {/* background */}
      <div className=' bg-[url("/background-image.jpg")] 
          w-full h-full bg-no-repeat bg-cover'>

      
      {/* topbar  */}
     {!isMobile && <div className=' bg-neutral-800 h-[30px] z-[99] 
            flex justify-center items-center
            text-white'>
        <div className=' '> 
        {`${new Date().toDateString()} ${new Date().toLocaleTimeString()} `}
        </div>

        


      </div>}

      {/* sidebar */}
      { <SideBar
      setIsMenuOpen={setIsMenuOpen}
      />}
      

      {/* main */}
      <div className={`
      ${isMobile?" w-full h-[calc(100vh)]"
      :"ml-20 w-[calc(100vw-80px)] h-[calc(100vh-20px)]"}
        relative flex flex-wrap`}>
        {
            Object.keys(windows).map(w=>{
                return template[w as WindowType] &&  React.createElement(template[w as WindowType]?.component,{
                  key:w
                })
            })

        }
      </div>

      </div>
    </div>
  )
}

export default Desktop