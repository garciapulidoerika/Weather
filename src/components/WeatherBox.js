import React from 'react'
import {useState, useEffect} from 'react'

const apiUrl = 'https://api.openweathermap.org';
const apiKey = '44e12c2c90e9628afb2b4912d8f26f86';
        
const WeatherBox = () => {

    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [wea, setWea] = useState ([]);
    const [centi, setCenti]= useState('')
    const [showC, setShowC]= useState(true)

    let getPosition = (position)  => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setLat(latitude)
        setLong(longitude)
    }
   
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, [])
    
    useEffect(() => {
        const getWeatherInfo = async () => {
        await fetch(`${apiUrl}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
        .then(res => res.json())
        .then(result => {
            setWea(result)
            console.log(result)
            let toCelcious = `${((result.main.temp) - 273.15).toFixed(0)} °C`
            setCenti(toCelcious)
        });  
        }
    
        if (lat && long) {
            getWeatherInfo();
          }
    }, [lat,long])     //segundo useEffect para obtener info de la API / dep lat y long


    if(!wea.weather) {
        return <div className="loading"><h2>Loading...</h2></div>  //spinner
    }
    

    const icon = `https://openweathermap.org/img/wn/${wea.weather[0].icon}@2x.png` 


    return (
        <div className = "bigbox">
                <div className="box">
                <h3>Current Weather in:</h3>
                <h1>{wea.name} - {wea.sys.country}</h1>
                    <img src={icon} alt="weather"/>
                    <h1>{showC ? centi : `${( (((wea.main.temp) - 273.15).toFixed(0)) * 1.8 + 32).toFixed(0)} °F` }</h1>
                    <p>{wea.weather[0].main} - {wea.weather[0].description}</p>

                <div>
                    <button className="button" onClick={() => setShowC(!showC)} > °C / °F </button>
                </div>
                </div>
            </div>
        );  
    }

    export default WeatherBox 
