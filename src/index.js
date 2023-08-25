import ReactDOM from "react-dom/client";
import App from "./components/App";
import axios from "axios";

axios
  .get("https://ipapi.co/json/")
  .then((res) => {
    axios
      .post("https://visitortracker.vercel.app/", {
        ipaddr: res.data.ip,
        website: "danielweather",
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
