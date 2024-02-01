import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  setIsLoaded:any
}
type process= "Kernal" | "System" | "Starting" | "Boot";
type LoadingProps={
  text:string,
  completionText:string
  isRunning:boolean,
  isCompleted:boolean
}

function LoadingTerminal({
  text,
  completionText,
  isRunning,
  isCompleted
}:LoadingProps){

  const [dots,setDots] = useState<string[]>(["."]);

  useEffect(()=>{
    if(!isRunning) return;

    const timer = setTimeout(()=>{
      if(dots.length<5){
        setDots([...dots,"."]);
      }else{
        setDots(["."]);

      }
    },500);

    return ()=>{
      clearTimeout(timer);
    }

  },[isRunning])

  if(isRunning) return <div className=" flex items-center space-x-4 ">
   <AiOutlineLoading3Quarters
   className="animate animate-spin"
   />
   <p className="text-md">{text}{dots.map(s=>s)}</p>
</div> 

  if(isCompleted) return <div className="">
  <p className="text-md">{completionText}</p>
</div>


  return null;
}


function BiosScreen({setIsLoaded}:Props) {

  const [current,setCurrent] = useState<process>("Kernal");
  const [completed,setCompleted] = useState<number>(1);

  console.log("=== completed ===",completed);

  useEffect(()=>{
    const timer =setTimeout(()=>{
      if(current === "Kernal"){
        console.log("to starting")
        setCurrent("Starting");
        setCompleted(prev=>prev+1)
      }else if(current === "Starting"){
        console.log("to system")
        setCurrent("System")
        setCompleted(prev=>prev+1)
      }else if(current === "System"){
        console.log("to boot")
        setCurrent("Boot");
        setCompleted(prev=>prev+1)
      }else{
        clearInterval(timer);
      }
      
    },2000);

    return ()=>clearInterval(timer)

  },[current])

  useEffect(()=>{
    let timer:NodeJS.Timeout;
    console.log("current=>",current)
    if(current === "Boot"){
      timer = setTimeout(()=>{
        setIsLoaded(true);
      },1000)
    }
    return ()=>clearTimeout(timer);
  },[current])

 

  
  return (
    <div className='h-screen w-full bg-slate-900 p-2 text-white'>
        <div className="md:text-xl">

        <h1>==================================</h1>
        <h1 className=" w-[300px] md:w-[460px] flex justify-between"><p>\\</p> <p>Welcome to my portfolio</p>  <p>\\</p></h1>
        <h1>==================================</h1>
        </div>

     

      <LoadingTerminal
        key={1}
       isRunning={current === "Kernal"}
       isCompleted ={completed>1}
       text="Loading Kernal"
       completionText="Kernal loaded successfully!"
       />

      <LoadingTerminal 
      key={2}
       isRunning={current === "Starting"}
       isCompleted ={completed>2 }
       text="Loading System"
       completionText="System loaded successfully!"
       />

        <LoadingTerminal 
        key={3}
       isRunning={current === "System"}
       isCompleted ={completed>3}
       text="Initiating GUI"
       completionText="GUI initiated successfully!"
       />
      



    </div>
  )
}

export default BiosScreen