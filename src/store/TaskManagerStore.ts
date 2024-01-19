import {create} from 'zustand';

export type WindowType="PROJECTS" | "BROWSER" | "TIC_TAC_TOE" | "TASK_MANAGER"

export interface IWindow{
    id?:string,
    type:WindowType,
    isMinimized:boolean,
    values:object

}

interface ITaskManager{
    windows:IWindow[],
    activeWindow:string | null,
    openWindow:(data:IWindow)=>void,
    closeWindow:(data:string)=>void,
    minimizeWindow:(data:IWindow)=>void
}

const useTaskManagerStore = create<ITaskManager>((set)=>({

    windows:[],
    activeWindow:null,
    openWindow:(data)=>set((state)=>{

       const isAlreadyOpen = state.windows.find(w=>w.type === data.type);

       if(isAlreadyOpen){
        return{
            activeWindow:isAlreadyOpen.type
        }
       }else{
        return {
            windows:[...state.windows,data]
        }
       }

    }),
    closeWindow:(data)=>{

        set((state)=>({
            windows:state.windows.filter(w=>w.type!== data)
        }))

    },
    minimizeWindow:(data)=>{

        
        set((state)=>{
            const newWindows = state.windows.map(w=>{
                if(w.type === data.type){
                    return {...w,isMinimized:true};
                }else{
                    return w;
                }
            });

            return {
                windows:newWindows
            }
        })

    }




}))

export default useTaskManagerStore;