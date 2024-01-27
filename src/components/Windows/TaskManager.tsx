import Window from '../Window'
import useTaskManagerStore, { IWindow, WindowType } from '../../store/TaskManagerStore'
import { useEffect, useState } from 'react';

const Headers:string[] =[
    "PID",
    "Task Name",
    "Memory",
]

function TaskRow ({process,index}:{process:IWindow | undefined,index:number}){

    const [memory,setMemory] = useState(Math.random() * 100 + index);

    useEffect(()=>{
        
        const timer:number = setInterval(()=>{
            setMemory(prev=>{
                if(prev<120){
                    return prev + Math.random() * 50;
                }else{
                   return  prev - Math.random()*60;
                }
            });
        },1500);

        return ()=>clearTimeout(timer);

    },[])


    if(!process) return null;
    return <div className='flex border-b py-2 pl-2'>
    <div className='flex-1'>{index}</div>
    <div className='flex-1'>{process?.type}</div>
    <div className='flex-1'>{memory.toFixed(0)}</div>
</div>
}

function TaskManager() {

    const windows = useTaskManagerStore(state=>state.windows);

  return (
    <Window 
    type='TASK_MANAGER'
    title='Task Manager'>
        <div className='text-sm md:text-lg'>
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
                    return <TaskRow
                    key={key}
                    index={index}
                    process={windows[key as WindowType]} />
                })} 
            </div>

            
        </div>
    </Window>
  )
}

export default TaskManager