import "./SubmitPage.scss";
import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
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
  const [formData, setFormData] = React.useState({
    author: "",
    url: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (event, property) => {
    setFormData({ ...formData, [property]: event.target.value });

    // check for invalid url
    if (event.target.id && event.target.id.includes("url")) {
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
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "80vh" }}
      className="submit-page"
    >
      <h1 className="submit-page-title">Submit your artwork to the website!</h1>
      <ThemeProvider theme={theme}>
        <FormControl>
          <div className="submit-page-form-container">
            <TextField
              required
              id="submit-page-input-author"
              label="Author"
              title="Name or username of the artist. List multiple authors separated by commas."
              value={formData.name}
              onChange={(e) => handleChange(e, "author")}
            />
            <TextField
              id="submit-page-input-url"
              label="Source URL"
              title="Direct link to the artwork (e.g. Twitter, Steam, Reddit). Include the https:// prefix."
              value={formData.url}
              onChange={(e) => handleChange(e, "url")}
              error={errorMessage !== ""}
              helperText={errorMessage}
            />
            <label htmlFor="files">
              <div className="submit-page-upload-image-container">
                <p className="submit-page-upload-image-text">
                  Select Image or Drag and Drop
                </p>
              </div>
            </label>
            <input
              required
              id="files"
              type="file"
              accept="image/png, image/jpeg"
              multiple={true}
              style={{ display: "none" }}
            />
            <TextField
              required
              select
              fullWidth
              id="submit-page-select"
              label="Category"
              title="Must fit into one existing category."
              defaultValue=""
              value={formData.category}
              onChange={(e) => handleChange(e, "category")}
            >
              {Object.values(gridData).map((value) => (
                <MenuItem key={value.tag} value={value.tag}>
                  {value.tag}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </FormControl>
      </ThemeProvider>
    </Grid>
  );
};

export default SubmitPage;
