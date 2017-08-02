import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RoseSeal from '../Images/RoseSeal.png';

const styles = {
  paper: {
    width: '75%',
    backgroundColor: '#e0e0e0',
    color: '#546e7a',
    textAlign: 'center',
    paddingBottom: '100px'
  },
  listItem: {
    marginLeft: 20,
    listStyle: "circle"
  },
  button: {
    margin: 7,
    marginTop: 20,
    borderRadius: 20
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};
export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        { label: 'Javascript' },
        { label: 'Node.js' },
        { label: 'React/Redux' },
        { label: 'React Native' },
        { label: 'Python' },
        { label: 'Golang' },
        { label: 'Java' },
        { label: 'C' }
      ],
      other: [
        { label: 'GIT' },
        { label: 'SVN' },
        { label: 'MySQL' },
        { label: 'Firebase' },
        { label: 'Postgresql' },
        { label: 'sqlite' },
        { label: 'Heroku' },
        { label: 'AWS' }
      ]
    };
  }
  render() {
    const Languages = this.state.languages.map((chip, i) => {
      return (
        <li key={i} style={{ fontSize: "15px" }}><a className="tag">{chip.label}</a></li>
      )
    })
    const Other = this.state.other.map((chip, i) => {
      return (
        <li key={i} style={{ fontSize: "15px" }}><a className="tag">{chip.label}</a></li>
      )
    })
    return (
      <div style={{ display: "flex", backgroundColor: "#9e9e9e", width: "100%", justifyContent: "center" }}>
        <Paper zDepth={5} style={styles.paper}>
          <h3 style={{ fontFamily: 'Garamond', fontSize: "15px", letterSpacing: '2px' }}>
            RÉSUMÉ
      </h3>
          <p style={{ textAlign: "left", marginTop: '30px', paddingLeft: 10 }}>
            Education
          </p>
          <div style={{
            overflow: 'hidden',
            textAlign: "left"
          }}>
            <img alt="RoseSeal" src={RoseSeal} style={{ marginRight: '15px', float: 'left', paddingLeft: 10 }} height={50} width={50} />
            <h3>Rose-Hulman Institute of Technology</h3>
            <div style={{ paddingLeft: 15, paddingRight: 15 }}>
              <p style={{ float: 'left' }}>Computer Science B.S.</p>
              <p style={{ float: 'right' }}><text style={{ fontFamily: 'Lato', fontStyle: 'italic', fontSize: "15px" }}>2015 - Present</text><br /><text>Terre Haute, Indiana</text></p>
            </div>
            <Divider style={{ backgroundColor: "black" }} />
          </div>
          <div style={{ textAlign: 'left', paddingLeft: 15 }}>
            Relevant Course Work:
      <ul style={styles.listItem} >
              <li>Introduction to Databases</li>
              <li>Data Structures and algorithms</li>
              <li>Object Oriented Design</li>
              <li>Computer Architecture</li>
              <li>Operating Systems</li>
              <li>Computer Security</li>
              <li>Internet Of Things</li>
            </ul>
            Clubs and Activities:
        <ul style={styles.listItem}>
              <li> Executive Officer on Hackers Club</li>
              <li>  Kappa Theta Pi (Professional Fraternity)</li>
            </ul>
          </div>
          <div style={{ textAlign: 'left', marginLeft: 20 }}>
            <h2 >Relevant Skills</h2>
            <h3>Languages</h3>
            <ul className="tags">
              {Languages}
            </ul>
            <h3>Other Skills</h3>
            <ul className="tags">
              {Other}
            </ul>
          </div>

        </Paper>

      </div>
    )
  }
}