import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

const Project = ({ projectName, projectDescription, fromDate, skills, githubLink, siteLink }) => (
    <div style={{ marginBottom: 50 }}>
        <div style={{ overflow: 'hidden', textAlign: "left", paddingLeft: 15, paddingRight: 15 }}>
            <h2>{projectName}</h2>
            <RaisedButton
                href={githubLink}
                target="_blank"
                label="Repo"
                backgroundColor="#90caf9"
                icon={<FontIcon className="fa fa-github" />}
            />
            <div>
                <p style={{ float: 'left', maxWidth: '80%', wordWrap: 'break-word' }}> {projectDescription}{siteLink ? <a href={siteLink} target="_blank">{" " + siteLink}</a> : null}</p>
                <p style={{ float: 'right' }}><text style={{ fontFamily: 'Lato', fontStyle: 'italic', fontSize: "15px" }}>{fromDate} </text></p>
            </div>
        </div>
        <ul className="tags">
            {
                skills.map((skill, i) => {
                    return <li key={i} style={{ fontSize: "15px" }}><a className="tag">{skill.label}</a></li>
                })
            }
        </ul>
    </div>
);
export default Project;