import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { performLogin } from "../services/auth";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const onSubmit = async (data) => {
    try {
      performLogin(data);
      setMessage(formatMessage({ id: "login.success" }));
      navigate("/itinerary");
    } catch (error) {
      setMessage(formatMessage({ id: "login.failed" }));
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={<FormattedMessage id="username" />}
          {...register("username")}
          fullWidth
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="password" />}
          type="password"
          {...register("password")}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          <FormattedMessage id="login" />
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
}

export default LoginForm;
