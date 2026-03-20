function getFavoriteCitiesKey() {
  return "favoriteCities";
}

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

  return new Date(dateString).toLocaleDateString("de-DE", { weekday: "short" });
}

export function formatTime24(timeString) {
  const date = new Date(`1970-01-01 ${timeString}`);
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function getFavoriteCities() {
  const key = getFavoriteCitiesKey();
  const stored = localStorage.getItem(key);

  if (!stored) {
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid favorite cities");
    }
    
    const validIds = parsed.filter(item => typeof item === 'number' || !isNaN(Number(item)));
    if (validIds.length !== parsed.length) {
      localStorage.setItem(key, JSON.stringify(validIds));
    }
    return validIds.map(id => String(id));
  } catch {
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
}

export function addFavoriteCity(cityId) {
  if (!cityId) return false;
  const idStr = String(cityId).trim();

  const favoriteCities = getFavoriteCities();
  const exists = favoriteCities.some((favorite) => favorite === idStr);

  if (exists) {
    return false;
  }

  const key = getFavoriteCitiesKey();
  localStorage.setItem(key, JSON.stringify([...favoriteCities, idStr]));
  return true;
}

export function removeFavoriteCity(cityId) {
  if (!cityId) return false;
  const idStr = String(cityId).trim();

  const favoriteCities = getFavoriteCities();
  const filtered = favoriteCities.filter((favorite) => favorite !== idStr);

  if (filtered.length === favoriteCities.length) {
    return false;
  }

  const key = getFavoriteCitiesKey();
  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
}
