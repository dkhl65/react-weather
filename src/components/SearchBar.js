import { useState } from "react";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const detectLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const detectedLocation = `${position.coords.latitude}, ${position.coords.longitude}`;
        setErrorMessage("");
        setLocation(detectedLocation);
        if (typeof onSearch === "function") {
          onSearch(detectedLocation);
        }
      },
      (err) => {
        setErrorMessage(err.message);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() && typeof onSearch === "function") {
      onSearch(location.trim());
    }
  };

  return (
    <div className="search-bar ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Enter a city name, decimal latitude and longitude, postal code or IP
            address
          </label>
          <input
            type="text"
            className="ui input"
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button className="ui button primary">Go</button>
        <button className="ui button" type="button" onClick={detectLocation}>
          Detect Location
        </button>
        {errorMessage && (
          <div className="ui negative message">
            <i className="close icon" onClick={() => setErrorMessage("")} />
            <div className="header">{errorMessage}</div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
