import React, { useEffect, useState } from 'react';
import './Members.css';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
    },
}));

const validationSchema = Yup.object({
    committee: Yup.string().required('Please select committee'),
})

function Members() {
    const classes = useStyles();
    const [committee, setCommittee] = useState([{ label: "Please Select committee", value: "" }]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://mydreamcommittee.com/v1/committees');
            const body = await res.json();
            setCommittee(body.data.committees);
        }
        getData()
    }, []);

    return (
        <div className="main">
            <div className="filter">
                <Formik
                    initialValues={{
                        committee: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true)
                        
                        
                    }}
                >
                    {({ errors, isSubmitting, values, handleChange }) => (
                        <Form>
                            <Row>
                                <Col className={classes.root}>
                                    <label>Select Committee:</label>
                                    <Field
                                        as={Select}
                                        name="committee"
                                        select
                                        variant='outlined'
                                        native
                                    >
                                        {committee.map(item => {
                                            return (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            )
                                        })}
                                    </Field>
                                    
                                </Col>
                                <Col className={classes.root}>
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "rgb(252, 143, 0)",
                                            margin: "24px 0 0 0",
                                            padding: "10px 10px",
                                            width: '20%'
                                        }}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Filter
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="results">
                <h1>This is results</h1>
            </div>
        </div>
    )
}
export default Members;