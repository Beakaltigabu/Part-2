import { useEffect,useState } from "react";
import weatherService from "../services/weatherService";


const CountryDetails=({country})=>{

    const [weather, setWeather]=useState(null)

    useEffect(()=>{
        const capital=country.capital?.[0]
        if(capital){
            weatherService
            .getWeather(capital)
            .then(data=>setWeather(data))
            .catch(err=>console.error('weather fetch failed:', err))
        }
    },[country])






    return (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}Km2</p>

        <h4>Languages:</h4>
        <ul>
            {Object.values(country.languages).map(lang=> <li key={lang}> {lang}</li>)}
        </ul>


<img src={country.flags.png} alt={country.flags.alt || `Flag of ${country.name.common}`}  style={{width:'150px',height: 'auto' }} />



{weather && weather.current && (
  <div>
    <p>Temperature: {weather.current.temp_c} °C</p>
    <img
      src={`https:${weather.current.condition.icon}`}
      alt={weather.current.condition.text}
    />
    <p>Wind: {weather.current.wind_kph} km/h direction {weather.current.wind_dir}</p>
  </div>
)}


    </div>











    )
}


export default CountryDetails;
