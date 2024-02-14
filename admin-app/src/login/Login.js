import { Box, Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        data
      );
      localStorage.setItem("access_token", response.data.access_token);
      setMessage(formatMessage({ id: "login.success" }));
      navigate("/itinerary"); // Navega para a página de roteiros após o login bem-sucedido
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
