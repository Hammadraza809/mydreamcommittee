import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./Content.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendBtn from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
    },
}));

function Main() {
    const classes = useStyles();
    const [contact, setContact] = useState({
        fullName: '',
        email: '',
        msg: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setContact((values) => ({
            ...values, [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(contact)
        setSubmitted(true);
        setContact({
            fullName : '',
            email : '',
            msg : ''
        })
    }


    return (
        <div className="text">
            <div className="cheadingg">
                <h1>Contact Us</h1>
            </div>
            <div className="contactForm">
                <Container className="cForm">
                    <form className={classes.root}>
                        <label>Name:</label><br />
                        <TextField
                            name="fullName"
                            value={contact.fullName}
                            type="text"
                            placeholder="Enter Name"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <br /><br />
                        <label>Email:</label><br />
                        <TextField
                            name="email"
                            value={contact.email}
                            type="email"
                            placeholder="Enter Email"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <br /><br />
                        <label>Message/Questions/Comments:</label><br />
                        <TextField
                            name="msg"
                            value={contact.msg}
                            multiline
                            rows={10}
                            type="text"
                            placeholder="Enter Message/Questions/Comments"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <br /><br />
                        <SendBtn
                            style={{
                                backgroundColor: "rgb(252, 143, 0)",
                                color: "white",
                                padding: "10px 15px"
                            }}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Send
                        </SendBtn>
                    </form>
                </Container>
            </div>
        </div>
    );
}

export default Main;