import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function Forecast({ data, metric }) {
  const [day, setDay] = useState(0);
  const [hourView, setHourView] = useState(false);
  if (!data?.length) {
    return;
  }
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayRowData = data.map(({ date, day }) => {
    const dayNum = new Date(date).getDay();
    return {
      date: `${date.substr(5, 5)} ${daysOfWeek[dayNum]}`,
      condition: day.condition.text,
      high: metric ? day.maxtemp_c : day.maxtemp_f,
      low: metric ? day.mintemp_c : day.mintemp_f,
      wind: metric ? day.maxwind_kph : day.maxwind_mph,
      precipitation: metric ? day.totalprecip_mm : day.totalprecip_in,
      visibility: metric ? day.avgvis_km : day.avgvis_miles,
      uv: day.uv,
    };
  });
  const hourRowData = data[day].hour.map((entry) => {
    return {
      time: entry.time.substr(11, 5),
      condition: entry.condition.text,
      temperature: metric ? entry.temp_c : entry.temp_f,
      feelslike: metric ? entry.feelslike_c : entry.feelslike_f,
      humidity: entry.humidity,
      dewpoint: metric ? entry.dewpoint_c : entry.dewpoint_f,
      cloud: entry.cloud,
      winds: `${metric ? entry.wind_kph + " km/h" : entry.wind_mph + " mph"} ${
        entry.wind_dir
      } ${entry.wind_degree}°`,
      gust: metric ? entry.gust_kph : entry.gust_mph,
      pressure: metric ? entry.pressure_mb : entry.pressure_in,
      precipitation: metric ? entry.precip_mm : entry.precip_in,
      visibility: metric ? entry.vis_km : entry.vis_miles,
      uv: entry.uv,
    };
  });

  const dayColumnDefs = [
    { field: "date", width: 110 },
    { field: "condition" },
    {
      field: "high",
      headerName: `High (°${metric ? "C" : "F"})`,
      width: 95,
    },
    {
      field: "low",
      headerName: `Low (°${metric ? "C" : "F"})`,
      width: 95,
    },
    {
      field: "wind",
      headerName: `Wind (${metric ? "km/h" : "mph"})`,
      width: 120,
    },
    {
      field: "precipitation",
      headerName: `Precipitation (${metric ? "mm" : "in"})`,
      width: 160,
    },
    {
      field: "visibility",
      headerName: `Visibility (${metric ? "km" : "miles"})`,
      width: 135,
    },
    { field: "uv", headerName: "UV Index", width: 160 },
  ];
  const hourColumnDefs = [
    { field: "time", width: 75 },
    { field: "condition" },
    {
      field: "temperature",
      headerName: `Temp (°${metric ? "C" : "F"})`,
      width: 100,
    },
    {
      field: "feelslike",
      headerName: `Feels Like (°${metric ? "C" : "F"})`,
      width: 125,
    },
    { field: "humidity", headerName: "Humidity (%)", width: 120 },
    {
      field: "dewpoint",
      headerName: `Dewpoint (°${metric ? "C" : "F"})`,
      width: 125,
    },
    { field: "cloud", headerName: "Cloud Cover (%)", width: 140 },
    {
      field: "winds",
      width: 200,
    },
    {
      field: "gust",
      headerName: `Gust (${metric ? "km/h" : "mph"})`,
      width: 115,
    },
    {
      field: "pressure",
      headerName: `Pressure (${metric ? "hPa" : "inHg"})`,
      width: 135,
    },
    {
      field: "precipitation",
      headerName: `Precipitation (${metric ? "mm" : "in"})`,
      width: 155,
    },
    {
      field: "visibility",
      headerName: `Visibility (${metric ? "km" : "miles"})`,
      width: 135,
    },
    { field: "uv", headerName: "UV Index", width: 100 },
  ];

  const handleDayClicked = (e) => {
    if (!hourView) {
      setDay(e.rowIndex);
      setHourView(true);
    }
  };

  return (
    <>
      {hourView && (
        <p>
          <button className="ui icon button" onClick={() => setHourView(false)}>
            <i className="left arrow icon" />
          </button>
          <span className="ui header medium">
            {data[day].date.substr(5, 5)}{" "}
            {daysOfWeek[new Date(data[day].date).getDay()]}
          </span>
        </p>
      )}
      <div className="ag-theme-alpine" style={{ height: hourView ? 600 : 650 }}>
        <AgGridReact
          gridOptions={{
            suppressCellFocus: true,
            enableCellTextSelection: true,
          }}
          onCellClicked={handleDayClicked}
          defaultColDef={{ resizable: true }}
          rowData={hourView ? hourRowData : dayRowData}
          columnDefs={hourView ? hourColumnDefs : dayColumnDefs}
        />
      </div>
    </>
  );
}

export default Forecast;
