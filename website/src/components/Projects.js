import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Project from './Project';

const styles = {
    page: {
        width: '75%',
        backgroundColor: 'white',
        color: '#546e7a',//texxt
        textAlign: 'center',
        paddingBottom: '100px'
    }
}
export default class Projects extends Component {
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: '#9e9e9e' }}>

                <div style={styles.page}>
                    <h3 style={{ fontFamily: 'Garamond', fontSize: "15px", letterSpacing: '2px' }}>PROJECTS</h3>
                    <Divider style={{ color: 'black', marginBottom: 40 }} />
                    <Project
                        projectName={'Digital Receipt'}
                        projectDescription={`Web app to create receipt while managing inventory. It will also send an email to the customer, if the customer is specified.`}
                        fromDate={"Summer 2017"}
                        skills={[
                            { label: "React JS" },
                            { label: "Redux" },
                            { label: "Node.js" },
                            { label: "Express" },
                            { label: "Javascript" },
                            { label: "Webpack" },
                            { label: "MySQL" },
                            { label: "CSS" },
                            { label: "HTML" },
                            { label: "Heroku" },
                        ]}
                        githubLink={"https://github.com/blance97/DigitalReceipt"}
                        siteLink={"https://digitalreceipt.herokuapp.com/"}
                    />
                    <Project
                        projectName={'Food Poll'}
                        projectDescription={`A poll app that will gather info from people on their food preferences and suggest places based of the results`}
                        fromDate={"Summer 2017 - Present"}
                        skills={[
                            { label: "React JS" },
                            { label: "Javascript" },
                            { label: "Firebase" },
                            { label: "React Native" },
                        ]}
                        githubLink={"https://github.com/blance97/foodpoll"}
                        siteLink={"https://foodpoll.herokuapp.com"}
                    />
                    <Project
                        projectName={'Echo Flow'}
                        projectDescription={`An on going project where we attempt to get Google's Tensorflow to detect faces and have an Amazon Echo speak that persons name.`}
                        fromDate={"Summer 2017 - Present"}
                        skills={[
                            { label: "React JS" },
                            { label: "Javascript" },
                            { label: "Amazon S3" },
                            { label: "Tensorflow" },
                            { label: "Python" }
                        ]}
                        githubLink={"https://github.com/blance97/EchoFlow"}
                    />
                    <Project
                        projectName={'Baseball Site'}
                        projectDescription={`Local Business owner needed a website for clients to sign up for appointments. Unfortunately, communication stopped between us, and the project was terminated.`}
                        fromDate={"Fall 2016"}
                        skills={[
                            { label: "Golang" },
                            { label: "Sqlite" },
                            { label: "Javascipt" },
                            { label: "HTML" },
                            { label: "CSS" },
                            { label: "Materialize CSS" },
                        ]}
                        githubLink={"https://github.com/blance97/BaseballSite"}
                    />
                    <Project
                        projectName={'Slack "Off"'}
                        projectDescription={`A slack bot, written in Python to play an RPG adventure type game with the user (Hack Illinois)`}
                        fromDate={"Winter 2016"}
                        skills={[
                            { label: "Python" },
                            { label: "JSON" },
                            { label: "Firebase" },
                        ]}
                        githubLink={"https://github.com/blance97/Off"}
                    />
                    <Project
                        projectName={'Bone Appetit Rating System'}
                        projectDescription={`A rating system for our food provider. Allows for students to login and vote for the current foods being served.`}
                        fromDate={"Spring 2017"}
                        skills={[
                            { label: "Python Flask" },
                            { label: "Javascript" },
                            { label: "Postgresql" },
                            { label: "HTML" },
                            { label: "CSS" },
                        ]}
                        githubLink={"https://github.com/blance97/Rose-Hulman-Bon-Appetit-Rating-System"}
                    />
                </div>

            </div>

        )
    }
}
