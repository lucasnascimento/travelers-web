import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { fetchBookingByItinerary } from "../services/booking";

const BookingByItinerary = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterField, setFilterField] = useState("traveler_name");
  const [sortColumn, setSortColumn] = useState("traveler_name");
  const [sortDirection, setSortDirection] = useState("asc");
  const { itinerary_id } = useParams();
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchBookingByItinerary(itinerary_id, filter).then((data) =>
      setBookings(data)
    );
  }, [itinerary_id, filter]);

  useEffect(() => {
    setFilter("");
  }, [filterField]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event) => {
    setFilterField(event.target.value);
  };

  const handleSort = (column) => {
    const newSortDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newSortDirection);
  };

  const filteredAndSortedBookings = [...bookings]
    .filter((booking) =>
      booking[filterField].toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

  const statusValues = [...new Set(bookings.map((booking) => booking.status))];

  return (
    <Container>
      <Typography variant="h2">
        {formatMessage({ id: "booking_by_itinerary.booking" })}
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="filter-field-label">Filter Field</InputLabel>
            <Select
              labelId="filter-field-label"
              value={filterField}
              onChange={handleFilterFieldChange}
            >
              <MenuItem value="traveler_name">
                {formatMessage({ id: "booking_by_itinerary.traveler" })}
              </MenuItem>
              <MenuItem value="payer_name">
                {formatMessage({ id: "booking_by_itinerary.payer" })}
              </MenuItem>
              <MenuItem value="status">
                {formatMessage({ id: "booking_by_itinerary.invoice_status" })}
              </MenuItem>
              {/* ... repeat for each field ... */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {filterField === "status" ? (
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Status Filter</InputLabel>
              <Select
                labelId="status-filter-label"
                value={filter}
                onChange={handleFilterChange}
              >
                {statusValues.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              label="Filter"
              value={filter}
              onChange={handleFilterChange}
              fullWidth
            />
          )}
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                {formatMessage({ id: "booking_by_itinerary.traveler" })}
              </TableCell>
              <TableCell colSpan={4}>
                {formatMessage({ id: "booking_by_itinerary.payer" })}
              </TableCell>
              <TableCell colSpan={4}>
                {formatMessage({ id: "booking_by_itinerary.invoice" })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "traveler_name"}
                  direction={sortDirection}
                  onClick={() => handleSort("traveler_name")}
                ></TableSortLabel>
                {formatMessage({ id: "booking_by_itinerary.traveler_name" })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.traveler_gender" })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "booking_by_itinerary.traveler_birthdate",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.total_cents" })}
              </TableCell>
              <TableCell>
                {formatMessage({
                  id: "booking_by_itinerary.traveler_document",
                })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.payer_name" })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.payer_phone" })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.payer_email" })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.payer_document" })}
              </TableCell>
              <TableCell>
                {formatMessage({ id: "booking_by_itinerary.invoice_status" })}
              </TableCell>
              <TableCell>{formatMessage({ id: "#" })}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.traveler_name}</TableCell>
                <TableCell>{booking.traveler_gender}</TableCell>
                <TableCell>
                  {booking?.traveler_birthdate
                    ? new Date(booking.traveler_birthdate).toLocaleDateString(
                        "pt-BR"
                      )
                    : ""}
                </TableCell>
                <TableCell>
                  {(booking.total_cents / 100).toLocaleString(undefined, {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {booking.traveler_extras["document-number"]}
                </TableCell>
                <TableCell>{booking.payer_name}</TableCell>
                <TableCell>{booking.payer_phone}</TableCell>
                <TableCell>{booking.payer_email}</TableCell>
                <TableCell>{booking.payer_document}</TableCell>
                <TableCell>{formatMessage({ id: booking.status })} </TableCell>
                <TableCell>{booking.invoice_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BookingByItinerary;
