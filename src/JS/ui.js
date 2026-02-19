export function renderWeatherCard(data) {
  const card = document.createElement("div");
  card.className = "card";

  const weather = document.createElement("div");
  weather.className = "weather";

  const temp = document.createElement("div");
  temp.className = "temp";
  temp.textContent = `${data.current.temp_c}°C`;

  const feelsLike = document.createElement("div");
  feelsLike.className = "muted";
  feelsLike.textContent = `Gefühlt: ${data.current.feelslike_c}°C`;

  weather.appendChild(temp);
  weather.appendChild(feelsLike);

  card.appendChild(weather);

  return card;
}
