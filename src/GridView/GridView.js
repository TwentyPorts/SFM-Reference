import * as React from "react";
import "./GridView.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { gridData } from "../gridData";
import { Navigate } from "react-router-dom";

function GridItem(props) {
  return (
    <Grid className="grid-container" item xs="auto">
      <div className="grid-item" onClick={props.onClick}>
        <img
          alt="thumb"
          className="grid-item-image"
          title={props.desc}
          src={props.image}
        ></img>
        <div className="grid-item-tag">{props.tag}</div>
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
    };
  }

  // Navigate to carousel view for whichever category was clicked
  handleClick(i) {
    this.setState({ navigateTo: i });
  }

  // Render a single GridItem
  renderGridItem(category) {
    return (
      <GridItem
        tag={this.state.gridData[category].tag}
        image={this.state.gridData[category].image}
        desc={this.state.gridData[category].desc}
        onClick={() => this.handleClick(category)}
      />
    );
  }

  render() {
    let { navigateTo } = this.state;

    //let numItems = Object.keys(gridData.length);
    let gridItemsArray = []; // grid items to be rendered
    for (const [key] of Object.entries(gridData)) {
      gridItemsArray.push(this.renderGridItem(key));
    }

    return (
      <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
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
