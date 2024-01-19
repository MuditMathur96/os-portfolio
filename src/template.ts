
import { WindowType } from "./store/TaskManagerStore";
import Projects from "./components/Projects";
import Browser from "./components/Browser";
import { ReactNode } from "react";

interface windowList{
    component:any,
    title:string,
}

const template:{[key in WindowType]:windowList | null} ={
    PROJECTS:{
        component:Projects,
        title:"My Projects",
        
    },
    BROWSER:{
        component:Browser,
        title:"Browser"
    },
    TASK_MANAGER:{
        component:null,
        title:"Task Manager"
    },
    TIC_TAC_TOE:{
        component:null,
        title:"Tic Tac Toe"
    },

    
    
}


export default template