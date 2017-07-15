import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import R1soft from '../Images/R1soft.jpeg';
import Ventures from '../Images/Ventures.jpg';
import Linbeck from '../Images/Linbeck.jpg';
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
                        image={Linbeck}
                        siteLink={"https://www.linbeck.com/"}
                        jobTitle={"Linbeck LLC"}
                        jobPosition={"Software Developer"}
                        jobDescription={"Developed a company specific mobile expense report application with react native. The app will expand to do more than just expense reports."}
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
                        jobDescription={"Worked with Sano, an informed prescribing company to develop a web application to help medical personal obtain reports about patient’s blood status."}
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
                        jobDescription={"Created a custom webserver in Golang to add security and functionality for internal tools."}
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