import React, { useState } from 'react'
import Quiz from './components/Quiz'
import { Data } from './components/Data'

const App = () => {
  const [data, setData] = useState(Data)
  console.log(Data);
  
  return (
    <div className='container'>
      <div className='quiz'>
        <div>
          <h1>{Data[0].q}</h1>
        </div>
        <div className='option'>
          <input type='radio' />
          <p> {data[0].a}</p>
         </div>

      </div>
    </div>
  )
}

export default App