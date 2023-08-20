function CurrentWeather({ data, metric }) {
  if (!data?.uv) {
    // don't render if data is not populated
    return;
  }
  return (
    <>
      <img src={data.condition.icon} alt="weather icon" />
      <span className="ui huge header">
        {metric ? data.temp_c : data.temp_f}&deg;{metric ? "C" : "F"}
      </span>{" "}
      Feels like {metric ? data.feelslike_c : data.feelslike_f}
      <p>{data.condition.text}</p>
      <div className="ui grid">
        <div className="eight wide column">
          <h3>Wind</h3>
          {metric ? data.wind_kph + " km/h" : data.wind_mph + " mph"}{" "}
          {data.wind_dir} {data.wind_degree}&deg;
        </div>
        <div className="eight wide column">
          <h3>Wind Gust</h3>
          {metric ? data.gust_kph + " km/h" : data.gust_mph + " mph"}
        </div>
        <div className="eight wide column">
          <h3>Pressure</h3>
          {metric ? data.pressure_mb + " hPa" : data.pressure_in + " inHg"}
        </div>
        <div className="eight wide column">
          <h3>Precipitation</h3>
          {metric ? data.precip_mm + " mm" : data.precip_in + " in"}
        </div>
        <div className="eight wide column">
          <h3>Humidity</h3>
          {data.humidity}%
        </div>
        <div className="eight wide column">
          <h3>Cloud Cover</h3>
          {data.cloud}%
        </div>
        <div className="eight wide column">
          <h3>Visibility</h3>
          {metric ? data.vis_km + " km" : data.vis_miles + " miles"}
        </div>
        <div className="eight wide column">
          <h3>UV Index</h3>
          {data.uv}
        </div>
      </div>
      <div className="ui divider" />
      <p>Last updated at {data.last_updated} local time.</p>
    </>
  );
}

export default CurrentWeather;
