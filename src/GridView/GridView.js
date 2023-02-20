import * as React from "react";
import "./GridView.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { gridData } from "../gridData";
import { Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    info: {
      main: "#4d432f",
    },
  },
});

function GridItem(props) {
  return (
    <Grid className="grid-container" item xs="auto">
      <div className={"grid-item grid-item-" + props.tag.replace(/\s+/g, "")}>
        <img
          alt="thumb"
          className="grid-item-image"
          title={props.desc}
          src={props.image}
          onClick={props.onClick}
        ></img>
        <div className="grid-item-tag" onClick={props.onTagClick}>
          {props.tag}
        </div>
      </div>
    </Grid>
  );
}

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: gridData,
      navigateTo: null,
      categoryInfoMessage: null,
    };
  }

  // Navigate to carousel view for whichever category was clicked
  handleClick(i) {
    this.setState({ navigateTo: i });
  }

  // Show description message box for a category
  showCategoryInfo(tag, desc) {
    this.setState((prevState) => {
      return {
        ...prevState,
        categoryInfoMessage: (
          <Box display="flex" justifyContent="center" alignItems="center">
            <ThemeProvider theme={theme}>
              <Alert
                severity="info"
                variant="filled"
                sx={{ color: "white", width: "fit-content" }}
                onClose={() => {
                  this.setState((prevState) => {
                    return { ...prevState, categoryInfoMessage: null };
                  });
                }}
              >
                <AlertTitle>
                  <strong>Category: </strong>
                  {tag}
                </AlertTitle>
                <strong>Description: </strong>
                {desc}
              </Alert>
            </ThemeProvider>
          </Box>
        ),
      };
    });
  }

  // Render a single GridItem
  renderGridItem(category) {
    return (
      <GridItem
        tag={this.state.gridData[category].tag}
        image={this.state.gridData[category].image}
        desc={this.state.gridData[category].desc}
        onClick={() => this.handleClick(category)}
        onTagClick={() =>
          this.showCategoryInfo(
            this.state.gridData[category].tag,
            this.state.gridData[category].desc
          )
        }
      />
    );
  }

  render() {
    let { navigateTo } = this.state;

    let gridItemsArray = []; // grid items to be rendered
    for (const [key] of Object.entries(gridData)) {
      gridItemsArray.push(this.renderGridItem(key));
    }

    return (
      <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
        {this.state.categoryInfoMessage}

        <Grid container spacing={2} sx={{ p: 1 }}>
          {gridItemsArray.map((component, index) => (
            <React.Fragment key={index}>{component}</React.Fragment>
          ))}
        </Grid>

        {navigateTo != null && <Navigate to={"/Category/" + navigateTo} />}
      </Box>
    );
  }
}

export default GridView;
