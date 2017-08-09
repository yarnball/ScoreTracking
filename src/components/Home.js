import React from "react";
import moment from "moment";
import { scores } from "../config/dummyData.js";

import AddScore from "./AddScore";
import MyScore from "./MyScore";
import { Tabs, Tab } from "material-ui/Tabs";

export default class Home extends React.Component {
  state = {
    scores:scores,
    search: "",
    search1: "",
    result: "",
    totals: "",
    result1: "",
    totals1: ""
  };
  onSearchChange = x => e => {
    const res = e.target.value;
    const games = this.state.scores
      .filter(x => x.player1 === res || x.player2 === res)
      .sort((a, b) => new Date(a.fullDate)/1000 -new Date(b.fullDate)/1000)
      .map(x => {
        const playerScore = x.player1 === res ? x.player1score : x.player2score;
        const opScore = x.player2 === res ? x.player1score : x.player2score;
        const opName = x.player2 === res ? x.player1 : x.player2;
        const playerName = x.player1 === res ? x.player1 : x.player2;
        const win =
          (playerScore > opScore && 1) ||
          (playerScore === opScore && 2) ||
          (playerScore < opScore && 3);
        // 1 = win, 2 = draw, 3 = loss
        return {
          win: win,
          player:playerName,
          playerScore: parseInt(playerScore,0),
          opScore: parseInt(opScore,0),
          opName: opName,
          fullDate: x.fullDate,
          shortDate:moment(x.fullDate).format('MM-YYYY')
        };
      });
    if (x === 'player1') {
      this.setState({ result: games, search: res }, () => {
        this.getTotals('player1');
      });
    } else {
      this.setState({ result1: games, search1: res }, () => {
        this.getTotals('player2');
      });
    }
  };

  getTotals = e => {
    const res = e === 'player1' ? this.state.result : this.state.result1;
    const win = Object.keys(res.filter(x => x.win === 1)).length;
    const draw = Object.keys(res.filter(x => x.win === 2)).length;
    const loss = Object.keys(res.filter(x => x.win === 3)).length;
    const winLoss = (win / (win + draw + loss) * 100).toFixed(2);
    const totalPts = res.reduce((a, b) => {
      return a + b.playerScore;
    }, 0);
    const array = {
      winLoss: winLoss,
      win: win,
      loss: loss,
      draw: draw,
      totalPts: totalPts
    };
    if (e === 'player1') {
      this.setState({ totals: array });
    } else {
      this.setState({ totals1: array });
    }
  };
  addNew = (e, item) => {
  this.setState({ 
    scores: this.state.scores.concat([item])
  })
  };

  render() {
    const { search, search1, totals, totals1, result, result1 } = this.state;
    return (
      <div className="innerBody">

        <Tabs>
          <Tab label="My Score">
            <MyScore
              title="Find my Score"
              search={search}
              result={result}
              totals={totals}
              onSearchChange={this.onSearchChange('player1')}
            />
          </Tab>
          <Tab label="Compare Scores">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
                <MyScore
                  title="Player 1"
                  search={search}
                  result={result}
                  totals={totals}
                  onSearchChange={this.onSearchChange('player1')}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
                <MyScore
                  title="Player 2"
                  search={search1}
                  result={result1}
                  totals={totals1}
                  onSearchChange={this.onSearchChange('player2')}
                />
              </div>
            </div>
          </Tab>
          <Tab label="Add Result">
            <AddScore addNew={this.addNew}/>
          </Tab>
        </Tabs>

      </div>
    );
  }
}