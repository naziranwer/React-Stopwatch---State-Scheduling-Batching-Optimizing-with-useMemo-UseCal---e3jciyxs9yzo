import React, { useRef, useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const lapSectionRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!intervalRef.current) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };

  const lapTimer = () => {
    const lapTime = (currentTime / 1000).toFixed(3);
    setLaps((prevLaps) => [...prevLaps, lapTime]);
    lapSectionRef.current.style.display = 'block';
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setCurrentTime(0);
    setLaps([]);
    lapSectionRef.current.style.display = 'none';
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{(currentTime / 1000).toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>START</button>
          <button className="stop-btn" onClick={stopTimer}>STOP</button>
          <button className="lap-btn" onClick={lapTimer}>LAP</button>
          <button className="reset-btn" onClick={resetTimer}>RESET</button>
        </section>
      </section>
      <section className='lap-section' ref={lapSectionRef}>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.length > 0 ? (
            laps.map((lap, index) => (
              <p key={index}>{lap}</p>
            ))
          ) : (
            <p>No laps recorded</p>
          )}
        </section>
      </section>
    </div>
  );
};

export default App;
