
import https from "https";

// Define fetchJson here
export function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Failed to parse response"));
          }
        } else {
          reject(new Error("API request failed"));
        }
      });
    }).on("error", (err) => {
      reject(new Error("Network error: " + err.message));
    });
  });
}

// // Map weather codes to text
export function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
  };
  return descriptions[code] || "Unknown weather";
}

export async function getWeatherData(city) {
     try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoData = await fetchJson(geoUrl);

    if (
      !geoData.results ||
      geoData.results.length === 0 ||
      geoData.results[0].name.toLowerCase() !== city.toLowerCase()
    ) {
      return { city, error: "City not found." };
    }

    const { latitude, longitude } = geoData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherData = await fetchJson(weatherUrl);

    const current = weatherData.current_weather;
    const description = getWeatherDescription(current.weathercode);

    return {
      city,
      temperature: current.temperature,
      condition: description,
    };
  } catch (err) {
    return { city, error: "Error: " + err.message };
  }
//   try {
//     const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
//     const geoData = await fetchJson(geoUrl);

//     if (!geoData.results || geoData.results.length === 0) {
//       return { city, error: "City not found" };
//     }

//     const { latitude, longitude } = geoData.results[0];
//     const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
//     const weatherData = await fetchJson(weatherUrl);

//     const current = weatherData.current_weather;
//     const description = getWeatherDescription(current.weathercode);

//     return {
//       city,
//       temperature: current.temperature,
//       condition: description,
//     };
//   } catch (err) {
//     return { city, error: err.message };
//   }
}


/**
 * Fetches and displays the current weather for a given city using the Open-Meteo APIs.
 *
 * This function performs the following steps:
 * 1. Uses the Open-Meteo Geocoding API to get the latitude and longitude of the city.
 * 2. Uses the Open-Meteo Forecast API to get the current weather for those coordinates.
 * 3. Maps the weather code to a human-readable description.
 * 4. Logs the temperature and condition to the console.
 *
 * @async
 * @function getWeather
 * @param {string} city - The name of the city to fetch weather data for. Must be a valid city name.
 * @returns {Promise<void>} - A promise that resolves when the weather data is successfully retrieved and logged.
 *
 * @example
 * // Example usage:
 * getWeather("Accra");
 *
 * // Console output:
 * // Weather for Accra:
 * // --------------------
 * // Temperature: 29°C
 * // Condition: Partly cloudy
 */


// // Helper to fetch JSON
// export function fetchJson(url) {
//   return new Promise((resolve, reject) => {
//     https.get(url, (res) => {
//       let data = "";

//       res.on("data", (chunk) => (data += chunk));
//       res.on("end", () => {
//         if (res.statusCode >= 200 && res.statusCode < 300) {
//           try {
//             resolve(JSON.parse(data));
//           } catch {
//             reject(new Error("Failed to parse response"));
//           }
//         } else {
//           reject(new Error("API request failed"));
//         }
//       });
//     }).on("error", (err) => {
//       reject(new Error("Network error: " + err.message));
//     });
//   });
// }


// // Main logic function
// export async function getWeather(city) {
//   try {
//     const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
//     const geoData = await fetchJson(geoUrl);

//     if (!geoData.results || geoData.results.length === 0) {
//       console.log("City not found.");
//       return;
//     }

//     const { latitude, longitude } = geoData.results[0];
//     const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
//     const weatherData = await fetchJson(weatherUrl);

//     const current = weatherData.current_weather;
//     const description = getWeatherDescription(current.weathercode);

//     console.log(`\nWeather for ${city}:\n--------------------`);
//     console.log(`Temperature: ${current.temperature}°C`);
//     console.log(`Condition: ${description}`);
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }
