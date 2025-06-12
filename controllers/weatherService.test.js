import { getWeather, getWeatherDescription } from "./weather.js"

// Mock fetch function
const mockFetch = jest.fn();

describe("getWeather", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  test("returns weather data for valid city", async () => {
    // Mock geocoding response
    mockFetch.mockResolvedValueOnce({
      results: [{ latitude: 10, longitude: 20 }]
    });
    // Mock weather response
    mockFetch.mockResolvedValueOnce({
      current_weather: { temperature: 25, weathercode: 0 }
    });

    const result = await getWeather("Accra", mockFetch);
    expect(result).toEqual({
      city: "Accra",
      temperature: 25,
      weather: "Clear sky"
    });
  });

  test("throws error for invalid city", async () => {
    mockFetch.mockResolvedValueOnce({ results: [] });

    await expect(getWeather("XyzNoCity", mockFetch))
      .rejects
      .toThrow("City not found.");
  });

  test("throws error for empty city", async () => {
    await expect(getWeather("", mockFetch))
      .rejects
      .toThrow("Please enter a valid city name.");
  });

  test("handles API failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API failed"));

    await expect(getWeather("Accra", mockFetch))
      .rejects
      .toThrow("API failed");
  });

  test("handles unknown weather code", async () => {
    mockFetch.mockResolvedValueOnce({
      results: [{ latitude: 0, longitude: 0 }]
    });
    mockFetch.mockResolvedValueOnce({
      current_weather: { temperature: 22, weathercode: 999 }
    });

    const result = await getWeather("Accra", mockFetch);
    expect(result.weather).toBe("Unknown weather");
  });
});
