import "./SubmitPage.scss";
import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    type: "light",
  },
});

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
      <ThemeProvider theme={theme}>
        <FormControl>
          <TextField
            id="submit-page-input-author"
            label="Author"
            value={formData.name}
            onChange={handleChange}
            sx={{ backgroundColor: "#ffffff" }}
          />
          <TextField
            id="submit-page-input-url"
            label="URL"
            value={formData.url}
            onChange={handleChange}
            sx={{ backgroundColor: "#ffffff" }}
          />
          <Button
            type="submit"
            className="submit-page-button"
          >
            Submit
          </Button>
        </FormControl>
      </ThemeProvider>
    </Grid>
  );
};

export default SubmitPage;
