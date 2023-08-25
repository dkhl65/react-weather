function CurrentWeather({ data, metric }) {
  if (!data?.uv) {
    return;
  }

  const headers = [
    ["compass", "Wind"],
    ["tachometer alternate", "Wind Gust"],
    ["weight", "Air Pressure"],
    ["umbrella", "Precipitation"],
    ["tint", "Humidity"],
    ["cloud", "Cloud Cover"],
    ["eye", "Visibility"],
    ["sun", "UV Index"],
  ];
  const values = [
    <>
      {metric ? data.wind_kph + " km/h" : data.wind_mph + " mph"}{" "}
      {data.wind_dir} {data.wind_degree}&deg;
    </>,
    metric ? data.gust_kph + " km/h" : data.gust_mph + " mph",
    metric ? data.pressure_mb + " hPa" : data.pressure_in + " inHg",
    metric ? data.precip_mm + " mm" : data.precip_in + " in",
    data.humidity + "%",
    data.cloud + "%",
    metric ? data.vis_km + " km" : data.vis_miles + " miles",
    data.uv,
  ];

  return (
    <>
      <img src={"https:" + data.condition.icon} alt="weather icon" />
      <span className="ui huge header">
        {metric ? data.temp_c : data.temp_f}&deg;{metric ? "C" : "F"}
      </span>{" "}
      Feels like {metric ? data.feelslike_c : data.feelslike_f}
      <p>{data.condition.text}</p>
      <div className="ui grid">
        {headers.map((header, i) => (
          <div key={i} className="eight wide column">
            <h3>
              <i className={header[0] + " icon"} /> {header[1]}
            </h3>
            {values[i]}
          </div>
        ))}
      </div>
      <div className="ui divider" />
      <p>Last updated at {data.last_updated} local time.</p>
    </>
  );
}

export default CurrentWeather;
