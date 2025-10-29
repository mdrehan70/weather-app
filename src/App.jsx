import { useEffect, useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("Bokaro");
  const [bgimage, setBgimage] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          return toast.error("Failed to Fetch Weather!")
        }
        toast.success("Successfully Fetched the Weather!")
        const data = await res.json();
        setWeather(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [searchCity]);

  useEffect(() => {
    const images = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9", "bg10"];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBgimage(randomImage);
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading Weather Data...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      return;
    }
    setSearchCity(city);
    setCity("");
  };

  return (
    <>
      <div className={`main-container ${bgimage}`}>
        <div className="searchContainer">
          <div className="head">
            <h1>
              <img
                src="https://weatherapp-f.netlify.app/images/weather-icon.png"
                alt="image"
              />{" "}
              Weather App
            </h1>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={city}
              placeholder="Enter City Here..."
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Check</button>
          </form>
        </div>
        <div className="container">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed}m/s</p>
        </div>
        <div className="footer">
          <p className="footerPara" style={{ color: "skyblue" }}>
            Created By <strong>Md Rehan</strong> from
            <a href="https://github.com/mdrehan70" target="_blank" style={{ color: "white" }}> @Rehan Github</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
