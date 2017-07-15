import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import AboutMe from './components/AboutMe';
import Resume from './components/Resume';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import scrollToComponent from 'react-scroll-to-component';

injectTapEventPlugin();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, index, value) {
    this.setState({ value })
  }
  render() {

    const muiTheme = getMuiTheme({
      appBar: {
        height: 100,
        color: 'white',
        textColor: "black",
      },
    });//#333333


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>

        <div>
          <AppBar
            style={{ position: "fixed", top: 0 }}
            iconElementLeft={<IconMenu
              iconButtonElement={
                <IconButton tooltip="Navigate">
                  <FontIcon className="fa fa-bars" />
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem onClick={(e) => {
                e.stopPropagation();
                console.log("SCroll");
                scrollToComponent(this.AboutMe, { offset: -100, align: 'top', duration: 1500 })
              }} primaryText="About Me" ></MenuItem>

              <MenuItem onClick={(e) => {
                console.log("Resume");
                scrollToComponent(this.Resume, { offset: -100, align: 'top', duration: 750 })
              }} primaryText="Resume" ></MenuItem>

              <MenuItem onClick={(e) => {
                scrollToComponent(this.Experience, { offset: -100, align: 'top', duration: 750 })
              }} 
              primaryText="Experience" ></MenuItem>
              <MenuItem onClick={()=>{
                scrollToComponent(this.Projects, { offset: -100, align: 'top', duration: 750 })
              }}
              primaryText="Projects" />
            </IconMenu>}
            title="LANCE DINH"
            titleStyle={{ textAlign: "center", fontFamily: 'Montserrat', letterSpacing: '2px' }}
          />

          <AboutMe ref={(section) => { this.AboutMe = section; }} />
          <Resume ref={(section) => { this.Resume = section; }} />
          <Experience ref={(section) => { this.Experience = section; }} />
          <Projects ref={(section) => { this.Projects = section; }} />
          <Footer />
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
