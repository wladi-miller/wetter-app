const API_KEY = "185a664112a34176889150149261602";
const CURRENT_URL = "http://api.weatherapi.com/v1/current.json";
const FORECAST_URL = "http://api.weatherapi.com/v1/forecast.json";

export async function getWeatherCurrent(city, days = 3) {
  const url = `${FORECAST_URL}?key=${API_KEY}&q=${city}&days=${days}&pollen=yes&lang=de&alerts=yes`;
  const response = await fetch(url);
  const weatherData = await response.json();

  if (!response.ok || weatherData.error) {
    alert("Fehler bei der Abfrage der Wettervorhersage");
    return null;
  }

  return weatherData;
}
