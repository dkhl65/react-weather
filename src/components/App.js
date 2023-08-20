import { useState } from "react";
import weatherapi from "../api/weatherapi";
import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import CurrentWeather from "./CurrentWeather";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationTitle, setLocationTitle] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [metric, setMetric] = useState(true);
  const [tabNum, setTabNum] = useState(1);
  const SEGMENT = "ui bottom attached tab segment";

  const handleSearch = async (location) => {
    try {
      setCurrentData({});
      setErrorMessage("");
      setLocationTitle("");
      setLocationList([]);
      setLoading(true);
      const { data } = await weatherapi.get("search.json", {
        params: { q: location },
      });
      if (data.length === 1) {
        const { name, region, country } = data[0];
        setLocationTitle(`${name}, ${region && region + ", "}${country}`);
        getData(location);
      } else if (data.length > 1) {
        setLocationList(data);
        setLocationTitle("Click to choose one of these locations:");
      } else {
        setErrorMessage("No locations found.");
      }
    } catch (err) {
      setErrorMessage(err?.response?.data?.error?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (i) => {
    const { name, region, country } = locationList[i];
    const location = `${name}, ${region && region + ", "}${country}`;
    setLocationTitle(location);
    setLocationList([]);
    getData(location);
  };

  const getData = async (q) => {
    try {
      setLoading(true);
      const { data } = await weatherapi.get("forecast.json", { params: { q } });
      setCurrentData(data.current);
    } catch (err) {
      setErrorMessage(err?.response?.data?.error?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ui container">
      <h1>React Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {errorMessage && (
        <div className="ui negative message">
          <div className="header">{errorMessage}</div>
        </div>
      )}
      <h2 className="ui header">
        {(loading && "Loading...") || locationTitle}
      </h2>
      <LocationSelector
        locations={locationList}
        onSelect={handleLocationSelect}
      />
      <div className="ui form">
        <div className="inline fields">
          <label>Units:</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="units"
                checked={metric}
                onChange={() => setMetric(true)}
              />
              <label>Metric</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="units"
                checked={!metric}
                onChange={() => setMetric(false)}
              />
              <label>US Customary</label>
            </div>
          </div>
        </div>
      </div>
      <div className="ui top attached tabular menu">
        <div
          className={`item link ${tabNum === 1 && "active"}`}
          onClick={() => setTabNum(1)}
        >
          Current Weather
        </div>
        <div
          className={`item link ${tabNum === 2 && "active"}`}
          onClick={() => setTabNum(2)}
        >
          Forcast
        </div>
      </div>
      <div className={`${SEGMENT} ${tabNum === 1 && "active"}`}>
        <CurrentWeather data={currentData} metric={metric} />
      </div>
      <div className={`${SEGMENT} ${tabNum === 2 && "active"}`}></div>
    </div>
  );
}

export default App;
