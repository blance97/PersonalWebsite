import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    footer: {
        width: "100%",
        backgroundColor: "#333333"
    },
    button: {
        margin: 7,
        marginTop: 20,

    }
}

const Footer = () => (
    <div style={styles.footer}>
        <div style={{ color: "#757575", fontFamily: 'garamond', verticalAlign: 'bottom' }}>
            <text>Copyright Soon tm?</text>
            <center style={styles.buttonGroup}>
                <RaisedButton
                    href="mailto:lancedinh7@gmail.com"
                    label="Email"
                    style={styles.button}
                    icon={<FontIcon className="fa fa-envelope" />}
                />
                <RaisedButton
                    href="https://github.com/blance97"
                    target="_blank"
                    secondary={true}
                    label="Github"
                    style={styles.button}
                    icon={<FontIcon className="fa fa-github" />}
                />
                <RaisedButton
                    href="https://www.linkedin.com/in/lance-dinh/"
                    target="_blank"
                    backgroundColor="#007bb6"
                    label="Linkedin"
                    style={styles.button}
                    icon={<FontIcon className="fa fa-linkedin" />}
                />
            </center>
        </div>
    </div>
);
export default Footer;
