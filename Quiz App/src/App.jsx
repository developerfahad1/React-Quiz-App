import axios from "axios"
import { useEffect, useRef } from "react"
import { useState } from "react"


function App(){
  const [render,setRender] = useState([])
  const [questionState,setQuestionState] = useState(0)
  const [score,setScore] = useState(0)
  const [WrongScore,setWrongScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const checkedInput = useRef([])

  try {
    useEffect(()=>{
      axios('https://the-trivia-api.com/v2/questions')
      .then((res)=>{
        console.log(res.data)
        setRender(shuffleArray(res.data))
      })
      .catch((err)=>{
        console.log(err);
        
      })
    },[])
  } catch (error) {
    console.log(error);
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }


  function NextQuetsion(){
    
    console.log(render.length);
    
    const checkedButton = checkedInput.current.find(input => input.checked);

    if(!checkedButton){
      alert('Please select an option');
      return; 
    }

    
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);

  
      if(selectedValue === render[questionState].correctAnswer){
        setScore(score + 1)
        console.log(score);
      }else{
        setWrongScore(WrongScore + 1)
        console.log(WrongScore);
      }
      
      
  
    const next = questionState + 1
    if(next >= render.length - 1){
      setQuizComplete(true);
      alert(`Quiz Completed.`);
      alert(` Your score is ${score}/9`)
     
      setRender(shuffleArray(render))
    }else{
      setQuestionState(next);
    }



    checkedInput.current.forEach(input=>{
      if(input){
        input.checked = false;
      }
    })
  }

  
  
  //return JSX
  return (
    <>
    {render.length > 0 ? (
        <div>
          {!quizComplete ? (
            <>
              <div className="container">
              <h1 className="quiz">Quiz App</h1>
              <h2>Q{questionState + 1} : {render[questionState].question.text}</h2>
              <hr />
              <div className="main">
              <ol>
                {shuffleArray([...render[questionState].incorrectAnswers, render[questionState].correctAnswer])
                  .map((item, index) => (
                      <li key={index} className="li">
                        <input 
                          id={item}
                          name="quiz"
                          type="radio"
                          value={item}
                          ref={e => checkedInput.current[index] = e}
                        />
                        <label className="li-label" htmlFor={item}>{item}</label>
                      </li>
                  ))}
              </ol>
              </div>
              <button className="btn" onClick={NextQuetsion}>Next</button>
              </div>
            </>
          ) : (
            <div className="quiz-complete">
              <h1>Quiz Complete</h1>
              <h3>{`Final Score: ${score}/9`}</h3>
              <div>
                <h3>{`Correct Answers: ${score}`}</h3>
                <h3>{`Wrong Answers: ${WrongScore}`}</h3>
                <h1>Total: 9</h1>
                <button className="btn-2" onClick={() => window.location.reload()}>Again</button>
              </div>
            </div>
          )}
        </div>
      ) : (
         <>
                 <h1 className="loading">Loading...</h1>
         </>
      )}
    </>
  );
}

export default App;