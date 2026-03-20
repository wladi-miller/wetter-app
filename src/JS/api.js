const API_KEY = "185a664112a34176889150149261602";
const FORECAST_URL = "http://api.weatherapi.com/v1/forecast.json";
const SEARCH_URL = "http://api.weatherapi.com/v1/search.json";

export async function getWeatherForecast(city, days = 3) {
  const url = `${FORECAST_URL}?key=${API_KEY}&q=${city}&days=${days}&lang=de&alerts=yes`;
  const response = await fetch(url);
  const weatherData = await response.json();

  if (!response.ok || weatherData.error) {
    alert("Fehler bei der Abfrage der Wettervorhersage");
    return null;
  }

  return weatherData;
}

export async function cityIDSought(query) {
  const url = `${SEARCH_URL}?key=${API_KEY}&q=${query}&lang=de`;
  const response = await fetch(url);
  const searchResults = await response.json();
  if (!response.ok) {
    alert("Fehler bei der Suche nach Städten");
    return [];
  }
  return searchResults;
}
