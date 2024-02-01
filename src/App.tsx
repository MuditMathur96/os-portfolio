
import { useState } from 'react'
import './App.css'
import Desktop from './components/Desktop'
import BiosScreen from './components/BiosScreen';


function App() {

  const [isLoaded,setIsLoaded] = useState<boolean>(false);


  return (
    <>
    {!isLoaded && <BiosScreen setIsLoaded={setIsLoaded} />}
    {isLoaded && <Desktop />}
    </>
  )
}

export default App