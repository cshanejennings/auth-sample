import http from "axios";

export const AUTH_KEY = "AUTH_KEY";

let baseURL = "http://laravel.dev.io/api";
if (process.env.NODE_ENV === "production") {
  // swap api for production server
  // baseURL = "https://api-service.itviec.phucngo.dev/api/v1/";
}

let headers = {
  ContentType: "application/json"
};

try {
  const loginData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
  console.log(loginData);
  if (loginData) {
    headers["Authorization"] = `Bearer ${loginData.access_token}`;
  }
} catch (err) {
  sessionStorage.removeItem(AUTH_KEY);
}

export default http.create({ baseURL, headers });
