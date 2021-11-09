import React, { useState, useEffect } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timerOn, setTimeOn] = useState(false);
  const arrOfClicks = [];

  useEffect(() => {
    let intervalSeconds = null;
    let intervalMinutes = null;
    let intervalHours = null;

    if (timerOn) {
      intervalSeconds = setInterval(async () => {
        await setSeconds((prevTime) => prevTime + 1);
      }, 1000);
      intervalMinutes = setInterval(async () => {
        await setMinutes((prevTime) => prevTime + 1);
      }, 60000);
      intervalHours = setInterval(async () => {
        await setHours((prevTime) => prevTime + 1);
      }, 3600000);
    } else {
      clearInterval(intervalSeconds);
      clearInterval(intervalMinutes);
      clearInterval(intervalHours);
    }

    return () => {
      clearInterval(intervalSeconds);
      clearInterval(intervalMinutes);
      clearInterval(intervalHours);
    };
  }, [timerOn]);

  const doubleClickCheck = (e) => {
    e.preventDefault();
    e = new Date().getTime();
    if (arrOfClicks.length <= 1) {
      arrOfClicks.push(e);
    }
    if (arrOfClicks.length === 2) {
      if (arrOfClicks[1] - arrOfClicks[0] <= 300) {
        setTimeOn(false);
        arrOfClicks.length = 0;
      } else {
        arrOfClicks.length = 0;
        return;
      }
      return;
    }
  };
  return (
    <div className='app'>
      <h1 className='title'>Stopwatch</h1>
      <div className='display-container'>
        <span className='number-container'>
          <p className='numbers'>{hours >= 10 ? hours : `0${hours}`}</p>
        </span>
        <span className='number-container'>
          <p className='numbers'>:</p>
        </span>
        <span className='number-container'>
          <p className='numbers'>
            {minutes % 60 >= 10 ? minutes % 60 : `0${minutes % 60}`}
          </p>
        </span>
        <span className='number-container'>
          <p className='numbers'>:</p>
        </span>
        <span className='number-container'>
          <p className='numbers'>
            {seconds % 60 >= 10 ? seconds % 60 : `0${seconds % 60}`}
          </p>
        </span>
      </div>
      <div className='btn-container'>
        {!timerOn ? (
          <button className='button' onClick={() => setTimeOn(true)}>
            Start
          </button>
        ) : (
          <button
            className='button'
            onClick={() => {
              setSeconds(0);
              setMinutes(0);
              setHours(0);
              setTimeOn(false);
            }}
          >
            Stop
          </button>
        )}
        {seconds || minutes || hours > 0 ? (
          <>
            <button className='button' onClick={doubleClickCheck}>
              Wait
            </button>
            <button
              className='button'
              onClick={() => {
                setSeconds(0);
                setMinutes(0);
                setHours(0);
              }}
            >
              Reset
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Stopwatch;
