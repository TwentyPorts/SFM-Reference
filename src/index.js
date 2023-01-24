import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { gridData } from "./gridData";

function GridItem(props) {
  return (
    <Grid className="grid-container" item xs={3}>
      <div className="grid-item">
        <img alt="thumb" className="grid-item-image" src={props.image}></img>
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
    };
  }

  handleClick(i) {
    console.log("clicked grid item");
  }

  renderGridItem(i) {
    return (
      <GridItem
        tag={this.state.gridData[i].tag}
        image={this.state.gridData[i].image}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {this.renderGridItem(0)}
          {this.renderGridItem(1)}
          {this.renderGridItem(2)}
        </Grid>
      </Box>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GridView />);
