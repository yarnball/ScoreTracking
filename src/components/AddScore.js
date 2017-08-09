import React from "react";
import moment from "moment";

import TextField from "material-ui/TextField";
import { typography } from "material-ui/styles";

import RaisedButton from "material-ui/RaisedButton";

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
    player1score: "",
    player2score: "",
    fulldate: moment().format(),
    confirmed: false,
  };
  onChange = x => e => {
    if (x === "player1")
      this.setState({ player1: e.target.value.toLowerCase() }, () => {
        this.checkValid();
      });
    if (x === "player2")
      this.setState({ player2: e.target.value.toLowerCase() }, () => {
        this.checkValid();
      });
    if (x === "player1score")
      this.setState({ player1score: e.target.value }, () => {
        this.checkValid();
      });
    if (x === "player2score")
      this.setState({ player2score: e.target.value }, () => {
        this.checkValid();
      });
  };
  checkValid = e => {
    const { player1, player2, player1score, player2score } = this.state;
    if (player1 && player2 && player1score.toString().length > 0 && player2score.toString().length > 0) { this.setState({ confirmed: true }); } 
    else { this.setState({ confirmed: false }); }; };
  now = e => {
    this.setState({ player1: "", player2: "", player1score: "", player2score: "", fulldate: moment().format(), confirmed: false });
  };
  render() {
    const { addNew } = this.props;
    const {
      confirmed,
      player1,
      player2,
      player1score,
      player2score
    } = this.state;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <h3 style={styles.title}> Names</h3>
          <TextField
            hintText="Your name"
            value={player1}
            onChange={this.onChange("player1")}
          />
          <br />
          <TextField
            hintText="Opponent name"
            value={player2}
            onChange={this.onChange("player2")}
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <h3 style={styles.title}> Score</h3>
          <TextField
            type="number"
            value={player1score}
            hintText="Your score"
            onChange={this.onChange("player1score")}
          />
          <br />
          <TextField
            type="number"
            value={player2score}
            hintText="Opponent score"
            onChange={this.onChange("player2score")}
          />
        </div>
        <RaisedButton
          primary={true}
          label="Submit scores!"
          disabled={!confirmed}
          fullWidth={true}
          // onClick={e => addNew(e, this.state), this.now}
          onClick={e => {
            addNew(e, this.state);
            this.now();
          }}
        />
      </div>
    );
  }
}

export default AddScore;