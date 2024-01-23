import React from 'react'
import Window from '../Window'
import useTaskManagerStore, { WindowType } from '../../store/TaskManagerStore'

type Props = {}
const Headers:string[] =[
    "PID",
    "Task Name",
    "Memory",
]

function TaskManager({}: Props) {

    const windows = useTaskManagerStore(state=>state.windows);

  return (
    <Window 
    type='TASK_MANAGER'
    title='Task Manager'>
        <div>
            {/* Headers */}
            <div className='flex items-center border py-2 bg-slate-100'>
               {Headers.map((h,index)=><div 
               className={`flex-1 
               ${index<Headers.length-1?"border-r-2":""}
                px-2`}>
                {h}
               </div>)}
            </div>

            {/* Table Body*/}
            <div>
                {Object.keys(windows).map((key,index)=>{
                    return <div className='flex border-b py-2 pl-2'>
                        <div className='flex-1'>{index}</div>
                        <div className='flex-1'>{windows[key as WindowType]?.type}</div>
                        <div className='flex-1'>{100}</div>
                    </div>
                })} 
            </div>

            
        </div>
    </Window>
  )
}

export default TaskManager