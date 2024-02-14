import axios from "axios";
import { API_URL } from "../config";

export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/admin/login`, data);
  localStorage.setItem("access_token", response.data.access_token);

  return response;
};

export const logout = async (data) => {
  const response = axios.delete(
    `${API_URL}/admin/logout`,
    data,
    getAuthHeaders()
  );
  localStorage.removeItem("access_token");

  return response;
};

export const me = async (data) => {
  await axios.get(`${API_URL}/admin/me`, data, getAuthHeaders());
};
