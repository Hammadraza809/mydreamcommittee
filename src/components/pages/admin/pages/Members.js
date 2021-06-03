import React, { useEffect, useState } from 'react';
import './Members.css';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
    },
    table: {
        minWidth: 650,
    }
}));

const validationSchema = Yup.object({
    committee: Yup.string().required('Please select committee'),
})

function Members() {
    const classes = useStyles();
    const [committee, setCommittee] = useState([{ label: "Please Select committee", value: "" }]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://mydreamcommittee.com/v1/committees');
            const body = await res.json();
            setCommittee(body.data.committees);
        }
        getData()
    }, []);

    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://mydreamcommittee.com/v1/users/approved`);
            const body = await res.json();
            setMembers(body.data.users);
        }
        getData()
    }, []);

    const getMembers = data => {
        fetch(`https://mydreamcommittee.com/v1/committee/${data}`, {
        method : 'GET',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
    })
    .then(res => res.json())
    .then(result => setMembers(result.data.users))
    .catch(err => console.log(err));
    }

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
                        getMembers(data.committee);
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
                <div className="rTable">
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>CNIC</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mobile No</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Committee</TableCell>
                                    <TableCell>Membership Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>{member.id}</TableCell>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell>{member.cnic}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>{member.mobileno}</TableCell>
                                        <TableCell>{member.address}</TableCell>
                                        <TableCell>{member.city}</TableCell>
                                        <TableCell>{member.committee}</TableCell>
                                        <TableCell>{member.membershipId}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
export default Members;