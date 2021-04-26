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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name === ''){
            console.log('name empty')
        } else {
        console.log(name,email,msg)
        }
        setName('');
        setEmail('');
        setMsg('');
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
                            value={name}
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                        /><br /><br />
                        <label>Email:</label><br />
                        <TextField
                           value={email}
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                        /><br /><br />
                        <label>Message/Questions/Comments:</label><br />
                        <TextField
                            value={msg}
                            multiline
                            rows={10}
                            type="text"
                            name="msg"
                            placeholder="Enter Message/Questions/Comments"
                            variant="outlined"
                            onChange={(e) => setMsg(e.target.value)}
                        /><br /><br />
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