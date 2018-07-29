import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import R1soft from '../Images/R1soft.jpeg';
import Ventures from '../Images/Ventures.jpg';
import Linbeck from '../Images/Linbeck.jpg';
import VerizonConnect from '../Images/VerizonConnect.png';
import Job from './Job';

const styles = {
    page: {
        width: '75%',
        backgroundColor: 'white',
        color: '#546e7a',//texxt
        textAlign: 'center',
    }
}

export default class Experience extends Component {
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: '#9e9e9e' }}>

                <div style={styles.page}>
                    <h3 style={{ fontFamily: 'Garamond', fontSize: "15px", letterSpacing: '2px' }}>EXPERIENCE</h3>
                    <Divider style={{ color: 'black', marginBottom: 40 }} />
                    <Job
                        image={VerizonConnect}
                        siteLink={"https://www.verizonconnect.com/"}
                        jobTitle={"Verizon Connect"}
                        jobPosition={"Software Developer"}
                        jobDescription={"● Automated deployment to Octopus Deploy via python." + "\n" +
                                        "● Created docker image and deployed and ran on Kubernetes engine." + "\n" +
                                        "● Built and ran test cases on TeamCity."}
                        fromDate={"Summer 2018"}
                        location={"Austin, TX"}
                        skills={[
                            { label: "Python" },
                            { label: "Pytest" },
                            { label: "Octopus Deploy" },
                            { label: "Docker" },
                            { label: "Kubernetes" },
                            { label: "Team City" }
                        ]}
                    />
                    <Job
                        image={Linbeck}
                        siteLink={"https://www.linbeck.com/"}
                        jobTitle={"Linbeck LLC"}
                        jobPosition={"Software Developer"}
                        jobDescription={"● Developed a company specific mobile expense report application." + "\n" +
                        "● Worked react native and redux and made REST calls to company internal endpoints."}
                        fromDate={"Summer 2017"}
                        location={"Houston, TX"}
                        skills={[
                            { label: "React Native" },
                            { label: "Javascript" },
                            { label: "HTML" },
                            { label: "CSS" },
                            { label: "Google OCR" }
                        ]}
                    />
                    <Job
                        image={Ventures}
                        siteLink={"http://www.rhventures.org/"}
                        jobTitle={"Rose-Hulman Ventures"}
                        jobPosition={"Software Engineer"}
                        jobDescription={"● Worked with an informed prescribing company to develop a web application to help medical personnel obtain reports about patient’s blood status." + "\n" + 
                            "● Use Python with tornado framework with a Postgres database hosted with a Nginx server."}
                        fromDate={"Fall 2016 - Spring 2017"}
                        location={"Terre Haute, IN"}
                        skills={[
                            { label: "Python" },
                            { label: "(Tornado Framework)" },
                            { label: "Javascript/Jqeury" },
                            { label: "HTML" },
                            { label: "CSS" },
                            { label: "Postgresql" },
                        ]}
                    />
                    <Job
                        image={R1soft}
                        siteLink={"https://www.r1soft.com/"}
                        jobTitle={"R1soft"}
                        jobPosition={"Software Engineer"}
                        jobDescription={"•Create custom Web server using the Go programming language to add security and functionality of internal tools." + "\n" +
                        "•Handle REST calls with the Golang." + "\n" +
                        "•Generated databases to store users,roles, and their respective permissions in Sqlite3." + "\n" +
                        "•Created HTML pages to display login screen, user management, and internal tools."}
                        fromDate={"Summer 2016"}
                        location={"Houston, TX"}
                        skills={[
                            { label: "Golang" },
                            { label: "Javascript" },
                            { label: "REST Api" },
                            { label: "SQLite" },
                            { label: "HTML" },
                            { label: "CSS" }
                        ]}
                    />
                </div>
            </div>

        );
    }
}