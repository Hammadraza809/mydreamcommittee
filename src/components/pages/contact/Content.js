import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./Content.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendBtn from '@material-ui/core/Button';
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
    },
}));

const MyTextField = ({ rows, multiline, placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            rows={rows}
            multiline={multiline}
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            variant="outlined"
            error={!!errorText}
        />
    )
}
const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is requird.'),
    email: Yup.string().email('Please enter valid email').required('Email is required'),
    msg: Yup.string().required('Please Enter message/comments/suggestions'),
});

function Main() {
    const classes = useStyles();

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
                            msg: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            //make async call
                            console.log(data);
                            setSubmitting(false);
                            
                        }}
                    >
                        {({ values, errors, isSubmitting, }) => (
                            <Form className={classes.root}>
                                <label>Full Name:</label><br />
                                <MyTextField
                                    placeholder="Full Name"
                                    name="fullName"
                                    type="input"
                                />
                                <br /><br />
                                <label>Email:</label><br />
                                <MyTextField
                                    placeholder="Email"
                                    name="email"
                                    type="input"
                                />
                                <br /><br />
                                <label>Message/Comments/Questions:</label><br />
                                <MyTextField
                                    placeholder="Message/Comments/Questions"
                                    name="msg"
                                    type="input"
                                    multiline
                                    rows={10}
                                />
                                <br /><br />
                                <SendBtn
                                    style={{
                                        backgroundColor: "rgb(252, 143, 0)",
                                        color: "white",
                                        padding: "10px 15px"
                                    }}
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
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