import "./App.css";
import "antd/dist/antd.variable.min.css";
import getApi from "./utils/apiHandler";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CardInfo } from "./components/CardInfo";
import { TableData } from "./components/TableData";
import { MapData } from "./components/MapData";

function App() {
  const [worldData, setWorldData] = useState();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [mapCenter, setMapCenter] = useState({
    lat: 20,
    long: 31,
    zoom: 2,
    caseType: "cases",
  });

  useEffect(() => {
    const getData = async () => {
      const worldData = await getApi("https://corona.lmao.ninja/v2/all");
      setCountry(worldData);
      setWorldData(worldData);
      setCountries(
        await getApi("https://corona.lmao.ninja/v2/countries?yesterday=true")
      );
    };
    getData();
  }, []);

  function changeCountry(id) {
    if (id === "worldwide") {
      setCountry(worldData);
      setMapCenter({ lat: 20, long: 31, zoom: 2, caseType: "cases" });
      return;
    }
    const filterCountry = countries.filter(
      (country) => country.countryInfo._id === id
    )[0];
    setCountry(filterCountry);
    setMapCenter({
      lat: filterCountry.countryInfo.lat,
      long: filterCountry.countryInfo.long,
      zoom: 4,
      caseType: "cases",
    });
  }

  return (
    <div className="app">
      <div className="left">
        <Header countries={countries} onChange={changeCountry} />
        <div className="cards">
          <CardInfo
            title="Corona Cases"
            cases={country.todayCases}
            total={country.cases}
            active={mapCenter.caseType === "cases"}
            onClick={() => setMapCenter({ ...mapCenter, caseType: "cases" })}
          />
          <CardInfo
            title="Recovered"
            cases={country.todayRecovered}
            total={country.recovered}
            active={mapCenter.caseType === "recovered"}
            onClick={() =>
              setMapCenter({ ...mapCenter, caseType: "recovered" })
            }
          />
          <CardInfo
            title="Deaths"
            cases={country.todayDeaths}
            total={country.deaths}
            active={mapCenter.caseType === "deaths"}
            onClick={() => setMapCenter({ ...mapCenter, caseType: "deaths" })}
          />
        </div>
        <MapData countries={countries} mapCenter={mapCenter} />
      </div>
      <TableData countries={countries} />
    </div>
  );
}

export default App;
