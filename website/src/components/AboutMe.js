import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import RoseSeal from '../Images/RoseSeal.png';

const styles = {
    paper: {
        width: '100%',
        backgroundColor: '#333333',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'bottom',

    },
    article: {
        fontFamily: "Montserrat",
        letterSpacing: '2px'
    },
    buttonGroup: {
        position: 'relative',
    },
    button: {
        margin: 7,
        marginTop: 20
    },
    aboutMe: {
        width: '100%',
        backgroundColor: '#d50000',
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'bottom',

    },
    aboutMePaper: {
        width: '75%',
        margin: 20,
        backgroundColor: '#424242',
        textAlign: 'left',
        display: 'inline-block',
        color: '#90a4ae',
        fontSize: "20px",
        fontFamily: 'Lucida Console',//code syntax,
    }

};

export default class AboutMe extends Component {
    render() {
        return (
            <div style={{ display: "block", justifyContent: "center", marginTop: 100 }}>
                <div style={styles.paper}>
                    <article style={styles.article}>
                        <p>Hello! I am currently a junior Computer Science Student at Rose-Hulman Institute of Technology</p>
                        <a href="http://www.rose-hulman.edu/" target="_blank" rel="noopener noreferrer"><img src={RoseSeal} alt="RoseSeal" /></a>
                    </article>
                    <div style={styles.buttonGroup}>
                        <RaisedButton
                            href="mailto:lancedinh7@gmail.com"
                            style={styles.button}
                            icon={<FontIcon className="fa fa-envelope" />}
                        />
                        <RaisedButton
                            href="https://github.com/blance97"
                            target="_blank"
                            rel="noopener noreferrer"
                            secondary={true}
                            style={styles.button}
                            icon={<FontIcon className="fa fa-github" />}
                        />
                        <RaisedButton
                            href="https://www.linkedin.com/in/lance-dinh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            backgroundColor="#007bb6"
                            style={styles.button}
                            icon={<FontIcon className="fa fa-linkedin" />}
                        />
                    </div>
                </div>
                <div style={styles.aboutMe}>
                    <Paper style={styles.aboutMePaper} zDepth={5}>
                        <article >
                            <section>
                                <blockquote> {"Name: Lance Dinh,"}</blockquote>
                                <blockquote> {"Age: 20,"}</blockquote>
                                <blockquote> {"Major: Computer Science,"}</blockquote>
                                <blockquote> {"Education: Rose-Hulman Institude of Technology,"}</blockquote>
                                <blockquote> {"Expected Graduation: 2019,"}</blockquote>
                                <blockquote> {"Notable Projects: [Digital Receipt, Food Poll,EchoFlow, Off],"}</blockquote>
                                <blockquote> {"Intrests: [Programing,React JS, Basketball, Sleep, Games, Swimming],"}</blockquote>
                                <blockquote> {"Latest Place of Employment: Software Developer at Linbeck LLC,"}</blockquote>
                                <blockquote>"Resume": <a href="https://drive.google.com/file/d/0B-059HcFncdNS1VLS0ZhWEVFTW8/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: "#42a5f5" }}>"My Resume"</a></blockquote>
                            </section>
                        </article>
                    </Paper>
                </div>
            </div>
        )
    }
}