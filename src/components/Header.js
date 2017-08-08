import React from 'react';
import AppBar from 'material-ui/AppBar';
import {white, red500} from 'material-ui/styles/colors';
import ViewModule from 'material-ui/svg-icons/action/view-module';

class Header extends React.Component {

  render() {
    const style = {
      appBar: {
        position: 'fixed',
        top: -4,
        overflow: 'hidden',
        maxHeight: 57,
        backgroundColor:red500,
        color:white,
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 10,
        marginTop:10,
        color:white
      }
    };

    return (
        <div>
          <AppBar
              style={style.appBar}
              title="Foos ball"
              iconElementRight={
                <div style={style.iconsRightContainer}>
              <ViewModule color={white} />
                </div>
              }
            />

        </div>
      );
  }
}



export default Header;
