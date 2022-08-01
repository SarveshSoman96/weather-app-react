import './App.css';
import { useRef, useState } from 'react';
import DateComponent from './components/Date';
import axios from 'axios';

function App() {

  const [cityName, setCityName] = useState()
  const [cityData, setCityData] = useState({})
  const [errText, setErrText] = useState();
  const [res, setRes] = useState(false)
  const InputRef = useRef();

  const apiCall = (name) => {
     axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e8568e8bb8092ea07e3116bc9db4022b`
        )
        .then((res) => {
          if(res.statusText === "OK"){
            setRes(true)
            setCityData({
            name: res.data.name,
            temp: res.data.main.temp,
            tempMin: res.data.main.temp_min,
            tempMax: res.data.main.temp_max
          })
          }
        })
        .catch((err) => {
          setRes(false)
          if(err.message) setErrText("Something Wrong. Enter valid city Name")
        });
  };

  
  const cityNameSubmitHandler = (e) => {
    e.preventDefault();

    const cityName = InputRef.current.value; 

    if(cityName.trim() === "") {
        alert("Enter City Name");
         return
    }


    setCityName(cityName)

    apiCall(cityName)

    InputRef.current.value = ""
  };


  const response = !errText ? "Loading" : errText;
  const errorClass = errText && "errorText";
  
  return (
    <div className='container'>
      <form className='city_form' onSubmit={cityNameSubmitHandler}>
          <input ref={InputRef} type="text" placeholder='City Name'/><br />
          <button type='submit'>Submit</button>
      </form>
      {cityName && <div className='data_container'>
            {res ? <>
            <h2>{cityData.name}</h2>
            <DateComponent />
            <div className='temp_container'>
                <p>Temp min<br />{(cityData.tempMin - 271.15).toFixed(2)}°c</p>
                <p>Temp<br /> {(cityData.temp - 271.15).toFixed(2)}°c</p>
                <p>Temp max<br />{(cityData.tempMax - 271.15).toFixed(2)}°c</p>
            </div>
            </> : <p className={errorClass}><small>{response}</small></p>}
      </div>}
    </div>
  );
}

export default App;
