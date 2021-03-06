import React, { Component } from "react";
import { typography } from "material-ui/styles";
import { white } from "material-ui/styles/colors";
import Paper from "material-ui/Paper";

export default class Home extends Component {
  render() {
    const { title, value, iconColor, boxColor, symbol } = this.props;
    const styles = {
      content: {
        padding: "5px 10px",
        marginLeft: 80,
        height: 60,
        backgroundColor: boxColor
      },
      text: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        lineHeight: 1.7,
        color: white
      },
      number: {
        display: "block",
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        lineHeight: 1.5,
        color: white
      },
      iconSpan: {
        float: "left",
        height: 70,
        width: 80,
        textAlign: "center",
        backgroundColor: iconColor
      },
    };
    return (
      <Paper>
        <span style={styles.iconSpan} />

        <div style={styles.content}>
          <span style={styles.text}>
            {title}
          </span>
          <span style={styles.number}>
            {value}
            {symbol &&
              <span style={styles.symbol}>
                {" "}{symbol}
              </span>}
          </span>
        </div>
      </Paper>
    );
  }
}
