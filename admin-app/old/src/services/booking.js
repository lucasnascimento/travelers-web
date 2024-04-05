import axios from "axios";
import { API_URL } from "../config";

import { getAuthHeaders } from "./auth";

export const fetchBookingByItinerary = async (itinerary_id) => {
  const response = await axios.get(
    `${API_URL}/admin/itinerary/${itinerary_id}/booking`,
    getAuthHeaders()
  );
  return response.data.data;
};
