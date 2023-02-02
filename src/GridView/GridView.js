import * as React from "react";
import "./GridView.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { gridData } from "../gridData";
import { Navigate } from 'react-router-dom';

function GridItem(props) {
  return (
    <Grid className="grid-container" item xs='auto'>
      <div className="grid-item" onClick={props.onClick}>
        <img alt="thumb" className="grid-item-image" title={props.desc} src={props.image}></img>
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
      navigateTo: null
    };
  }

  // Navigate to carousel view for whichever category was clicked
  handleClick(i) {
    this.setState({navigateTo: i});
  }

  // Render a single GridItem
  renderGridItem(i) {
    return (
      <GridItem
        tag={this.state.gridData[i].tag}
        image={this.state.gridData[i].image}
        desc={this.state.gridData[i].desc}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let { navigateTo } = this.state;
    return (
      <Box sx={{ flexGrow: 1, marginTop: '10px' }}>
        <Grid container spacing={2} sx={{ p: 1 }}>
          {this.renderGridItem(0)}
          {this.renderGridItem(1)}
          {this.renderGridItem(2)}
          {this.renderGridItem(3)}
          {this.renderGridItem(4)}
          {this.renderGridItem(5)}
          {this.renderGridItem(6)}
          {this.renderGridItem(7)}
          {this.renderGridItem(8)}
          {this.renderGridItem(9)}
        </Grid>

        {navigateTo!=null && (
          <Navigate to={"/"+navigateTo} />
        )}
      </Box>
    );
  }
}

export default GridView;