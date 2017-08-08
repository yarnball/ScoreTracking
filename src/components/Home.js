import React from "react";

import { pink400, pink600 } from "material-ui/styles/colors";
import TopBoxes from "./TopBoxes";
import MyScore from "./MyScore";
// import Graph from "./Graph";
// import Graph1 from "./Graph1";
// import Graph2 from "./Graph2";
// import Graph3 from "./Graph3";
// import Graph4 from "./Graph4";
// import Money from "material-ui/svg-icons/editor/attach-money";
// import ThumbUp from "material-ui/svg-icons/action/thumb-up";
import { scores } from "../config/dummyData.js";

import { Tabs, Tab } from "material-ui/Tabs";
import AddScore from "./AddScore";
import TextField from "material-ui/TextField";

import { List, ListItem } from "material-ui/List";
import ActionGrade from "material-ui/svg-icons/action/grade";
import AlertError from "material-ui/svg-icons/alert/error";

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
    console.log(x);
    const res = e.target.value;
    const games = this.state.scores
      .filter(x => x.player1 === res || x.player2 === res)
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
        console.log(playerName)
        return {
          player:playerName,
          win: win,
          playerScore: playerScore,
          opScore: opScore,
          date: x.date,
          opName: opName
        };
      });

    if (x === 1) {
      this.setState({ result: games, search: res }, () => {
        this.getTotals(1);
      });
    } else {
      this.setState({ result1: games, search1: res }, () => {
        this.getTotals(2);
      });
    }
  };

  getTotals = e => {
    const res = e === 1 ? this.state.result : this.state.result1;
    const win = Object.keys(res.filter(x => x.win === 1)).length;
    const draw = Object.keys(res.filter(x => x.win === 2)).length;
    const loss = Object.keys(res.filter(x => x.win === 3)).length;
    const winLoss = (win / (win + draw + loss) * 100).toFixed(2);
    const totalPts = res.reduce((a, b) => {
      return a + b.playerScore;
    }, 0);
    const array = {
      player:res.player,
      winLoss: winLoss,
      win: win,
      loss: loss,
      draw: draw,
      totalPts: totalPts
    };
    if (e === 1) {
      this.setState({ totals: array });
    } else {
      this.setState({ totals1: array });
    }
  };
  addNew = (e, item) => {
  console.log(item)
  this.setState({ 
    scores: this.state.scores.concat([item])
})
  };
  render() {
    console.log(this.state);
    const { search, search1, totals, totals1, result, result1 } = this.state;
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    };
    return (
      <div className="innerBody">
        <Tabs>
          <Tab label="My Score">
            <MyScore
              title="Find my Score"
              search={search}
              result={result}
              totals={totals}
              onSearchChange={this.onSearchChange(1)}
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
                  onSearchChange={this.onSearchChange(1)}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
                <MyScore
                  title="Player 2"
                  search={search1}
                  result={result1}
                  totals={totals1}
                  onSearchChange={this.onSearchChange(2)}
                />
              </div>
            </div>
          </Tab>
          <Tab label="Add Result">
            <AddScore addNew={this.addNew}/>
          </Tab>
        </Tabs>

        {/*

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15">
            <TopBoxes
              Icon={Money}
              title="Value"
              prefix="$"
              value={books.totalItems * 0.4}
              iconColor={pink600}
              boxColor={pink400}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <TopBoxes
              Icon={ThumbUp}
              title="Likes"
              value={books.totalItems * 0.25}
              iconColor={cyan600}
              boxColor={cyan400}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <TopBoxes
              Icon={Money}
              value={books.totalItems * 0.125}
              title="Transfers"
              iconColor={purple600}
              boxColor={purple400}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <TopBoxes
              Icon={Money}
              value={books.totalItems}
              title="New Members"
              iconColor={orange600}
              boxColor={orange400}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Graph iconColor={purple600} boxColor={purple500} />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Graph1 iconColor={pink600} boxColor={pink500} />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-md m-b-15">
            <Test
              data={books.items.slice(0, 6).map((x, index) => {
                return (
                  <div key={index}>
                    {x.volumeInfo.title}
                  </div>
                );
              })}
              title="Title"
              iconColor={pink600}
              boxColor={pink400}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-md m-b-15">
            <Test
              data={books.items.slice(0, 6).map((x, index) => {
                return (
                  <div key={index}>
                    {x.volumeInfo.publisher}
                  </div>
                );
              })}
              title="Publisher"
              iconColor={cyan600}
              boxColor={cyan400}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-md m-b-15">
            <Test
              title="ID"
              data={books.items.slice(0, 6).map((x, index) => {
                return (
                  <div key={index}>
                    {x.id}
                  </div>
                );
              })}
              iconColor={purple600}
              boxColor={purple500}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Graph2 iconColor={purple600} boxColor={purple500} />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Graph3 iconColor={purple600} boxColor={purple500} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15">
            <Graph4 color="hello" iconColor={purple600} boxColor={purple500} />
          </div>*/}
      </div>
    );
  }
}





