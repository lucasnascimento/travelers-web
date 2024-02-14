// React component
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { fetchItineraries } from "../services/itinerary";

function ItineraryList() {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  useEffect(() => {
    const getItineraries = async () => {
      try {
        const data = await fetchItineraries();
        setItineraries(data);
      } catch (err) {
        console.error(err);
      }
    };

    getItineraries();
  }, []);

  const handleBookingClick = (itineraryId) => {
    navigate(`/itinerary/${itineraryId}/booking`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1">
        {formatMessage({ id: "itinerary.itinerary" })}
      </Typography>
      <List>
        {itineraries.map((itinerary) => (
          <ListItem key={itinerary.id}>
            <ListItemText
              primary={itinerary.title}
              secondary={itinerary.institution.name}
            />
            <ListItemText
              primary={new Date(itinerary.boarding_date).toLocaleDateString(
                "pt-BR"
              )}
              secondary={formatMessage({ id: "itinerary.boarding_date" })}
            />
            <ListItemText
              primary={new Date(itinerary.landing_date).toLocaleDateString(
                "pt-BR"
              )}
              secondary={formatMessage({ id: "itinerary.landing_date" })}
            />
            <ListItemText
              primary={itinerary.seats}
              secondary={formatMessage({ id: "itinerary.seats" })}
            />
            <ListItemText
              primary={(itinerary.seat_price / 100).toLocaleString(undefined, {
                style: "currency",
                currency: "BRL",
              })}
              secondary={formatMessage({ id: "itinerary.seat_price" })}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBookingClick(itinerary.id)}
            >
              {formatMessage({ id: "itinerary.see_booking" })}
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ItineraryList;
