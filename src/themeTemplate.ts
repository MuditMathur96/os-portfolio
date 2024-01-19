import { BsBrowserEdge } from "react-icons/bs"
import { FaFolder, FaRegFolderOpen } from "react-icons/fa";
import { IconType } from "react-icons";
import { WindowType } from "./store/TaskManagerStore";
import { MdMonitorHeart } from "react-icons/md";
import { TbTicTac } from "react-icons/tb";

interface IIconPack{
    icon:IconType,
    open:IconType
}


const themeTemplate:{[key in WindowType]:IIconPack} ={

    "PROJECTS":{
        open:FaRegFolderOpen,
        icon:FaFolder
    },
    "BROWSER":{
        icon:BsBrowserEdge,
        open:BsBrowserEdge
    },
    "TASK_MANAGER":{
        icon:MdMonitorHeart,
        open:MdMonitorHeart

    },
    "TIC_TAC_TOE":{
        icon:TbTicTac,
        open:TbTicTac
    }
    
    

}

export default themeTemplate


