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

export function dayLabel(dateString, localtime) {
  const today = localtime.slice(0, 10);

  if (dateString === today) {
    return "Heute";
  }

  return new Date(dateString).toLocaleDateString("de-DE", { weekday: "long" });
}
