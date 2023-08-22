import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { ENDPOINT } from "./constants";

const apiUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
    ? process.env.NEXT_PUBLIC_LOCAL_BASE_URL
    : process.env.NEXT_PUBLIC_LIVE_BASE_URL;

const httpInstance = axios.create({
  baseURL: apiUrl,
});

httpInstance.interceptors.request.use(
  async (config) => {
    let token = getCookie("token");
    if (token && isTokenExpired(token)) {
      const userId = getCookie("userId");
      const data = await axios.get(`${apiUrl}${ENDPOINT.GETTOKEN}/${userId}`);
      token = data.data.token;
      setCookie("token", token);
    }
    config.headers.Authorization = token;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

const isTokenExpired = (token: any) => {
  const decoded: any = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

export default httpInstance;
