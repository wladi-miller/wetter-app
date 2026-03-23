const API_KEY = "185a664112a34176889150149261602";
const FORECAST_URL = "https://api.weatherapi.com/v1/forecast.json";
const SEARCH_URL = "https://api.weatherapi.com/v1/search.json";

export async function getWeatherForecast(city, days = 3) {
  try {
    const safeDays = Math.min(10, Math.max(1, Number(days) || 3));
    const safeCity = encodeURIComponent(String(city ?? "").trim());
    const url = `${FORECAST_URL}?key=${API_KEY}&q=${safeCity}&days=${safeDays}&lang=de&alerts=yes`;

    const response = await fetch(url);
    const weatherData = await response.json();

    if (!response.ok || weatherData.error) {
      alert("Fehler bei der Abfrage der Wettervorhersage");
      return null;
    }

    return weatherData;
  } catch {
    alert("Fehler bei der Abfrage der Wettervorhersage");
    return null;
  }
}

export async function cityIDSought(query) {
  try {
    const safeQuery = encodeURIComponent(String(query ?? "").trim());
    const url = `${SEARCH_URL}?key=${API_KEY}&q=${safeQuery}&lang=de`;

    const response = await fetch(url);
    const searchResults = await response.json();

    if (!response.ok) {
      alert("Fehler bei der Suche nach Städten");
      return [];
    }

    return searchResults;
  } catch {
    alert("Fehler bei der Suche nach Städten");
    return [];
  }
}
