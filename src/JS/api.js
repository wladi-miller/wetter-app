const API_KEY = "185a664112a34176889150149261602";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export async function getCurrentWeather(city) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${city}&pollen=yes&lang=de&alerts=yes`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    alert("Fehler bei der Abfrage der Wetterdaten");
    return null;
  }

  return data;
}
