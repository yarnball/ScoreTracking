import React from "react";

import TextField from "material-ui/TextField";
import { typography } from "material-ui/styles";

import RaisedButton from "material-ui/RaisedButton";

import moment from "moment";

const styles = {
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  }
};

class AddScore extends React.Component {
  state = {
    player1: '',
    player2: '',
    player1score: '',
    player2score: '',
    fulldate: moment().format(),
    confirmed:false
  }
  render() {
    const { addNew } = this.props;
    const {confirmed} = this.state;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <h3 style={styles.title}> Names</h3>
          <TextField
            hintText="Your name"
            name="test"
            onChange={e =>
              this.setState({ player1: e.target.value.toLowerCase() })}
          />
          <br />
          <TextField
            hintText="Opponent name"
            onChange={e =>
              this.setState({ player2: e.target.value.toLowerCase() })}
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <h3 style={styles.title}> Score</h3>
          <TextField
            type="number"
            hintText="Your score"
            onChange={e =>
              this.setState({ player1score: parseInt(e.target.value, 1)})}
          />
          <br />
          <TextField
            type="number"
            hintText="Opponent score"
            onChange={e =>
              this.setState({ player2score: parseInt(e.target.value, 1)})}
          />
        </div>
        <RaisedButton label="These results are correct" primary={true} disabled={confirmed} onClick={e => this.setState({ confirmed: true})}/>
        <RaisedButton
          primary={true}
          label="Submit scores!"
          disabled={!confirmed}
          fullWidth={true}
          onClick={e => addNew(e, this.state)}
        />
      </div>
    );
  }
}

export default AddScore;

// import React from "react";

// import TextField from "material-ui/TextField";
// import { typography } from "material-ui/styles";

// import {
//   Step,
//   Stepper,
//   StepLabel,
// } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';

// import Divider from 'material-ui/Divider';
// import Paper from 'material-ui/Paper';

// import moment from "moment";

// const styles = {
//   title: {
//     fontSize: 24,
//     fontWeight: typography.fontWeightLight,
//     marginBottom: 20
//   }
// };

// class AddScore extends React.Component {
//   state = {
//     player1: '',
//     player2: '',
//     player1score: '',
//     player2score: '',
//     date: moment().format(),
//     finished: false,
//     stepIndex: 0,
//   };
//  handleNext = () => {
//     const {stepIndex} = this.state;
//     this.setState({
//       stepIndex: stepIndex + 1,
//       finished: stepIndex >= 2,
//     });
//   };

//   handlePrev = () => {
//     const {stepIndex} = this.state;
//     if (stepIndex > 0) {
//       this.setState({stepIndex: stepIndex - 1});
//     }
//   };
//   getStepContent(stepIndex) {
//     switch (stepIndex) {
//       case 0:
//         return   <Player/>;
//       case 1:
//         return <Opponent/>;
//       case 2:
//         return <Confirm res={this.state}/>;
//       default:
//         return 'default case';
//     }
//   }

//   render() {
//     const {finished, stepIndex} = this.state;
//     const contentStyle = {margin: '0 16px'};
//     console.log(this.state)
//     return (
//       <div style={{width: '100%', maxWidth: 700, margin: 'auto', paddingTop:20}}>
//         <Stepper activeStep={stepIndex}>
//           <Step>
//             <StepLabel>Your Name & Score</StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>Oppoent Name & Score</StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>Submit</StepLabel>
//           </Step>
//         </Stepper>
//         <div style={contentStyle}>
//           {finished ? (
//             <p>
//               <a href="#" onClick={(event) => { event.preventDefault(); this.setState({stepIndex: 0, finished: false});}}>
//                 Click here
//               </a> to reset the example.
//             </p>
//           ) : (
//             <div>
//               <div>{this.getStepContent(stepIndex)}</div>
//               <div style={{marginTop: 12}}>
//                 <FlatButton
//                   label="Back"
//                   disabled={stepIndex === 0}
//                   onTouchTap={this.handlePrev}
//                   style={{marginRight: 12}}
//                 />
//                 <RaisedButton
//                   label={stepIndex === 2 ? 'Finish' : 'Next'}
//                   primary={true}
//                   onTouchTap={this.handleNext}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// class Player extends React.Component {
//   render() {
//     return (
//       <div><TextField
//             hintText="Your name"
//             name="test"
//             onChange={e =>
//               this.setState({ player1: e.target.value.toLowerCase() })}
//           /><br/>
//                     <TextField
//             type="number"
//             hintText="Your score"
//             onChange={e =>
//               this.setState({ player1score: parseInt(e.target.value)})}
//           /></div>
//     );
//   }
// }

