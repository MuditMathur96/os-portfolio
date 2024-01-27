
import { WindowType } from "./store/TaskManagerStore";
import Projects from "./components/Windows/Projects";
import Browser from "./components/Windows/Browser";
import { ReactNode } from "react";
import TaskManager from "./components/Windows/TaskManager";
import Resume from "./components/Windows/Resume";
import ContactMe from "./components/Windows/ContactMe";
import TicTacToe from "./components/Windows/TicTacToe";

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
        component:TaskManager,
        title:"Task Manager"
    },
    TIC_TAC_TOE:{
        component:TicTacToe,
        title:"Tic Tac Toe"
    },
    RESUME:{
        component:Resume,
        title:"Resume"
    },
    Contact_Me:{
        component:ContactMe,
        title:"Contact Me"
    }

    
    
}


export default template