import React, { useState, useEffect} from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const endDate = moment([2023, 4, 29]);
  const [countDown, setCountDown] = useState(moment.duration(endDate.diff(moment())));

  useEffect(() => {
    const id = setInterval(() => {
      setCountDown(moment.duration(endDate.diff(moment())));
    }, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const getValue = (duration, unit) => {
    const time = duration.toString().length < 2 ? `0${duration}` : duration;
    const idealUnit = duration !== 1 ? `${unit}s` : unit;
    return (<><span>{time}</span><span>{idealUnit}</span></>);
  }

  
  return (
    <div className="App">
      {moment().isSameOrBefore(endDate) ? <h1 className="heading">Buhari's Tenure Will be Over in</h1>:<h1 className="heading">Buhari's Tenure is Over!! <span role="img" aria-label="confetti ball">🎉🎉🎉</span></h1>}
      <div className="time">
        <div className='time__unit'>{getValue(countDown.years(), 'Year')}</div>
        <div className='time__unit'>{getValue(countDown.months(), 'Month')}</div>
        <div className='time__unit'>{getValue(countDown.days(), 'Day')}</div>
        <div className='time__unit'>{getValue(countDown.hours(), 'Hour')}</div>
        <div className='time__unit'>{getValue(countDown.minutes(), 'Minute')}</div>
        <div className='time__unit'>{getValue(countDown.seconds(), 'Second')}</div>
      </div>
      <div className="bottom__emoji">{moment().isSameOrBefore(endDate) && <span role="img" aria-label="unamused">😒😒😒</span>}</div>
      <div className="footer">
        <p>Made with <span role="img" aria-label="love">❤</span> by <a className="App-link" href="https://twitter.com/codenaz">codenaz</a></p>
      </div>
    </div>
  );
}

export default App;
