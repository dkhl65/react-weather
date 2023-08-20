import { useState } from "react";
import weatherapi from "../api/weatherapi";
import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationTitle, setLocationTitle] = useState("");

  const handleSearch = async (location) => {
    try {
      setErrorMessage("");
      setLocationTitle("");
      setLocationList([]);
      setLoading(true);
      const res = await weatherapi.get("search.json", {
        params: { q: location },
      });
      if (res.data.length === 1) {
        const { name, region, country } = res.data[0];
        setLocationTitle(`${name}, ${region && region + ", "}${country}`);
      } else if (res.data.length > 1) {
        setLocationList(res.data);
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
    setLocationTitle(`${name}, ${region && region + ", "}${country}`);
    setLocationList([]);
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
    </div>
  );
}

export default App;
