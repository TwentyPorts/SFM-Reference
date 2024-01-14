import "./SubmitPage.scss";
import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const SubmitPage = () => {
  document.title = "Submit Images - SFM Reference";
  const [formData, setFormData] = React.useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
      className="submit-page"
    >
      <FormControl>
        <TextField
          id="submit-page-input-author"
          label="Author"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="submit-page-input-url"
          label="URL"
          value={formData.url}
          onChange={handleChange}
        />
      </FormControl>
    </Grid>
  );
};

export default SubmitPage;
