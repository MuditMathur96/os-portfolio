
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { FaRegWindowMaximize, FaRegWindowMinimize } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { RxArrowBottomRight } from 'react-icons/rx'
import useTaskManagerStore, { IWindow, WindowType } from '../store/TaskManagerStore'
import themeTemplate from '../themeTemplate'
import { useMediaQuery } from 'usehooks-ts'



interface Vector2D {
    x: number | string,
    y: number | string
}
type Props = {
    children:ReactNode,
    title?:string,
    type:string,
    defaultXY?:Vector2D
}

enum ViewState{
    AnimationNotStarted,
    IsAnimationInProgress,
    IsAnimationCompleted
}




function Window({ children,title,type,defaultXY}: Props) {
    const defaultSize:Vector2D={
        x: defaultXY?.x ||600,
        y: defaultXY?.y || 500
    }

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isResizing,setIsResizing] = useState<boolean>(false);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(true);
    const [position, setPosition] = useState<Vector2D>({
        x: 0,
        y: 0
    });

    const activeWindow = useTaskManagerStore(state=>state.activeWindow);
    const closeWindow = useTaskManagerStore(state=>state.closeWindow);
    const setActiveWindow = useTaskManagerStore(state=>state.setActiveWindow);
    const minimizeWindow = useTaskManagerStore(state=>state.minimizeWindow);
    const isActive = type === activeWindow;

    const windowProperties:IWindow | undefined = useTaskManagerStore(state=>state.windows[type as WindowType]);

    const [size,setSize] = useState<Vector2D>(defaultSize)
    const divRef = useRef<HTMLDivElement>(null);

    const Icon = useMemo(()=>themeTemplate[type as WindowType].icon,[]);

    const [minimizeState,setMinimizeState] = useState<ViewState>(ViewState.AnimationNotStarted);
    
    
    const isMobile = useMediaQuery("(max-width:768px)");
    

   
    

    const handlePointerDown = (e: any) => {
        if (isFullScreen) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        console.log("inside handlePointer down");
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    }

    const handlePointerUp = () => {
        console.log("removing events")

        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        setIsDragging(false);
    }

    const handlePointerMove = (e: PointerEvent) => {
        //console.log("inside move fn")
        //if(!isDragging ) return;
        // console.log("moving the element")

        setPosition((prev: any) => {
            let x = prev.x + e.movementX;
            let y = prev.y + e.movementY;
            // console.log(`x:${x},y:${y}`)
            return {
                x,
                y

            }
        });

    }

    const handlePointerResizeDown = (e: any) => {
        if (isFullScreen) return;
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        console.log("inside handlePointer down");
        window.addEventListener("pointermove", handlePointerResizeMove);
        window.addEventListener("pointerup", handlePointerResizeUp);
    }

    const handlePointerResizeUp = () => {
        console.log("removing events")

        window.removeEventListener("pointermove", handlePointerResizeMove);
        window.removeEventListener("pointerup", handlePointerResizeUp);
        setIsResizing(false);
    }

    const handlePointerResizeMove = (e: PointerEvent) => {
        //console.log("inside move fn")
        //if(!isDragging ) return;
        // console.log("moving the element")
        
        setSize(prev=>{
            return{
                x:prev.x+e.movementX ,
                y:prev.y+e.movementY
            }
        })

      
    }


    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        setSize(defaultSize)

        // setPosition({
        //     x:0,
        //     y:0
        // })
    }

    const handleActiveWindow = ()=>{
        if(isActive) return;

        setActiveWindow(type as WindowType)
    }

    useEffect(() => {
        if (!isDragging) {
            const finalPosition = divRef.current?.getBoundingClientRect();
            console.log("final position", divRef?.current?.getBoundingClientRect())
            console.log("translate values", position);
            console.log(window.innerWidth);

            let xDelta = 0;
            let yDelta = 0
            if (finalPosition && finalPosition?.top < 30) {
                yDelta = 30 - finalPosition.top
            }
            if(finalPosition && finalPosition.bottom > window.innerHeight){
                yDelta = window.innerHeight - finalPosition.bottom  
            }
            if (finalPosition && finalPosition?.right > window.innerWidth)
                xDelta = window.innerWidth - finalPosition?.right;
            
            if( finalPosition && finalPosition?.left <80){
                xDelta +=   80 - finalPosition.left;
            }
            setPosition({
                x: position.x + xDelta,
                y: position.y + yDelta
            })
        }

    }, [isDragging])

    useEffect(()=>{
        if(isResizing) return;

        const finalSize = divRef.current?.getBoundingClientRect();
        if(!finalSize) return;

        let wDelta = 0;
        let hDelta = 0;
        if(finalSize.width>(window.innerWidth - 80)){
            wDelta = (window.innerWidth-80)-finalSize.width;
        }
        if(finalSize.height>(window.innerHeight - 40)){
            hDelta = (window.innerHeight- 40) - finalSize.height;
        }

        if(wDelta === 0 && hDelta === 0) return;

        setSize(prev=>{
            return {
                x:prev.x + wDelta,
                y:prev.y + hDelta
            }
        })

    },[isResizing])


    return (
        <div
        
            onClick={handleActiveWindow}
            ref={divRef}
            style={!isFullScreen ? {
                transform: `translateX(${position.x}px) translateY(${position.y}px)`,
                width:size.x,
                height:size.y
            } : {}}
            className={` min-w-[300px] min-h-[400px] rounded-sm
                         bg-white flex flex-col absolute
                         ${(isFullScreen || isMobile) ? "w-full h-full" : " "}
                         ${isDragging ? "opacity-70" : ""}
                         ${!isDragging && !isResizing?"duration-300":""}
                         ${isActive?"z-[99]":"z-[1]"}
                         ${windowProperties?.isMinimized?"hidden":""}
                         ${minimizeState === ViewState.AnimationNotStarted?"":""}
                         ${minimizeState === ViewState.IsAnimationInProgress?"":""}
                         ${minimizeState === ViewState.IsAnimationCompleted?"":""}
                         `}>
            {/* Header */}
            <div
                onPointerDown={handlePointerDown}
                className='h-[40px] bg-neutral-900  w-full rounded-t-sm 
                        flex items-center  justify-between'>
                {/* Window Title */}
                <div className='text-white px-2 flex items-center space-x-2  '>
                    {<Icon />} 
                    <div>{title}</div>
                </div>

                {/* Window Action Buttons */}
                <div className='flex items-center space-x-1 mr-1'>
                    <div
                        className='hover:bg-neutral-700 p-1 rounded-sm'
                    >

                        <FaRegWindowMinimize
                            role='button'
                            onClick={()=>{
                                minimizeWindow(type as WindowType);
                            }}
                            color="white"
                            size={15}
                        />
                    </div>
                   {!isMobile && <div
                        className='hover:bg-neutral-700 p-1 rounded-sm'
                    >
                        <FaRegWindowMaximize
                            onClick={toggleFullScreen}
                            role='button' color='white' size={15} />
                    </div>}

                    <div
                        className='hover:bg-neutral-700 p-1 rounded-sm'
                    >
                        <IoClose 
                        onClick={()=>closeWindow(type as WindowType)}
                        role='button' 
                        color='white'
                         size={20} />
                    </div>
                </div>




            </div>

            {/* Main Content */}
            <div className='flex-1 border-2'>
                {children}
            </div>

            {/* Footer */}
            <div 
            onPointerDown={handlePointerResizeDown}
            className=' bg-neutral-200 w-full rounded-b-sm 
                flex justify-end 
                cursor-nw-resize '>
               {!isFullScreen && !isMobile &&   <RxArrowBottomRight />}

            </div>
        </div>
    )
}

export default Window