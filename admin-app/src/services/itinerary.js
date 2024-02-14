import axios from "axios";
import { API_URL } from "../config";

import { getAuthHeaders } from "./auth";

export const fetchItineraries = async () => {
  const response = await axios.get(
    `${API_URL}/admin/itinerary`,
    getAuthHeaders()
  );
  return response.data.data;
};
