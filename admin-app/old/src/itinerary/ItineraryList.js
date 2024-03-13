// React component
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
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
      {itineraries.map((itinerary) => (
        <Card key={itinerary.id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {itinerary.title}
            </Typography>
            <Typography color="textSecondary">
              {itinerary.institution.name}
            </Typography>
            <Typography>
              {new Date(itinerary.boarding_date).toLocaleDateString("pt-BR")}
              {formatMessage({ id: "itinerary.boarding_date" })}
            </Typography>
            <Typography>
              {new Date(itinerary.landing_date).toLocaleDateString("pt-BR")}
              {formatMessage({ id: "itinerary.landing_date" })}
            </Typography>
            <Typography>
              {itinerary.seats}
              {formatMessage({ id: "itinerary.seats" })}
            </Typography>
            <Typography>
              {(itinerary.seat_price/1).toLocaleString(undefined, {
                style: "currency",
                currency: "BRL",
              })}
              {formatMessage({ id: "itinerary.seat_price" })}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBookingClick(itinerary.id)}
            >
              {formatMessage({ id: "itinerary.see_booking" })}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default ItineraryList;
