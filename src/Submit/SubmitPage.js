import "./SubmitPage.scss";
import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { gridData } from "../gridData.js";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#a89368",
    },
  },
});

const SubmitPage = () => {
  document.title = "Submit Images - SFM Reference";
  const [formData, setFormData] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    // check for invalid url
    if (event.target.id.includes("url")) {
      try {
        const fccUrl = new URL(event.target.value);
        setErrorMessage("");
      } catch (e) {
        if (e instanceof TypeError) {
          setErrorMessage("Invalid URL");
        }
      }
    }
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
      <h1 className="submit-page-title">Submit your images to the website!</h1>
      <ThemeProvider theme={theme}>
        <FormControl>
          <TextField
            required
            id="submit-page-input-author"
            label="Author"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            id="submit-page-input-url"
            label="Source URL"
            value={formData.url}
            onChange={handleChange}
            error={errorMessage !== ""}
            helperText={errorMessage}
          />
          <label for="files">
            <Button>Select Image(s)</Button>
          </label>
          <input
            id="files"
            type="file"
            accept="image/png, image/jpeg"
            multiple={true}
            style={{ display: "none" }}
          />
          <Select
            value={formData.category}
            label="Category"
            onChange={handleChange}
          >
            {Object.keys(gridData).map((key) => (
              <MenuItem value={key}>{gridData[key].tag}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </FormControl>
      </ThemeProvider>
    </Grid>
  );
};

export default SubmitPage;
