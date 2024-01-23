import React, { useMemo } from 'react'
import useTaskManagerStore, { WindowType } from '../../store/TaskManagerStore'
import themeTemplate from '../../themeTemplate'
import { motion } from 'framer-motion'

type Props = {
    type:WindowType
}

function SideBarItem({type}: Props) {

    console.log("type",type)
    const setActiveWindow = useTaskManagerStore(state=>state.setActiveWindow);
    const minimizeWindow= useTaskManagerStore(state=>state.minimizeWindow);
    const activeWindow = useTaskManagerStore(state=>state.activeWindow);
    const isMinimized = useTaskManagerStore(state=>state.windows)[type]?.isMinimized;

    const isActive = activeWindow === type;

    const Icon = useMemo(()=>themeTemplate[type]?.icon,[type]);

  return (
    <motion.div
    
    onClick={()=>{

      if(!isActive){
        //set active window to this
        //set minimized to false
        console.log("setting active to type",type)
        setActiveWindow(type);
        if(isMinimized){
          console.log("setting minimize to false",type)
          minimizeWindow(type,false);
        }
        
      }else{
        minimizeWindow(type,true);
        setActiveWindow(null);
      }
    }}

    className={`cursor-pointer p-2
    rounded-md
    flex flex-col items-center justify-center space-y-1
    ${isActive?"":"hover:bg-neutral-600"}
    `}>
        <Icon
        color='white'
        size={40} 
        />
        {
            isActive && <div
            className=' mx-auto h-2 w-2 bg-white rounded-full'
            />
        }
    </motion.div>
  )
}

export default SideBarItem