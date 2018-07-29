import React from 'react';

const Job = ({ image,siteLink, jobTitle, jobPosition, jobDescription, fromDate, location, skills }) => (
    <div style={{ marginBottom: 50 }}>
        <div style={{ overflow: 'hidden', textAlign: "left", paddingLeft: 15, paddingRight: 15 }}>
            <a href={siteLink} target="_blank"><img alt={jobTitle} src={image} style={{ borderRadius: 50, marginRight: '15px', float: 'left', paddingLeft: 10 }} height={50} width={50} /></a>
            <h2>{jobTitle}</h2>
            <h3 style={{marginBottom:"0px"}}>{jobPosition}</h3>
            <div>
                <p style={{ float: 'left', maxWidth: '70%', wordWrap: 'break-word' }}><pre style={{ fontFamily: 'Lato', fontSize: "17px"}}>{jobDescription}</pre></p>
                <p style={{ float: 'right' }}><text style={{ fontFamily: 'Lato', fontStyle: 'italic', fontSize: "15px" }}>{fromDate} </text><br /><text>{location}</text></p>
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
export default Job;