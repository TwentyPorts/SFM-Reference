import * as React from "react";
import "./GridView.scss";
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
  function restoreOriginalDimensions(e) {
    e.target.removeAttribute("width");
    e.target.removeAttribute("height");
  }
  return (
    <Grid className="grid-container" item xs="auto">
      <div className={"grid-item grid-item-" + props.tag.replace(/\s+/g, "")}>
        <img
          alt={"thumbnail for category " + props.tag}
          className="grid-item-image"
          title={props.desc}
          src={props.image}
          onClick={props.onClick}
          onLoad={restoreOriginalDimensions}
          height={window.innerWidth <= 600 ? "100px" : "200px"}
          width={window.innerWidth <= 600 ? "100px" : "200px"}
        ></img>
        <div className="grid-item-tag">
          <span className="grid-item-tag-text" onClick={props.onTagClick}>{props.tag}</span>
        </div>
      </div>
    </Grid>
  );
}

type gridState = {
  gridData: Object,
  navigateTo: string | null,
  categoryInfoMessage: React.ReactNode | null,
};

class GridView extends React.Component<{}, gridState> {
  constructor(props) {
    super(props);
    this.state = {
      gridData: gridData,
      navigateTo: null,
      categoryInfoMessage: null,
    };
  }

  // Navigate to carousel view for whichever category was clicked
  handleClick(i: string) {
    this.setState({ navigateTo: i });
  }

  // Show description message box for a category
  showCategoryInfo(e: React.MouseEvent<HTMLElement>, tag: string, desc: string) {
    e.stopPropagation();
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
  renderGridItem(category: string) {
    return (
      <GridItem
        tag={this.state.gridData[category].tag}
        image={this.state.gridData[category].image}
        desc={this.state.gridData[category].desc}
        onClick={() => this.handleClick(category)}
        onTagClick={(e: React.MouseEvent<HTMLElement>) =>
          this.showCategoryInfo(
            e,
            this.state.gridData[category].tag,
            this.state.gridData[category].desc
          )
        }
      />
    );
  }

  render() {
    let { navigateTo } = this.state;

    let gridItemsArray: React.ReactNode[] = []; // grid items to be rendered
    for (const [key] of Object.entries(gridData)) {
      gridItemsArray.push(this.renderGridItem(key));
    }

    return (
      <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
        {this.state.categoryInfoMessage}

        <Grid
          container
          spacing={2}
          sx={{ p: 1 }}
          justifyContent="center"
        >
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