// import React from "react";

// import {
//   pink400,
//   pink600,
// } from "material-ui/styles/colors";
// import TopBoxes from "./TopBoxes";
// import MyScore from "./MyScore";
// // import Graph from "./Graph";
// // import Graph1 from "./Graph1";
// // import Graph2 from "./Graph2";
// // import Graph3 from "./Graph3";
// // import Graph4 from "./Graph4";
// // import Money from "material-ui/svg-icons/editor/attach-money";
// // import ThumbUp from "material-ui/svg-icons/action/thumb-up";
// import { scores } from "../config/dummyData.js";

// import { Tabs, Tab } from "material-ui/Tabs";
// import AddScore from "./AddScore";
// import TextField from "material-ui/TextField";

// import {List, ListItem} from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import AlertError from 'material-ui/svg-icons/alert/error';

// export default class Home extends React.Component {
//   state = { playerSearch: '', result: '', totals:'', result1: '', totals1:'' };
//   onSearchChange = (x) => e => {
//     console.log(x)
//     const res = e.target.value
//       const games = scores
//         .filter(x => x.player1 === res || x.player2 === res)
//         .map((x) => {
//           const playerScore = x.player1 === res ? x.player1score : x.player2score;
//           const opScore = x.player2 === res ? x.player1score : x.player2score;
//           const opName = x.player2 === res ? x.player1 : x.player2;
//           const win = (playerScore > opScore && 1) || (playerScore === opScore && 2) || (playerScore < opScore && 3)
//           // 1 = win, 2 = draw, 3 = loss
//           return { win: win, playerScore: playerScore, opScore: opScore, date: x.date, opName:opName };
//         });

//     if (x===1) {
//     this.setState({ result: games }, () => {
//       this.getTotals(1);
//     });
//     } else {
//     this.setState({ result1: games }, () => {
//       this.getTotals(2);
//     });
//     }



//     // this.setState({ result: games }, () => {
//     //   this.getTotals();
//     // });
//     // console.log(games, res)
//   };

//   getTotals = e => {
//     const res = e === 1 ? this.state.result : this.state.result1;
//     const win = Object.keys(res.filter(x => x.win === 1)).length
//     const draw = Object.keys(res.filter(x => x.win === 2)).length
//     const loss = Object.keys(res.filter(x => x.win === 3)).length
//     const winLoss = (win/(win + draw + loss) * 100).toFixed(2)
//     const totalPts = res.reduce((a, b) => {return a + b.playerScore;}, 0)
//     const array = {winLoss:winLoss, win:win, loss:loss, draw:draw, totalPts:totalPts}
//     if (e===1) {
//     this.setState({ totals: array });
//     } else {
//     this.setState({ totals1: array });
//     }
//   };
//   render() {
//     console.log(this.state)
//     const {totals, totals1, result, result1} = this.state;
//     const styles = {
//       headline: {
//         fontSize: 24,
//         paddingTop: 16,
//         marginBottom: 12,
//         fontWeight: 400
//       }
//     };
//     return (