// class Opponent extends React.Component {
//   render() {
//     return (
//       <div><TextField
//             hintText="Opponent name"
//             name="test"
//             onChange={e =>
//               this.setState({ player2: e.target.value.toLowerCase() })}
//           /><br/>
//                     <TextField
//             type="number"
//             hintText="Opponent score"
//             onChange={e =>
//               this.setState({ player2score: parseInt(e.target.value)})}
//           /></div>
//     );
//   }
// }

// class Confirm extends React.Component {
//   render() {
//     const style = {
//   marginLeft: 20,
// };
//     const {res} = this.props;
//     return (
//       <div>
//       {res.map((x, index) => {
//               return (
//                     <Paper key={index} zDepth={2}>
//       <TextField hintText={<div> Player 1: {x.player1}</div>} style={style} disabled={true} underlineShow={false} />
//       <Divider />
//       <TextField hintText={<div> Player 1 Score: {x.player1}</div>} style={style} disabled={true} underlineShow={false} />
//       <Divider />
//       <TextField hintText={<div> Player 2: {x.player1}</div>} style={style} disabled={true} underlineShow={false} />
//       <Divider />
//       <TextField hintText={<div> Player 2 Score: {x.player1}</div>} style={style} disabled={true} underlineShow={false} />
//       <Divider />
//     </Paper>
//               );
//             })}


//       </div>
//     );
//   }
// }

// export default AddScore;




// import React from "react";

// import TextField from "material-ui/TextField";
// import { typography } from "material-ui/styles";

// import RaisedButton from "material-ui/RaisedButton";

// import moment from "moment";

// const styles = {
//   title: {
//     fontSize: 24,
//     fontWeight: typography.fontWeightLight,
//     marginBottom: 20
//   }
// };

// class AddScore extends React.Component {
//   state = {
//     player1: '',
//     player2: '',
//     player1score: '',
//     player2score: '',
//     date: moment().format(),
//   }
//   render() {
//     console.log(this.state)
//     const { addNew } = this.props;
//     return (
//       <div className="row">
//         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//           <h3 style={styles.title}> Names</h3>
//           <TextField
//             hintText="Your name"
//             name="test"
//             onChange={e =>
//               this.setState({ player1: e.target.value.toLowerCase() })}
//           />
//           <br />
//           <TextField
//             hintText="Opponent name"
//             onChange={e =>
//               this.setState({ player2: e.target.value.toLowerCase() })}
//           />
//         </div>
//         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//           <h3 style={styles.title}> Score</h3>
//           <TextField
//             type="number"
//             hintText="Your score"
//             onChange={e =>
//               this.setState({ player1score: parseInt(e.target.value)})}
//           />
//           <br />
//           <TextField
//             type="number"
//             hintText="Opponent score"
//             onChange={e =>
//               this.setState({ player2score: parseInt(e.target.value) })}
//           />
//         </div>
//         <RaisedButton
//           primary={true}
//           label="Submit scores!"
//           // disabled={true}
//           fullWidth={true}
//           onClick={e => addNew(e, this.state)}
//         />
//       </div>
//     );
//   }
// }

// export default AddScore;