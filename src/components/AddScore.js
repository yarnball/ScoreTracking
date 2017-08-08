import React from "react";

import TextField from "material-ui/TextField";
import { typography } from "material-ui/styles";

import RaisedButton from "material-ui/RaisedButton";

import moment from "moment";

import { scores } from "../config/dummyData.js";


const styles = {
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  }
};

class AddScore extends React.Component {
  state = {
    player1: "",
    player2: "",
    player1Score: "",
    player2Score: "",
    date: moment().format()
  };
  render() {
    const {addNew} = this.props;
    console.log(this.state)
    return (
      <div className="row">
        
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">

          <h3 style={styles.title}> Names</h3>
          <TextField
            hintText="Your name"
            name="test"
            onChange={e => this.setState({ player1: e.target.value })}
          />
          <br />
          <TextField
            hintText="Opponent name"
            onChange={e => this.setState({ player2: e.target.value })}
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <h3 style={styles.title}> Score</h3>
          <TextField
            type="number"
            hintText="Your score"
            onChange={e => this.setState({ player1Score: e.target.value })}
          />
          <br />
          <TextField
            type="number"
            hintText="Opponent score"
            onChange={e => this.setState({ player2Score: e.target.value })}
          />
        </div>
        <RaisedButton primary={true} label="Submit scores!" fullWidth={true} onClick={e => addNew(e, this.state)}/>

      </div>
    );
  }
}

export default AddScore;
