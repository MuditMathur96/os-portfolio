import React, { Dispatch } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import useTaskManagerStore from '../store/TaskManagerStore'
import SideBarItem from './SideBarItem';

type Props = {
    setIsMenuOpen:Dispatch<React.SetStateAction<boolean>>,
}

function SideBar({setIsMenuOpen}: Props) {

    const windows = useTaskManagerStore(state=>state.windows);
    const minimizeWindow = useTaskManagerStore(state=>state.minimizeWindow)

  return (
    <div className='h-full flex flex-col items-center w-[80px] fixed left-0'>
       
        <div className='bg-gray-900 h-full w-[80px] fixed top-[30px]  opacity-50 z-[-10]' />
        <div className='p-1 my-2 hover:bg-neutral-700 rounded-md duration-300'>
        <CgMenuGridO
        onClick={()=>setIsMenuOpen(true)}
        role="button"
        size={50}
        className=''
        color='white'
        />

       
        </div>
        <div className='border-b-2 border-white w-[70%]'></div>
        <div className='flex flex-col space-y-2 mt-2' >

        {
            windows.map(w=>{
                return <SideBarItem type={w.type} />
            })
        }
        </div>
      </div>
  )
}

export default SideBar