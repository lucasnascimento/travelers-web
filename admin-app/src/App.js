import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import BookingByItinerary from "./booking/BookingByItinerary";
import ItineraryList from "./itinerary/ItineraryList";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/itinerary" element={<ItineraryList />} />
          <Route
            path="/itinerary/:itinerary_id/booking"
            element={<BookingByItinerary />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
