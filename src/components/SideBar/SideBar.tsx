import React, { Dispatch } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import useTaskManagerStore, { WindowType } from '../../store/TaskManagerStore'
import SideBarItem from './SideBarItem';
import { useMediaQuery } from 'usehooks-ts';

type Props = {
    setIsMenuOpen:Dispatch<React.SetStateAction<boolean>>,
}

function SideBar({setIsMenuOpen}: Props) {

    const windows = useTaskManagerStore(state=>state.windows);
    const minimizeWindow = useTaskManagerStore(state=>state.minimizeWindow)
    const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div className='h-full flex flex-col-reverse md:flex-col  items-center w-[40px] md:w-[80px] fixed left-0 z-[80]'>
       
        <div className={`bg-gray-900 h-full w-[80px]
                    fixed top-0 md:top-[30px] 
                    opacity-50 z-[-10]`} />
        <div className='ml-[12px] md:ml-[0px] md:p-1 w-full md:w-auto my-2 hover:bg-neutral-700
                  rounded-md duration-300'>
        <CgMenuGridO
        onClick={()=>setIsMenuOpen(true)}
        role="button"
        size={isMobile?40: 50}
        className=''
        color='white'
        />

       
        </div>
        <div className=' border-b-2 border-white ml-[10px] md:ml-0 w-[70%]'></div>
        <div className='flex flex-col space-y-2 mt-2 ml-[12px] md:ml-[0px]' >

        {
           Object.keys(windows).map(w=>{
                return <SideBarItem type={w as WindowType} />
            })
        }
        </div>
      </div>
  )
}

export default SideBar