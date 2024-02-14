import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useIntl } from "react-intl";

function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const { formatMessage } = useIntl();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Chame a função de callback passada como prop
    onFileUpload(formData);
  };

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <TextField
            type="file"
            onChange={handleFileChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            {formatMessage({ id: "upload" })}
          </Button>
        </Grid>
      </Grid>
      {previewSource && (
        <Box marginTop={2}>
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        </Box>
      )}
    </Box>
  );
}

export default FileUpload;
