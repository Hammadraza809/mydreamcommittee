import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./Content.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendBtn from '@material-ui/core/Button';
import { ErrorMessage, Formik, Form } from 'formik'
import * as Yup from 'yup'

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

    const validate = Yup.object({
        fullName: Yup.string().required('Full name is requird.'),
        email: Yup.string().email('please enter valid email').required('Email is required'),
        msg: Yup.string().required('Please Enter message/comments/suggestions'),
    });

    // const initialState = {
    //     fullName: '',
    //     email: '',
    //     msg: '',
    //     fullNameError: '',
    //     emailError: '',
    //     msgError: ''
    // }

    // const [contact, setContact] = useState({
    //     fullName: '',
    //     email: '',
    //     msg: '',
    //     fullNameError: '',
    //     emailError: '',
    //     msgError: ''
    //     // initialState
    // });

    // const handleChange = (e) => {
    //     setContact((values) => ({
    //         ...values, [e.target.name]: e.target.value,
    //     }));
    // }

    // const validate = () => {
    //     let fullNameError = '';
    //     let emailError = '';
    //     let msgError = '';

    //     if (!contact.fullName) {
    //         fullNameError = 'Name connot be blank';
    //     }

    //     if (!contact.email || !contact.email.includes('@')) {
    //         emailError = 'Invalid email';
    //     }

    //     if (emailError || fullNameError) {
    //         setContact({ emailError, fullNameError });
    //         return false;
    //     }
    //     fullNameError = '';
    //     return true;
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (isValid) {
        // console.log(contact);
        // setContact({
        //     fullName: '',
        //     email: '',
        //     msg: '',
        //     fullNameError: '',
        //     emailError: '',
        //     msgError: ''
        // })
        // }
    }


    return (
        <div className="text">
            <div className="cheadingg">
                <h1>Contact Us</h1>
            </div>
            <div className="contactForm">
                <Container className="cForm">
                    <Formik
                        initialValues={{
                            fullName: '',
                            email: '',
                            msg: '',
                        }}
                        validationSchema={validate}
                        onSubmit={(data) => {
                            console.log(data);
                        }}
                    >
                        {formik => (
                            <Form className={classes.root}>
                                <label>Name:</label><br />
                                <TextField
                                    name="fullName"
                                    // value={contact.fullName}
                                    type="text"
                                    placeholder="Enter Name"
                                    variant="outlined"
                                // onChange={handleChange}
                                />
                                {/* <ErrorMessage /> */}
                                {/* <span style={{ color: 'red' }} >{contact.fullNameError}</span> */}
                                <br /><br />
                                <label>Email:</label><br />
                                <TextField
                                    name="email"
                                    // value={contact.email}
                                    type="email"
                                    placeholder="Enter Email"
                                    variant="outlined"
                                // onChange={handleChange}
                                />
                                {/* <ErrorMessage /> */}
                                {/* <span style={{ color: 'red' }} >{contact.emailError}</span> */}
                                <br /><br />
                                <label>Message/Questions/Comments:</label><br />
                                <TextField
                                    name="msg"
                                    // value={contact.msg}
                                    multiline
                                    rows={10}
                                    type="text"
                                    placeholder="Enter Message/Questions/Comments"
                                    variant="outlined"
                                // onChange={handleChange}
                                />
                                {/* <ErrorMessage /> */}
                                {/* <span style={{ color: 'red' }} >{contact.msgError}</span> */}
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
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </div>
    );
}

export default Main;