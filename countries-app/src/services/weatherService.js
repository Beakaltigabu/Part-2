import axios from 'axios'

const apiKey= import.meta.env.VITE_WEATHER_KEY

const getWeather = (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
  return axios.get(url).then(res => res.data)
}




export default {getWeather}
