import { useEffect,useState } from "react";
import countryService from './services/countryService'
import CountryDetails from './components/CountryDetails'


const App=()=>{
  const [countries, setCountries]=useState([])
  const [search, setSearch]=useState('')
  const [selectedCountry, setSelectedCountry]=useState(null)


  useEffect(()=>{
    countryService.getAll().then(data=>setCountries(data))
  },[])


  const handleSearch=(event)=>{setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShow=(country)=>{
    setSelectedCountry(country)
  }

  const filteredCountries=countries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase()))




return (
  <div>
    <input value={search} onChange={handleSearch} placeholder="Search Countries" />

   {search && (
    <>
     {filteredCountries.length > 10 && <p>Too many matches, be more specific</p>}

    {
      filteredCountries.length>1 && filteredCountries.length <=10 &&(
        <ul>
          {filteredCountries.map(country=> <li key={country.cca3}> {country.name.common}
            <button onClick={()=>handleShow(country)}>Show</button>
             </li>)}
        </ul>
      )
    }

    {filteredCountries.length ===1 &&(
      <CountryDetails country={filteredCountries[0]}/>
    )}

    {selectedCountry && filteredCountries.length > 1 && (
      <CountryDetails country={selectedCountry} />
    )}

    </>
   )}





  </div>
)

}
export default App
