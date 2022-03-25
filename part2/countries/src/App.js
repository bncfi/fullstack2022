import {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country, apikey, setWeatherData, weatherData}) => {
  const [lat, lon] = country.capitalInfo.latlng
  
  axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apikey+"&units=metric")
  .then(response => {
    setWeatherData(response.data)
  })
  console.log(weatherData)
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
      <h1>Weather in {country.capital}</h1>
      <p>temperature Celcius</p>
      
    </div>
  )
}

const Button = ({handle, text}) => {
  return <button onClick={handle}>{text}</button>
}

const CountryOneLine = ({country,buttonHandleCountry, isShow,countryToShow, apikey, setWeatherData, weatherData}) => {
  if(isShow && countryToShow === country.name.common) {
    return <Country key={country.name.common} country={country} apikey={apikey} setWeatherData={setWeatherData} weatherData={weatherData}/>
  }else if(isShow === false) {
      return(
        <p key={country.name.common}>{country.name.common}
        <button onClick={() => buttonHandleCountry(country.name.common)}>show</button>
        </p> 
      ) 
    }else {
      return <></>
    }
}

const FilteredCountries = ({searchWord, countries, buttonHandleCountry, isShow,countryToShow,apikey, setWeatherData, weatherData}) => {
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchWord.toLowerCase())
  })
  if (filteredCountries.length > 10) {
    return( 
      <p>Too many results</p>
    )
  }else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return(
      filteredCountries.map((country) => {
       return <CountryOneLine 
       key={country.name.common} 
       country={country} 
       buttonHandleCountry={buttonHandleCountry} 
       isShow={isShow} 
       countryToShow={countryToShow} 
       apikey={apikey}
       setWeatherData={setWeatherData}
       weatherData={weatherData}/>
      })
    )
  }else if(filteredCountries.length === 1) {
    console.log(filteredCountries)
    return( 
      filteredCountries.map((country) => <Country key={country.name.common} country={country} apikey={apikey} setWeatherData={setWeatherData} weatherData={weatherData}/>
      )
    )
  }else {
    return(<p>No results</p>)
  }
}

function App() {
  const apikey = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchword] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [countryToShow, setCountryToShow] = useState('')
  const [weatherData, setWeatherData] = useState({})

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook,[])

  const inputHandleSearch = (event) => {
    setSearchword(event.target.value)
    setCountryToShow('')
    setIsShow(false)
  }

  const buttonHandleCountry = (countryName) => {
    setIsShow(true)
    setCountryToShow(countryName)
  }
  console.log(apikey)
  return (
    <div className="App">
        search for country <input value={searchWord} onChange={inputHandleSearch}/>
        <FilteredCountries 
        searchWord={searchWord} 
        countries={countries} 
        buttonHandleCountry={buttonHandleCountry} 
        isShow={isShow} 
        countryToShow={countryToShow}
        apikey={apikey}
        setWeatherData={setWeatherData}
        weatherData={weatherData}
        />
    </div>
  );
}

export default App;
