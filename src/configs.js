const config = {
  // apiUrl: "http://localhost:8080",
  apiUrl: window.localStorage.getItem("apiUrl") || "http://localhost:8080",
  // apiUrl: process.env.API_URL || 'https://tt-api-eu.herokuapp.com',
};
export default config;
