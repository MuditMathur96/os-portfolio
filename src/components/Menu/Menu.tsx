import React, { ChangeEvent, Dispatch, useEffect, useMemo, useState } from 'react'
import template from '../../template';
import useTaskManagerStore, { WindowType } from '../../store/TaskManagerStore';
import { BsBack } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import MenuItem from './MenuItem';
import { useMediaQuery } from 'usehooks-ts';

type Props = {
    onClose:Dispatch<React.SetStateAction<boolean>>
}

function Menu({onClose}: Props) {
    const [isOpen,setIsOpen]= useState<boolean>(false);
    const [query,setQuery] = useState<string>("");
    const isMobile = useMediaQuery("(max-width:768px)");
    


   const filteredKeys:(string | undefined)[] = useMemo(()=>{
        return Object.keys(template).map((key:string)=>{

            const title = template[key as WindowType]
            ?.title
            .toLowerCase();
            
            if(title?.includes(query.toLowerCase())){
                return key;
            }
        })

   },[query])



    useEffect(()=>{
        setIsOpen(true);
    },[]);

    useEffect(()=>{
        let timer:ReturnType<typeof setTimeout> | null = null;
        if(!isOpen){
            timer = setTimeout(()=>{
                onClose(false);
            },500)
        }
        return ()=>{
            timer && clearTimeout(timer)
        };
    },[isOpen])

  return (
    <div className={`bg-neutral-800 bg-opacity-90 
    h-full md:h-[calc(100%-30px)] w-full
    fixed 
    top-0 md:top-[30px]
     left-0 z-[9999]
    flex flex-col items-center
    space-y-10 duration-300
    ${isOpen?"":"opacity-0"}
    `}>
    <div className='w-3/4 md:w-1/3 flex justify-center items-center space-x-4 py-10'>

    <IoMdArrowBack
    role="button"
    color='white'
    onClick={()=>setIsOpen(false)}
    size={isMobile?30:40} />

    <input 
    className='h-[30px] md:h-[40px] w-full 
     bg-neutral-400 text-black text-xl
     rounded-full focus:outline-none text-center
     font-semibold inset-1'
    placeholder="Search Here"
    value={query}
    onChange={(e:ChangeEvent<HTMLInputElement>)=>setQuery(e.target.value)}
    
    />
    </div>
    {/* List of all applications */}
    <div className='grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-10'>
        {
           filteredKeys.map((key:string | undefined)=>{
                if(!key) return null;
                return <MenuItem 
                close={()=>setIsOpen(false)}
                type={key as WindowType}
                title={template[key as WindowType]?.title || "some title"}
                />
            })
        }
    </div>


    </div>
  )
}

export default Menu