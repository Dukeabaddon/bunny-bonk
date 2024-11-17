import { useEffect, useState } from 'react';
import './App.css';
import bunnyPic from './assets/bunnyPic.png';
import holePic from './assets/holePic.png';
import token from './assets/bunnyToken.png';

function App() {
  const [holes, setHoles] = useState(
    Array(9).fill(false)
  );

  const [score, setScore] = useState(0);
 
  const show = (index)=>{
    const newHoles = [...holes];
    newHoles[index] = true;
    setHoles(()=> newHoles)
  }

  const hide = (index) => {
    const newHoles = [...holes];
    newHoles[index] = false;
    setHoles(()=>newHoles);
  }

  const hit = (index)=>{
    if(holes[index]){
      hide(index);
      setScore(currScore=>currScore+10);
    }
  }

  useEffect(()=>{
    const intervalid = setInterval(() => {
      const randomNum = Math.floor(Math.random()*holes.length-1)
      show(randomNum);
      setTimeout(()=>{
        hide(randomNum);
      },10000)
    }, 800);
    return ()=>{
      clearInterval(intervalid);
    }
  })
  useEffect(() => {
    // Load score from localStorage when component mounts
    const savedScore = localStorage.getItem('bunnyScore');
    if (savedScore !== null) {
      setScore(parseInt(savedScore));
    }
  }, []);

  useEffect(() => {
    // Save score to localStorage whenever it changes
    localStorage.setItem('bunnyScore', score);
  }, [score]);


  return (
    <>
      <div id="score1">+10</div>
      <div id="score2">+10</div>
      <div id="score3">+10</div>

      <div className='App'>
        <div className='scoreboard'>

          <div className='score-container'>
            <img src={token} alt="token" /> 
            <p className='score'>{score}</p>
          </div>
        </div>

        <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(score % 1000) / 10}%`}}></div>
          </div>

        <div className='board'>
          {holes.map((value, idx) => (
            <img key={idx} src={value ? bunnyPic : holePic} width={200} onClick={()=>{
              hit(idx);
              if(holes[idx]) {
                const random = Math.floor(Math.random() * 3) + 1;
                const elem = document.getElementById(`score${random}`);
                elem.style.opacity = '1';
                setTimeout(() => {
                  elem.style.opacity = '0';
                }, 1000);
              }
            }} alt={`hole-${idx}`} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;