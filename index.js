
import readline from 'readline';
import { getWeatherData } from './controllers/weather.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter city names separated by commas: ', async (input) => {
  const cities = input.split(',').map(city => city.trim());

  const weatherResults = await Promise.all(cities.map(getWeatherData));

  // Display side-by-side table
  console.log("\nWeather Summary:");
  console.log("---------------------------------------------------------------");
  console.log("City".padEnd(13) + "| Temperature (°C) | Condition");
  console.log("---------------------------------------------------------------");

  for (const result of weatherResults) {
    if (result.error) {
      console.log(`${result.city.padEnd(13)}| Error: ${result.error}`);
    } else {
      console.log(
        `${result.city.padEnd(13)}| ${String(result.temperature).padEnd(17)}| ${result.condition}`
      );
    }
  }

  console.log("---------------------------------------------------------------");
  rl.close();
});
// import express from "express";
// import readline from "readline";
// import { getWeather } from "./controllers/weather.js"; 

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter a city name: ", (city) => {
//   getWeather(city);
//   rl.close();
// });




// async function getWeatherForCity(city) {
//   try {
//     // Step 1: Get latitude and longitude from Open-Meteo Geocoding API
//     const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
//     const geoRes = await fetch(geoUrl);

//     if (!geoRes.ok) {
//       throw new Error("Failed to fetch coordinates.");
//     }

//     const geoData = await geoRes.json();

//     if (!geoData.results || geoData.results.length === 0) {
//       throw new Error("City not found.");
//     }

//     const { latitude, longitude } = geoData.results[0];

//     // Step 2: Fetch current weather using coordinates
//     const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
//     const weatherRes = await fetch(weatherUrl);

//     if (!weatherRes.ok) {
//       throw new Error("Failed to fetch weather data.");
//     }

//     const weatherData = await weatherRes.json();
//     const weather = weatherData.current_weather;

//     const weatherDescription = getWeatherDescription(weather.weathercode);

//     return {
//       city: city,
//       temperature: weather.temperature,
//       weather_description: weatherDescription
//     };

//   } catch (error) {
//     return { error: error.message };
//   }
// }

// // Helper function to map weather codes to descriptions
// function getWeatherDescription(code) {
//   const descriptions = {
//     0: "Clear sky",
//     1: "Mainly clear",
//     2: "Partly cloudy",
//     3: "Overcast",
//     45: "Fog",
//     48: "Depositing rime fog",
//     51: "Light drizzle",
//     53: "Moderate drizzle",
//     55: "Dense drizzle",
//     61: "Slight rain",
//     63: "Moderate rain",
//     65: "Heavy rain",
//     71: "Slight snow",
//     73: "Moderate snow",
//     75: "Heavy snow",
//     95: "Thunderstorm"
//   };
//   return descriptions[code] || "Unknown weather";
// }

// // async function getWeatherForCity(city) {
// //   try {
// //     if (!city || typeof city !== 'string') {
// //       throw new Error("Please provide a valid city name.");
// //     }

// //     // Step 1: Get latitude and longitude from city name
// //     const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    
// //     if (!geoResponse.ok) {
// //       throw new Error("Failed to fetch geolocation data.");
// //     }

// //     const geoData = await geoResponse.json();

// //     if (!geoData.results || geoData.results.length === 0) {
// //       throw new Error("City not found.");
// //     }

// //     const { name, latitude, longitude } = geoData.results[0];

// //     // Step 2: Get weather data using the coordinates
// //     const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    
// //     if (!weatherResponse.ok) {
// //       throw new Error("Failed to fetch weather data.");
// //     }

// //     const weatherData = await weatherResponse.json();
// //     const { temperature, weathercode } = weatherData.current_weather;

// //     // Optional: Translate weather code to description
// //     const weatherDescriptions = {
// //       0: "Clear sky",
// //       1: "Mainly clear",
// //       2: "Partly cloudy",
// //       3: "Overcast",
// //       45: "Fog",
// //       48: "Depositing rime fog",
// //       51: "Light drizzle",
// //       53: "Moderate drizzle",
// //       55: "Dense drizzle",
// //       61: "Slight rain",
// //       63: "Moderate rain",
// //       65: "Heavy rain",
// //       71: "Slight snow",
// //       73: "Moderate snow",
// //       75: "Heavy snow",
// //       95: "Thunderstorm",
// //       // Add more codes if needed
// //     };

// //     const description = weatherDescriptions[weathercode] || "Unknown weather";

// //     return {
// //       city: name,
// //       temperature: `${temperature}°C`,
// //       description: description
// //     };

// //   } catch (error) {
// //     return { error: error.message };
// //   }
// // }
// // getWeatherForCity("Accra").then(result => {
// //   console.log(result);
// // });



// // const app = express();

// // let port = process.env.PORT || 1000
// //  app.listen(port, () => {
// //       console.log(`Server running on Port ${port}`);
// //     });


// // Create interface to get input from user
// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // });

// // // Get city name from user
// // rl.question('Enter a city name: ', async (city) => {
// //   try {
// //     // Step 1: Get coordinates from city name
// //     const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
// //     const geoData = await geoRes.json();

// //     if (!geoData.results || geoData.results.length === 0) {
// //       console.log('City not found.');
// //       rl.close();
// //       return;
// //     }

// //     const { latitude, longitude } = geoData.results[0];

// //     // Step 2: Get weather using coordinates
// //     const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
// //     const weatherData = await weatherRes.json();

// //     const temperature = weatherData.current_weather?.temperature;

// //     console.log(`The current temperature in ${city} is ${temperature}°C.`);
// //   } catch (error) {
// //     console.error('Error fetching weather data:', error.message);
// //   } finally {
// //     rl.close();
// //   }
// // });
