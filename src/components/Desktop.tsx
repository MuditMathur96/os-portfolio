import React, { ReactNode, useState } from 'react'
import Window from './Window'
import { CgMenuGridO } from 'react-icons/cg'
import useTaskManagerStore, { WindowType } from '../store/TaskManagerStore'
import Menu from './Menu';
import Projects from './Projects';
import Browser from './Browser';
import template from '../template';
import SideBar from './SideBar';


function Desktop() {

    const windows = useTaskManagerStore(state=>state.windows);
    const openWindow = useTaskManagerStore(state=>state.openWindow);
    const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false);

    
   
    


  return (
    <div className='h-screen w-full '>
     {isMenuOpen && <Menu onClose={setIsMenuOpen} />}
         {/* background */}
      <div className=' bg-[url("/background-image.jpg")] 
          w-full h-full bg-no-repeat bg-cover'>

      
      {/* topbar  */}
      <div className=' bg-neutral-800 h-[30px] z-[99] 
            flex justify-center items-center
            text-white'>
        <div className=' '> 
        {`${new Date().toDateString()} ${new Date().toLocaleTimeString()} `}
        </div>

        


      </div>

      {/* sidebar */}
      <SideBar
      setIsMenuOpen={setIsMenuOpen}
      />
      

      {/* main */}
      <div className='w-[calc(100vw-80px)] h-[calc(100vh-20px)] 
       ml-20 relative flex flex-wrap'>
        {
            windows.map(w=>{
                return template[w.type] &&  React.createElement(template[w.type]?.component,{
                  key:w.type
                })
            })

        }
      </div>

      </div>
    </div>
  )
}

export default Desktop