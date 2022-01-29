import { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
 
} from "@mui/material";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import {sortData,prettyPrintStat} from "./utils"
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom ,setMapZoom] = useState(2);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState("cases");
  
  
  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/all"
     fetch(url)
    .then((response) => response.json())
    .then((data) => {
      
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) =>response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountries();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;


    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url).then(response => response.json()).then(data =>{
      setCountry(countryCode);
      setCountryInfo(data);
      // setMapCenter([data.countryInfo.lat ,data.countryInfo.long]);
      
      // setMapZoom(4);
      if(countryCode === "worldwide"){
        setMapCenter({ lat: 34.80746, long: -40.4796 });
        setMapZoom(2);
      }
      else{
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        console.log(data.countryInfo.long)
        setMapZoom(4);
      }

    })
  };
  //state is how to write a variable in react
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, ind) => (
                <MenuItem key={ind} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox 
           isRed
           active={casesType === "cases"}
          onClick={(e) => setCasesType("cases")}
           title="Coronavirus Cases"  todayData={prettyPrintStat(countryInfo.todayCases)} totalData={prettyPrintStat(countryInfo.cases)}/>
          
          <InfoBox 
           
           active={casesType === "recovered"}
          onClick={(e) => setCasesType("recovered")}
           title="Recovered"  todayData={prettyPrintStat(countryInfo.todayRecovered)} totalData={prettyPrintStat(countryInfo.recovered)}/>
          
          <InfoBox
          isRed
           active={casesType === "deaths"}
          
          onClick={(e) => setCasesType("deaths")}
           title="Deaths"  todayData={prettyPrintStat(countryInfo.todayDeaths)} totalData={prettyPrintStat(countryInfo.deaths)}/>
        </div>
         <Map casesType={casesType}
         countries={mapCountries}
         center={mapCenter}
         zoom={mapZoom} />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new {casesType}</h3>
          {/* <LineGraph casesType={casesType} /> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