//       <div className="innerBody">
//         <Tabs>
//           <Tab label="My Score">
//             <MyScore result={result} totals={totals} onSearchChange={this.onSearchChange(1)}/>
//           </Tab>
//           <Tab label="Find A Match">
//             <div>
//               <h2 style={styles.headline}>Player VS</h2>
//               <TextField
//                 hintText="Player 1"
//                 name="test"
//                 fullWidth={true}
//               onChange={this.onSearchChange(1)}
//               />
//               <TextField
//                 hintText="Player 2"
//                 name="test"
//                 fullWidth={true}
//               onChange={this.onSearchChange(2)}
//               />
//             </div>
//             {result.length > 0 &&
//   <span>
//            <TopBoxes
//               title="Win Loss Rate"
//               symbol="%"
//               value={totals.winLoss}
//               iconColor={pink600}
//               boxColor={pink400}
//             />
//       {result.map((x, index) => {
//         const win = (x.win === 1 && <ActionGrade />) || (x.win > 1 && <AlertError/>)
//           return (
//     <List key={index}>
//       <ListItem primaryText={<div>Game versus <b>{x.opName}</b></div>} leftIcon={<div> {win}</div>} secondaryText={<div> Score {x.playerScore} : {x.opScore}</div>}/>
//     </List>

//           );
//         })}
//       </span>}

//             {result1.length > 0 &&
//   <span>
//            <TopBoxes
//               title="Win Loss Rate"
//               symbol="%"
//               value={totals1.winLoss}
//               iconColor={pink600}
//               boxColor={pink400}
//             />
//       {result1.map((x, index) => {
//         const win = (x.win === 1 && <ActionGrade />) || (x.win > 1 && <AlertError/>)
//           return (
//     <List key={index}>
//       <ListItem primaryText={<div>Game versus <b>{x.opName}</b></div>} leftIcon={<div> {win}</div>} secondaryText={<div> Score {x.playerScore} : {x.opScore}</div>}/>
//     </List>
//           );
//         })}
//       </span>}
//           </Tab>
//           <Tab label="Add game">

//             <AddScore data={scores} />
//           </Tab>
//         </Tabs>

//         {/*

//           <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15">
//             <TopBoxes
//               Icon={Money}
//               title="Value"
//               prefix="$"
//               value={books.totalItems * 0.4}
//               iconColor={pink600}
//               boxColor={pink400}
//             />
//           </div>
//           <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//             <TopBoxes
//               Icon={ThumbUp}
//               title="Likes"
//               value={books.totalItems * 0.25}
//               iconColor={cyan600}
//               boxColor={cyan400}
//             />
//           </div>
//           <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//             <TopBoxes
//               Icon={Money}
//               value={books.totalItems * 0.125}
//               title="Transfers"
//               iconColor={purple600}
//               boxColor={purple400}
//             />
//           </div>

//           <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//             <TopBoxes
//               Icon={Money}
//               value={books.totalItems}
//               title="New Members"
//               iconColor={orange600}
//               boxColor={orange400}
//             />
//           </div>

//           <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//             <Graph iconColor={purple600} boxColor={purple500} />
//           </div>
//           <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//             <Graph1 iconColor={pink600} boxColor={pink500} />
//           </div>

//           <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-md m-b-15">
//             <Test
//               data={books.items.slice(0, 6).map((x, index) => {
//                 return (
//                   <div key={index}>
//                     {x.volumeInfo.title}
//                   </div>
//                 );
//               })}
//               title="Title"
//               iconColor={pink600}
//               boxColor={pink400}
//             />
//           </div>
//           <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-md m-b-15">
//             <Test
//               data={books.items.slice(0, 6).map((x, index) => {
//                 return (
//                   <div key={index}>
//                     {x.volumeInfo.publisher}
//                   </div>
//                 );
//               })}
//               title="Publisher"
//               iconColor={cyan600}
//               boxColor={cyan400}
//             />
//           </div>

//           <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-md m-b-15">
//             <Test
//               title="ID"
//               data={books.items.slice(0, 6).map((x, index) => {
//                 return (
//                   <div key={index}>
//                     {x.id}
//                   </div>
//                 );
//               })}
//               iconColor={purple600}
//               boxColor={purple500}
//             />
//           </div>

//           <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//             <Graph2 iconColor={purple600} boxColor={purple500} />
//           </div>
//           <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//             <Graph3 iconColor={purple600} boxColor={purple500} />
//           </div>
//           <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15">
//             <Graph4 color="hello" iconColor={purple600} boxColor={purple500} />
//           </div>*/}
//       </div>
//     );
//   }
// }
