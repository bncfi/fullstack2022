import {useState, useEffect} from 'react'
import axios from 'axios'


const Weather = ({country, weatherData}) => {

  console.log(weatherData)
  return(
    <div>
      <h1>Weather in {country.capital}</h1>
      <p>temperature  Celcius</p>
    </div> 
  )
}

const Country = ({country, apikey, setWeatherData}) => {

    const city = country.capital
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric")
      .then(response => {
        setWeatherData(response.data)
      })
  console.log("joo")
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages</b>
      <ul>
        {Object.entries(country.languages).map((array)=> {
          return <li key={array[1]}>{array[1]}</li>
        })
        }
      </ul>
      <img alt={country.name.common} src={country.flags.png} />
    </div>
  )
}


const CountryOneLine = ({country,buttonHandleCountry}) => {
      return(
        <p key={country.name.common}>{country.name.common}
        <button onClick={() => buttonHandleCountry(country)}>show</button>
        </p> 
      ) 
}

const FiltCountries = ({filteredCountryData, setCountryToShow, buttonHandleCountry, handleWeather}) => {
  if (filteredCountryData.length > 10) {
    return( 
      <p>Too many results</p>
    )
  }else if (filteredCountryData.length < 10 && filteredCountryData.length > 1) {
    console.log("filtCount", filteredCountryData)
    return(
      filteredCountryData.map(country => <CountryOneLine key={country.name.common} country={country} buttonHandleCountry={buttonHandleCountry}/>)
    )
  }else if (filteredCountryData.length === 1) {
    setCountryToShow(filteredCountryData[0])
    return(
      <></>
    )
  }else {
    return(
      <></>
    )
  }
}

function App() {
  const apikey = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchword] = useState('')
  const [countryToShow, setCountryToShow] = useState('')
  const [weatherData, setWeatherData] = useState()
  const [filteredCountryData, setFilteredCountryData] = useState([])

  const hookCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hookCountries,[])
/*
  if(countryToShow !== '') {
    const city = countryToShow.capital
    const hook = (city,apikey, setWeatherData) => {
      axios
      .get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric")
      .then(response => {
        setWeatherData(response.data)
      })
    }
    useEffect(hook(city,apikey, setWeatherData), [])
  }
  */

  const inputHandleSearch = (event) => {
    const searchWord = event.target.value
    setSearchword(searchWord)
    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchWord.toLowerCase())
    })
    setFilteredCountryData(filteredCountries)
    setCountryToShow('')
  }

  const buttonHandleCountry = (country) => {
    setCountryToShow(country)
  }


  return (
    <div className="App">
        search for country <input value={searchWord} onChange={inputHandleSearch}/>
        {countryToShow === ''
        ? <FiltCountries filteredCountryData={filteredCountryData} setCountryToShow={setCountryToShow} buttonHandleCountry={buttonHandleCountry} />
        : <Country country={countryToShow} apikey={apikey} setWeatherData={setWeatherData}/>
        }
      
    </div>
  );
}

export default App;
