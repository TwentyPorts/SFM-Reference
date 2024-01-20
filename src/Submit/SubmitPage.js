import "./SubmitPage.scss";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { gridData } from "../gridData.js";

import firebaseApp from "../Firebase.js";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Cloud Firestore
const storage = getStorage(firebaseApp);
const auth = getAuth();
signInWithEmailAndPassword(
  auth,
  process.env.REACT_APP_EMAIL,
  process.env.REACT_APP_PASSWORD
);

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
  const [formData, setFormData] = useState({
    author: "",
    url: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [dragEntered, setDragEntered] = useState(false);

  const handleChange = (event, property) => {
    setFormData({ ...formData, [property]: event.target.value });

    // check for invalid url
    if (event.target.id && event.target.id.includes("url")) {
      try {
        new URL(event.target.value);
        setErrorMessage("");
      } catch (e) {
        if (e instanceof TypeError) {
          setErrorMessage("Invalid URL");
        }
      }
    }
  };

  const handleImageUpload = (event) => {
    setUploadedImage(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setDragEntered(false);
    setUploadedImage(event.dataTransfer.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (uploadedImage == null) {
      alert("Don't forget to upload an image!");
      return;
    }

    const storageRef = ref(storage, `/files/${uploadedImage.name}`);
    const metadata = {
      customMetadata: {
        author: formData.author,
        url: formData.url,
        category: formData.category,
      },
    };
    const uploadTask = uploadBytesResumable(
      storageRef,
      uploadedImage,
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setUploadPercent(percent);
      },
      (err) => console.log(err)
    );
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
      <h1 className="submit-page-title">
        Submit* your artwork to the website!
      </h1>
      <ThemeProvider theme={theme}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl>
            <div className="submit-page-form-container">
              <label htmlFor="files">
                <div
                  className="submit-page-upload-image-container"
                  style={{
                    backgroundColor: dragEntered ? "#333" : "transparent",
                  }}
                  onDrop={(e) => handleFileDrop(e)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={() => setDragEntered(true)}
                  onDragLeave={() => setDragEntered(false)}
                >
                  {uploadedImage ? (
                    <img
                      alt="thumbnail"
                      src={URL.createObjectURL(uploadedImage)}
                      className="submit-page-upload-image-thumbnail"
                    />
                  ) : (
                    <p className="submit-page-upload-image-text">
                      Select Image or Drag and Drop
                    </p>
                  )}
                </div>
              </label>
              <input
                id="files"
                type="file"
                accept="image/png, image/jpeg"
                multiple={true}
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e)}
              />
              {uploadPercent > 0 && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadPercent}
                    color={uploadPercent !== 100 ? "primary" : "success"}
                  />
                </Box>
              )}
              <TextField
                required
                fullWidth
                id="submit-page-input-author"
                label="Author"
                title="Name or username of the artist. List multiple authors separated by commas."
                value={formData.name}
                onChange={(e) => handleChange(e, "author")}
              />
              <TextField
                fullWidth
                id="submit-page-input-url"
                label="Source URL"
                title="Direct link to the artwork (e.g. Twitter, Steam, Reddit). Include the https:// prefix."
                value={formData.url}
                onChange={(e) => handleChange(e, "url")}
                error={errorMessage !== ""}
                helperText={errorMessage}
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
              {uploadPercent !== 100 ? (
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              ) : (
                <Button variant="contained" disabled>
                  Submit
                </Button>
              )}
              {uploadPercent === 100 && (
                <div className="submit-page-submitted">
                  <p className="submit-page-submitted-text">
                    Submitted! Thank you!
                  </p>
                  <Button
                    variant="outlined"
                    onClick={() => window.location.reload()}
                  >
                    Click to Refresh
                  </Button>
                </div>
              )}
            </div>
          </FormControl>
        </form>
      </ThemeProvider>
      <Divider
        flexItem
        variant="middle"
        sx={{
          alignSelf: "auto",
          width: "50%",
          mt: "1.5em",
          bgcolor: "rgb(50, 50, 50)",
        }}
      />
      <h5 className="submit-page-subtitle">
        *All submissions will be manually reviewed and only added if they
        clearly fit into an existing category on the website, are safe for work,
        and are sufficiently high quality, though specifics will vary.
        <br />
        <br />
        This is solely intended to maintain a subjective level of quality on SFM
        Reference. If you would like feedback on your pieces, the SFM Discord or
        r/SFM are good places to start.
      </h5>
    </Grid>
  );
};

export default SubmitPage;
