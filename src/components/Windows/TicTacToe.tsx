//libraries
import { useState } from 'react'
import _ from "lodash";


//custom components
import Window from '../Window'

//Icons
import { FaRegCircle } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

type Turn = "PLAYER 1" | "PLAYER 2" | null;
type input = boolean | null;
type Vector2d = {
  x: number,
  y: number
}

type GameState = [Turn[], Turn[], Turn[]]
type GameSlotProps={
   onClick:any,
   position: Vector2d, 
   value: Turn
}
type GameRendererProps = {
  turn:Turn,
  setTurn:any,
  remainingSteps:number,
  setRemainingSteps:any
  result:string,
  setResult:any,
  gameState:GameState,
  setGameState:any

}

const defaultState: GameState = [[null, null, null],
[null, null, null],
[null, null, null]
]



function GameSlot({ position, value ,onClick}: GameSlotProps) {
  const classNames = "w-[30px] h-[30px] md:w-[85px] md:h-[85px] text-gray-950 "
  return <div
  style={{
    backgroundImage:`url("/ground_${position.x}${position.y}.jpg")`
      }} 
  onClick={()=>{
    
    onClick(position)}}
  className={`w-full h-[120px] md:w-[197px] md:h-[197px]
   border bg-cover bg-center
   flex items-center justify-center 
   bg-slate-400`}>
    {value === null && <span></span>}
    {value === "PLAYER 1" && <FaRegCircle 
    className={classNames} 
    
    strokeWidth={"3px"} />}
    {value === "PLAYER 2" && <RxCross1 
                      className={classNames} 
                      strokeWidth={1} 
                        />}
    
  </div>
}

function GameRenderer({
remainingSteps,
setRemainingSteps,
turn,
setTurn,
gameState,
setGameState,
result,
setResult

}:GameRendererProps){

  function setWinner(){
    setRemainingSteps(0);
    setResult(turn);
  }

  
  function checkWinCondition(gameState:GameState):boolean{
         
        //1st column 00
        if(gameState[0][0] == gameState[0][1] 
          && gameState[0][1] === gameState[0][2] 
          && gameState[0][2]!== null) return true;

        if(gameState[0][0] == gameState[1][0] 
          && gameState[1][0] === gameState[2][0]
          && gameState[2][0] !== null
          ) return true;

        if(gameState[0][0] == gameState[1][1] 
          && gameState[1][1] === gameState[2][2]
          && gameState[2][2]!== null) return true;
         

        //2nd column 01
        if(gameState[0][1] == gameState[1][1] 
          && gameState[1][1] === gameState[2][1]
          && gameState[2][1]!== null) return true;

        //3rd column 02
        if(gameState[0][2] == gameState[1][2] 
          && gameState[1][2] === gameState[2][2]
          && gameState[2][2] !== null) return true;

        if(gameState[0][2] == gameState[1][1] 
          && gameState[1][1] === gameState[2][0]
          && gameState[2][0]!== null) return true;

        //middle row 10
          if(gameState[1][0] === gameState[1][1] 
            && gameState[1][1] === gameState[1][2]
            && gameState[1][2] !== null) return true;
           

        //last row 20
        if(gameState[2][0] === gameState[2][1] 
          && gameState[2][1] === gameState[2][2]
          && gameState[2][2] !== null) return true;

        return false

  }


  function updateGameState(position:Vector2d){

    if(remainingSteps <= 0) return;
    if(gameState[position.x][position.y] !== null) return;

    const temp:GameState = [...gameState];
    temp[position.x][position.y] = turn;

    console.log(temp);
    setGameState(temp);
    setRemainingSteps(prev=>--prev);
    setTurn(prev=>prev === "PLAYER 1"?"PLAYER 2":"PLAYER 1");

    const isWinner = checkWinCondition(temp);
    if(isWinner) setWinner();


  }

  

  return <div className='w-full h-[70%]  md:h-[80%] px-2
                      flex flex-col items-center justify-center
                      relative
                      '>

   {remainingSteps <= 0 && result !== "" &&  <div className='absolute top-0 left-0 
                      w-full h-full bg-opacity-40 bg-blend-darken
                      bg-slate-500 
                      flex items-center justify-center '>
        <h1 className='text-3xl md:text-6xl font-semibold text-gray-200'>{`${result} WON! `}</h1>
        <img src="/win.png" className='w-[80px] md:w-[200px]'   />
      
    </div>}
    {
      remainingSteps<=0 && result === "" && <div className='absolute top-0 left-0 
      w-full h-full bg-opacity-40 bg-blend-darken
      bg-slate-500
      flex items-center justify-center '>
        <h1 className='text-6xl font-semibold text-gray-200'>DRAW</h1>

      </div>
    }
    <div>
      <h1 className=' bg-slate-800 p-2  md:p-6 text-lg md:text-3xl shadow-lg text-white m-2'>{`${turn}'s turn`}</h1>
    </div>
    <div className='grid grid-cols-3 bg-black  md:mx-auto w-full h-[360px]  md:h-[600px]  md:w-[600px]'>
  {
    gameState.map((g, i1) => {
      return g.map((g2, i2) => {
        return <GameSlot
          key={`${i1},${i2}`}
          onClick={updateGameState}
          position={{ x: i1, y: i2 }}
          value={g2}
        />
      })
    })
  }

</div>
 
    </div>

}

function WelcomeSceen({startGame}:{startGame:()=>void}){
  return <div className='w-full h-full flex-1 flex items-center justify-center'>
    <button 
    className='border text-3xl font-semibold bg-green-800 w-[200px] h-[50px] md:w-1/4 md:h-[100px]'
    onClick={startGame}>Start Game</button>
  </div>


}
function TicTacToe() {
  const [gameStarted,setGameStarted] = useState<boolean>(false);
  const [turn, setTurn] = useState<Turn>("PLAYER 1");
  const [remainingSteps,setRemainingSteps] = useState<number>(9);
  const [result,setResult] = useState<Turn | "">("");
  const [gameState, setGameState] = useState<GameState>(_.cloneDeep(defaultState));
  



  return (
    <Window
      title="Tic Tac Toe"
      type="TIC_TAC_TOE"
      minHeight={900}
      minWidth={900}
    >
      <div 
      style={{
        backgroundImage:'url("/bg-forest.jpg")'
      }}
      className='h-full w-full bg-cover bg-center bg-no-repeat'>
    {
      gameStarted?<GameRenderer
      turn={turn}
      setTurn={setTurn}
      remainingSteps={remainingSteps}
      setRemainingSteps={setRemainingSteps}
      result={result || ""}
      setResult={setResult}
      gameState={gameState}
      setGameState={setGameState}
      />:<WelcomeSceen startGame={()=>setGameStarted(true)} />
    }
    {gameStarted && <div className='w-full flex items-center justify-center '>
    <button 
     onClick={()=>{
       console.log("===  Resetting the state ===",[...defaultState])
       setGameState(_.cloneDeep(defaultState));
       setTurn("PLAYER 1");
       setRemainingSteps(9);
      
      setGameStarted(false)
    }}
     className='w-3/4 md:w-[400px] text-3xl border h-[70px] bg-green-800' >Reset Game</button>
    </div>}
      </div>
     
    
    </Window>
  )
}

export default TicTacToe