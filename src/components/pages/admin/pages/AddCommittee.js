import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import './AddCommittee.css'
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '5px 0px',
            width: '100%',
        },
    },
    table: {
        minWidth: 650,
    }
}));

const validationSchema = Yup.object({
    label: Yup.string().required('Name is required.'),
    value: Yup.string().required('Value is required.'),
});

function AddCommittee() {
    const classes = useStyles();
    const [committees, setCommittees] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://mydreamcommittee.com/v1/committees');
            const body = await res.json();
            setCommittees(body.data.committees);
        }
        getData()
    }, []);

    return (
        <div>
            <div>
                <h1>Add Committees</h1>
            </div>
            <div>
                <Formik
                    initialValues={{
                        label: '',
                        value: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { isSubmitting }) => {
                        console.log(data);
                    }}
                >
                    {({ errors, handleChange, values, isSubmitting }) => (
                        <Form>
                            <Row>
                                <Col className={classes.root}>
                                    <label>Enter Committee Name:</label>
                                    <Field
                                        as={TextField}
                                        name='label'
                                        placeholder='Dream Car Committee'
                                        variant='outlined'
                                    />
                                </Col>
                                <Col className={classes.root}>
                                    <label>Enter Committee Value:</label>
                                    <Field
                                        as={TextField}
                                        name='value'
                                        placeholder='car'
                                        variant='outlined'
                                    />
                                </Col>
                            </Row>
                            <Row className="btnRoww">
                                <Button
                                    style={{
                                        color: "white",
                                        backgroundColor: "rgb(252, 143, 0)",
                                        padding: "10px 30px"
                                    }}
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Add
                                </Button>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <h4>Active Committees</h4>
            </div>
            <div>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Committee Name</TableCell>
                                <TableCell>Committee Value</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {committees.map((committee) => (
                                <TableRow key={committee.id}>
                                    <TableCell>{committee.id}</TableCell>
                                    <TableCell>{committee.label}</TableCell>
                                    <TableCell>{committee.value}</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default AddCommittee;