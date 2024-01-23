import React, { useState } from 'react'
import Window from '../Window'

type Props = {}

function Browser({}: Props) {

  const [count,setCount] = useState<number>(2);
  return (
    <Window title="Browser" type="BROWSER">
        <div>
          <h1>{count}</h1>
          <button onClick={()=>setCount(prev=>prev+1)}>+</button>
          <button onClick={()=>setCount(prev=>prev-1)}>-</button>
        </div>
    </Window>
  )
}

export default Browser