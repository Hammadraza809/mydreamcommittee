import React, { useState } from 'react';
import './Content.css'
import logo from '../../../../assets/images/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
    },
}));

const MyTextField = ({ type, rows, multiline, placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            type={type}
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
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function Main(props) {
    const classes = useStyles();
    const [error, setError] = useState(null)

    const loginFunc = data => {
        fetch(`https://mydreamcommittee.com/v1/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.statusCode === 201) {
                    localStorage.setItem('acc_token', result.data.access_token);
                    localStorage.setItem('ref-token', result.data.refresh_token);
                    localStorage.setItem('user-id',result.data.session_id);
                    props.props.push('/dashboard')
                }
                else {
                    setError(result.messages)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="main">
            <div className="logo">
                <img src={logo} style={{ width: '200px', margin: '20px' }} />
            </div>
            <div className="loginForm">
                <Container className="Form">
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            loginFunc(data);
                            setSubmitting(false);
                        }}
                    >
                        {({ values, errors, isSubmitting }) => (
                            <Form className={classes.root}>
                                <label>Username</label>
                                <MyTextField
                                    placeholder='Username'
                                    name='username'
                                />
                                <br /><br />
                                <label>Password</label>
                                <MyTextField
                                    placeholder='Password'
                                    name='password'
                                    type='password'
                                />
                                {error && <><small style={{ color: 'red' }}>{error}</small></>}
                                <br /><br />
                                <Button
                                    style={{
                                        backgroundColor: "rgb(252, 143, 0)",
                                        color: "white",
                                        padding: "10px 15px"
                                    }}
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </div>
    )
}
export default Main;