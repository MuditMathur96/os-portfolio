import React, { useMemo } from 'react'
import useTaskManagerStore, { WindowType } from '../store/TaskManagerStore'
import themeTemplate from '../themeTemplate'

type Props = {
    type:WindowType
}

function SideBarItem({type}: Props) {

    const setActiveWindow = useTaskManagerStore(state=>state.setActiveWindow);
    const activeWindow = useTaskManagerStore(state=>state.activeWindow);

    const isActive = activeWindow === type;

    const Icon = useMemo(()=>themeTemplate[type].icon,[type]);

  return (
    <div 
    onClick={()=>setActiveWindow(type)}

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
    </div>
  )
}

export default SideBarItem