import { BsBrowserEdge } from "react-icons/bs"
import { FaFolder, FaRegFolderOpen } from "react-icons/fa";
import { IconType } from "react-icons";
import { WindowType } from "./store/TaskManagerStore";
import { MdEmail, MdMonitorHeart } from "react-icons/md";
import { TbTicTac } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";

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
    },
    "RESUME":{
        icon:RxAvatar,
        open:RxAvatar
    },
    "Contact_Me":{
        icon:MdEmail,
        open:MdEmail
    }
    
    

}

export default themeTemplate


