import axios from "axios";
import { API_URL } from "./config";

import { getAuthHeaders } from "./auth";

export const fetchInstitutions = async () => {
  const response = await axios.get(
    `${API_URL}/admin/institution`,
    getAuthHeaders()
  );
  return response.data.data;
};

export const createInstitution = async (data) => {
  await axios.post(`${API_URL}/admin/institution`, data, getAuthHeaders());
};

export const updateInstitution = async (id, data) => {
  await axios.put(`${API_URL}/admin/institution/${id}`, data, getAuthHeaders());
};

export const deleteInstitution = async (id) => {
  await axios.delete(`${API_URL}/admin/institution/${id}`, getAuthHeaders());
};
