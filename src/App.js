import React, { useState, useEffect } from "react";
import "./App.css";
import covid from "./img/COVID-19.png";
//Components
import InfoBox from "./Components/InfoBox/InfoBox";
import Map from "./Components/Map/Map";
import Table from "./Components/Table/Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./Components/LineGraph/LineGraph";

//MATERIAL UI
import {
  Card,
  FormControl,
  MenuItem,
  Select,
  CardContent,
} from "@material-ui/core";

//Leaflet
import "leaflet/dist/leaflet.css";

function App() {
  //Stats
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  //dark-mode-state
  const [darkMode, setDarkMode] = useState(getInitialMode());

  //leafletmap peops
  const [mapCenter, setMapCenter] = useState({ lat: 34.9076, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  //Default data for worldwide option
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //Runs the code inside when component is laoded/renderd& getting the countries(name&value) on option
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United Kingdom, United States
            value: country.countryInfo.iso2, //"UK","USA"...
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //For Dark Mode
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  //Get Initial Stae for DarkMode
  function getInitialMode() {
    const saved = JSON.parse(localStorage.getItem("dark"));
    return saved;
  }
  //Runs when selcting a country
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //All the data from coutry response
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className={`App ${darkMode && "dark-mode"}`}>
      <div className="app_left">
        <div className="app_header">
          <h1>
            <img src={covid} alt="covid-19" className="covid" />
            TRACKER
          </h1>
          {/* DARK-MODE BUUTTON*/}
          <div className="toogleBtn">
            <span className="toggle">
              <input
                checked={darkMode}
                onChange={() => setDarkMode((prevMode) => !prevMode)}
                type="checkBox"
                className="checkBox"
                id="checkBox"
              />
              <label htmlFor="checkBox">
                {!darkMode ? (
                  <i className="fas fa-sun" style={{ color: "yellow" }} />
                ) : (
                  <i className="fas fa-moon" style={{ color: "#faf2f8" }} />
                )}
              </label>
            </span>
          </div>
          {/* SELECT */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        {/* STATS */}
        <div className="app_stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            title="CoronaVirus Cases"
            isRed
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            darkMode={darkMode}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            darkMode={darkMode}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            isRed
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.deaths)}
            darkMode={darkMode}
          />
        </div>
        {/* MAP */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      {/* //APP-RIGHT */}
      <Card className={`app_right ${darkMode && "app_right--dark"}`}>
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table darkMode={darkMode} countries={tableData} />

          <h3 className="app__graphTitle">WorldWide New {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
