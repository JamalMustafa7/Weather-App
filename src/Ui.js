import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react';
export  function Ui()
{
    let [city,setCity]=useState("pune");
    let [finalizedCity,setFinalizedCity]=useState(city);
    let{ data,refetch}=useQuery(['weather',finalizedCity],()=>{
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${finalizedCity}&units=metric&appid=ad6d06efcc7163298d69bca3fd43707b`).then((res)=>{
          return {
            city:res.data.name,
            country:res.data.sys.country,
            temp:res.data.main.temp,
            pressure:res.data.main.pressure,
            humidity:res.data.main.humidity,
            mode:res.data.weather[0].main,
            sunset:res.data.sys.sunset,
            speed:res.data.wind.speed
          }
        });
    });
    function weatherIcon()
    {
      if (!data || !data.mode) {
        return ""; // Return empty string if data is empty or mode is undefined
      }
      switch(data?.mode)
      {
        case "Clouds":
          return "wi wi-day-cloudy";
        case "Rain":
          return "wi wi-rain";
        case "Haze":
          return "wi wi-day-haze"
        default:
          return "wi wi-day-sunny"; 
      }
    }
    let sec=data?.sunset;
    let date=new Date(sec*1000);
    let sunset=`${date.getHours()}:${date.getMinutes()}`;
    return(
        <div className='container'>
        <div className='input'>
          <input type='search' autoFocus onChange={(event)=>{setCity(event.target.value);console.log(city)}}/>
          <input type='submit' value='search' onClick={()=>setFinalizedCity(city)}/>
        </div>
        <div className='weather-report'>
          <div className='image'>
            <i className={weatherIcon()}></i>
          </div>
          <div className='weather-info'>
            <div className='col-1'>
              <div className='temperature'>
                {data?.temp}&deg;
              </div>
              <div className='other'>
                <span className='condition'>
                  {data?.mode}
                </span>
                <br />
                <span className='place'>
                  {data?.city},{data?.country}
                </span>
              </div>
            </div>
            <div className='col-2'>
              {new Date().toLocaleString()}
            </div>
          </div>
          <div className='two-sided-section'>
              <div className='section'>
                <div className='pic'>
                  <i className='wi wi-day-haze'></i>
                </div>
                <div>
                  <span>{sunset} PM</span><br />
                  <span>Sunset</span>
                </div>
              </div>
              <div className='section'>
                <div className='pic'>
                  <i className='wi wi-humidity'></i>
                </div>
                <div>
                  <span>{data?.humidity}</span><br />
                  <span>Humidity</span>
                </div>
              </div>
              <div className='section'>
                <div className='pic'>
                  <i className='wi wi-rain-wind'></i>
                </div>
                <div>
                  <span>{data?.pressure}</span><br />
                  <span>Pressure</span>
                </div>
              </div>
              <div className='section'>
                <div className='pic'>
                  <i className='wi wi-strong-wind'></i>
                </div>
                <div>
                  <span>{data?.speed}</span><br />
                  <span>Speed</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}