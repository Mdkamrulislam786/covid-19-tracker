import React, { useState, useEffect } from "react";
import "./App.css";
//Components
import InfoBox from "./Components/InfoBox/InfoBox";
import Map from "./Components/Map/Map";
//MATERIAL UI
import {Card, FormControl, MenuItem, Select, CardContent } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United Kingdom, United States
            value: country.countryInfo.iso2, //"UK","USA"...
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select
              varient="outlined"
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
        <div className="app_stats">
          <InfoBox title="CoronaVirus Cases" cases={129} total={1000} />
          <InfoBox title="Recovered" cases={129} total={1000} />
          <InfoBox title="Deaths" cases={129} total={1000} />
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <h3>WorldWide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
