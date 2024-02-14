import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import FileUpload from "../fileupload/FileUpload";

function Institutions() {
  const [institutions, setInstitutions] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [selectedId, setSelectedId] = useState(null);
  const { formatMessage } = useIntl();

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const openUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const fetchInstitutions = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/institution",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    setInstitutions(response.data.data);
  };

  const onSubmit = async (data) => {
    if (selectedId) {
      await axios.put(
        `http://localhost:5000/api/admin/institution/${selectedId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } else {
      await axios.post("http://localhost:5000/api/admin/institution", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    }
    reset();
    setSelectedId(null);
    fetchInstitutions();
  };

  const editInstitution = (institution) => {
    setSelectedId(institution.id);
    reset(institution);
  };

  const deleteInstitution = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/institution/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    fetchInstitutions();
  };

  const handleFileUpload = async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/institution/${selectedId}/upload_logo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      closeUploadDialog();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return (
    <Box>
      {/* Formulário para criar/atualizar uma instituição */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={formatMessage({ id: "institution.name" })}
          {...register("name")}
          fullWidth
          margin="normal"
        />
        <TextField
          label={formatMessage({ id: "institution.document" })}
          {...register("document")}
          fullWidth
          margin="normal"
        />
        <TextField
          label={formatMessage({ id: "institution.password" })}
          type="password"
          {...register("password")}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {formatMessage({ id: "institution.submit" })}
        </Button>
      </form>

      {/* Lista de instituições */}
      {Array.isArray(institutions) && (
        <List>
          {institutions.map((institution) => (
            <ListItem key={institution.id}>
              <ListItemText
                primary={
                  <Typography variant="h6">{institution.name}</Typography>
                }
                secondary={institution.document}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label={formatMessage({ id: "institution.edit" })}
                  onClick={() => editInstitution(institution)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label={formatMessage({ id: "institution.delete" })}
                  onClick={() => deleteInstitution(institution.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="Upload"
                  onClick={openUploadDialog}
                >
                  <UploadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={uploadDialogOpen} onClose={closeUploadDialog}>
        <DialogTitle>
          {formatMessage({ id: "institution.upload_logo" })}
        </DialogTitle>
        <DialogContent>
          <FileUpload onFileUpload={handleFileUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadDialog} color="primary">
            {formatMessage({ id: "close" })}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Institutions;
