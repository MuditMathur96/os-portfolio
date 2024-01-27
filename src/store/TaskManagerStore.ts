import {create} from 'zustand';

export type WindowType="PROJECTS" | "BROWSER" | 
                            "TIC_TAC_TOE" | "TASK_MANAGER" 
                            | "RESUME" | "Contact_Me";

export interface IWindow{
    id?:string,
    type:WindowType,
    isMinimized:boolean,
    values:object

}

interface ITaskManager{
    windows:{[key in WindowType]?:IWindow},
    activeWindow:string | null,
    setActiveWindow:(type:WindowType | null)=>void
    openWindow:(data:IWindow)=>void,
    closeWindow:(data:WindowType)=>void,
    minimizeWindow:(data:WindowType,flag?:boolean)=>void,

    isSidebarOpen:boolean,
    setIsSiderBarOpen:(value:boolean)=>void
    
}

const useTaskManagerStore = create<ITaskManager>((set)=>({

    isSidebarOpen:false,
    setIsSiderBarOpen:(value)=>set(()=>{

        return {
            isSidebarOpen:value
        }
    }),

    windows:{
        "RESUME":{
            isMinimized:false,
            type:"RESUME",
            values:{}
        }
    },
    activeWindow:null,
    setActiveWindow:(type)=>set(()=>{
        return {
            activeWindow:type
        }
    }),
    openWindow:(data)=>set((state)=>{

       const isAlreadyOpen = state.windows[data.type] !== undefined;

       if(isAlreadyOpen){
           const tempState = {...state.windows};
           tempState[data.type]!.isMinimized=false;
           console.log("window is already open",tempState)
        return{

            activeWindow:data.type,
            windows:tempState

        }
       }else{
        return {
            windows:{
                ...state.windows,[data.type]:data
            },
            activeWindow:data.type
        }
       }

    }),
    closeWindow:(data)=>{

        
        set((state)=>{
            // let tempActiveWindow = state.activeWindow;
            // if(state.windows.length>1){
                
            // }
            const temp:{[key in WindowType]?:IWindow} = {...state.windows};
            delete temp[data as WindowType];
            console.log("new windows",temp);
            return{
                windows:temp
            }
        })

    },
    minimizeWindow:(data,flag=true)=>{

        
        set((state)=>{
            const temp = {...state.windows};
            if(temp[data]) 
            temp[data]!.isMinimized =flag;
            console.log(" new windows",temp[data]);
            return {
                windows:temp,
                activeWindow:null
            }
        })

    }




}))

export default useTaskManagerStore;