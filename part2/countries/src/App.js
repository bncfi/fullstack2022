import {useState, useEffect} from 'react'
import axios from 'axios'


const Weather = ({countryToShow, weatherData,apikey, setWeatherData}) => {
  
  /*
  const hookWeather = () => {
    const city = countryToShow.capital
    console.log("city ", city)
      axios
      .get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric")
      .then(response => {
        setWeatherData(response.data)
    })
  }
  useEffect(hookWeather, [countryToShow, apikey, setWeatherData])
  */

  return(
    <div>
      <h1>Weather in {countryToShow.capital}</h1>
      <p>temperature {weatherData.main.temp}  Celcius</p>
      <img alt={countryToShow.capital} src={"http://openweathermap.org/img/wn/"+weatherData.icon.weather[1]+".png"} />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div> 
  )
}

const Country = ({countryToShow, apikey,weatherData, setWeatherData}) => {
  const hookWeather = () => {
    const city = countryToShow.capital[0]
      axios
      .get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric")
      .then(response => {
        setWeatherData(response.data)
    })
  }
  useEffect(hookWeather, [countryToShow, apikey, setWeatherData])

  if (weatherData === undefined) {
    return (
      <div>
        <h1>{countryToShow.name.common}</h1>
        <p>capital {countryToShow.capital}</p>
        <p>area {countryToShow.area}</p>
        <b>languages</b>
        <ul>
          {Object.entries(countryToShow.languages).map((array)=> {
            return <li key={array[1]}>{array[1]}</li>
          })
          }
        </ul>
        <img alt={countryToShow.name.common} src={countryToShow.flags.png} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>{countryToShow.name.common}</h1>
        <p>capital {countryToShow.capital}</p>
        <p>area {countryToShow.area}</p>
        <b>languages</b>
        <ul>
          {Object.entries(countryToShow.languages).map((array)=> {
            return <li key={array[1]}>{array[1]}</li>
          })
          }
        </ul>
        <img alt={countryToShow.name.common} src={countryToShow.flags.png} />
        <h1>Weather in {countryToShow.capital}</h1>
        <p>temperature {weatherData.main.temp}  Celcius</p>
        <img alt={countryToShow.capital} src={"http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+".png"} />
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }
}


const CountryOneLine = ({country,buttonHandleCountry}) => {
      return(
        <p key={country.name.common}>{country.name.common}
        <button onClick={() => buttonHandleCountry(country)}>show</button>
        </p> 
      ) 
}

const FiltCountries = ({filteredCountryData, setCountryToShow, buttonHandleCountry}) => {
  if (filteredCountryData.length > 10) {
    return( 
      <p>Too many results</p>
    )
  }else if (filteredCountryData.length < 10 && filteredCountryData.length > 1) {
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

  //,  <Weather key={countryToShow.capital} weatherData={weatherData} countryToShow={countryToShow} apikey={apikey} setWeatherData={setWeatherData}/>
  return (
    <div className="App">
        search for country <input value={searchWord} onChange={inputHandleSearch}/>
        {countryToShow === ''
        ? <FiltCountries filteredCountryData={filteredCountryData} setCountryToShow={setCountryToShow} buttonHandleCountry={buttonHandleCountry} />
        : [<Country key={countryToShow} countryToShow={countryToShow} apikey={apikey} setWeatherData={setWeatherData} weatherData={weatherData}/>]
        }
      
    </div>
  );
}

export default App;
