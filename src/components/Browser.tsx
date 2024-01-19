import React from 'react'
import Window from './Window'

type Props = {}

function Browser({}: Props) {
  return (
    <Window title="Browser" type="BROWSER">
        <div>Browser</div>
    </Window>
  )
}

export default Browser