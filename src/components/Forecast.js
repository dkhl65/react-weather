import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function Forecast({ data, metric }) {
  if (!data?.length) {
    return;
  }

  const rowData = data.map((entry) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayNum = new Date(entry.date).getDay();
    return {
      date: `${entry.date.substr(5, 5)} ${daysOfWeek[dayNum]}`,
      condition: entry.day.condition.text,
      high: metric ? entry.day.maxtemp_c : entry.day.maxtemp_f,
      low: metric ? entry.day.mintemp_c : entry.day.mintemp_f,
      wind: metric ? entry.day.maxwind_kph : entry.day.maxwind_mph,
      precipitation: metric
        ? entry.day.totalprecip_mm
        : entry.day.totalprecip_in,
      visibility: metric ? entry.day.avgvis_km : entry.day.avgvis_miles,
      uv: entry.day.uv,
    };
  });

  const columnDefs = [
    { field: "date", width: 110 },
    { field: "condition" },
    { field: "high", headerName: `High (°${metric ? "C" : "F"})`, width: 95 },
    { field: "low", headerName: `Low (°${metric ? "C" : "F"})`, width: 95 },
    {
      field: "wind",
      headerName: `Wind (${metric ? "km/h" : "mph"})`,
      width: 115,
    },
    {
      field: "precipitation",
      headerName: `Precipitation (${metric ? "mm" : "in"})`,
      width: 160,
    },
    {
      field: "visibility",
      headerName: `Visibility (${metric ? "km" : "miles"})`,
      width: 125,
    },
    { field: "uv", headerName: "UV Index" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 650 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}

export default Forecast;
