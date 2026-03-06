export function formatTemperature(temp) {
  return Math.floor(temp);
}

export function getHoursforecast(weatherData) {
  const allHours = weatherData.forecast.forecastday.flatMap((day) => day.hour);

  const now = new Date(weatherData.location.localtime);
  const currentHour = new Date(now);
  currentHour.setMinutes(0, 0, 0);

  return allHours
    .filter((hourData) => new Date(hourData.time) >= currentHour)
    .slice(0, 24);
}
