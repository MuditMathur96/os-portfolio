import { useMemo } from 'react'
import useTaskManagerStore, { WindowType } from '../../store/TaskManagerStore'
import themeTemplate from '../../themeTemplate'
import { useMediaQuery } from 'usehooks-ts'

type Props = {
    type:WindowType,
    close:()=>void,
    title:string
}

function MenuItem({type,close,title}: Props) {

  const Icon = useMemo(()=>themeTemplate[type].icon,[]);
  const OpenIcon = useMemo(()=>themeTemplate[type].open,[]);
  const openWindow = useTaskManagerStore(state=>state.openWindow);
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div 
    onClick={()=>{
        close()
        openWindow({
        type,
        isMinimized:false,
        values:{}
    })}}
    className='cursor-pointer
     hover:bg-neutral-700 
     p-2 rounded-md 
     flex flex-col items-center justify-center
     duration-100'>
        <Icon size={isMobile?32:60}
        color='white'
        />
    <h2 className='text-sm md:text-md font-semibold text-neutral-400'>{title}</h2>
    </div>
    
  )
}

export default MenuItem