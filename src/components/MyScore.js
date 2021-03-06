import React, { Component } from "react";
import { green300, green200 } from "material-ui/styles/colors";

import TextField from "material-ui/TextField";
import TopBoxes from "./TopBoxes";

import { List, ListItem } from "material-ui/List";
import ActionGrade from "material-ui/svg-icons/action/grade";
import AlertError from "material-ui/svg-icons/alert/error";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class MyScore extends Component {
  render() {
    const { result, totals, title, onSearchChange, search } = this.props;
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    };
    return (
      <div>
        <h2 style={styles.headline}>
          {title}
        </h2>
        <TextField
          hintText="Enter a name (try Keith, Charlie, Ian, Brian etc!)"
          name="test"
          value={search}
          fullWidth={true}
          onChange={onSearchChange}
        />

        {result.length > 0 &&
          <span>
            <LineChart
              width={350}
              height={300}
              data={result}
              margin={{ top: 5, left:-30, bottom: 5 }}
            >
              <XAxis dataKey="shortDate" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="opScore"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="opName"
                stroke="orange"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="playerScore" stroke="#82ca9d" />
            </LineChart>

            <TopBoxes
              title="Win Loss Rate"
              symbol="%"
              value={totals.winLoss}
              iconColor={green200}
              boxColor={green300}
            />
            {result.map((x, index) => {
              const win =
                (x.win === 1 && <ActionGrade />) ||
                (x.win > 1 && <AlertError />);
              return (
                <List key={index}>
                  <ListItem
                    primaryText={
                      <div>
                        Game versus <b>{x.opName}</b>
                      </div>
                    }
                    leftIcon={
                      <div>
                        {" "}{win}
                      </div>
                    }
                    secondaryText={
                      <div>
                        {" "}Score {x.playerScore} : {x.opScore}
                      </div>
                    }
                  />
                </List>
              );
            })}
          </span>}
      </div>
    );
  }
}
