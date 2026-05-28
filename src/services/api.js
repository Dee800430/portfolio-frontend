import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "http://localhost:8080/api";
const TOKEN_KEY = "portfolio_auth_token";

const API = axios.create({
  baseURL: API_BASE_URL,
});

const loginAPI = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const authAPI = axios.create({
  baseURL: API_BASE_URL,
  
});

export const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token, remember = false) => {
  if (typeof window === "undefined" || !token) {
    return;
  }

  const storage = remember ? localStorage : sessionStorage;
  const otherStorage = remember ? sessionStorage : localStorage;

  storage.setItem(TOKEN_KEY, token);
  otherStorage.removeItem(TOKEN_KEY);
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  delete authAPI.defaults.headers.common.Authorization;
};

const getTokenFromResponse = (data) => {
  if (typeof data === "string") {
    return data;
  }

  return data?.token || data?.accessToken || data?.jwt || "";
};

authAPI.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
    }

    return Promise.reject(error);
  }
);

export const login = async (credentials, remember = false) => {
  const response = await loginAPI.post("/auth/login", credentials);
  const token = getTokenFromResponse(response.data);

  if (!token) {
    throw new Error("Login response did not include a token.");
  }

  setAuthToken(token, remember);
  return token;
};

export const register = async (userData) => {
  return await loginAPI.post("/auth/register", userData);
};

export default API;
