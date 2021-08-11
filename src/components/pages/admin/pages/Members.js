import React, { useEffect, useState } from 'react';
import './Members.css';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',
        },
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

const validationSchema = Yup.object({
    committee: Yup.string().required('Please select committee'),
})

function Members() {
    const classes = useStyles();
    const [committee, setCommittee] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [backdrop, setBackdrop] = useState(true);

    //getting committees for dropdown.
    useEffect(() => {
        async function getData() {
            fetch(`https://mydreamcommittee.com/v1/committees`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: 0,
                },
            })
                .then(res => res.json())
                .then(result => {
                    setLoading(false)
                    setCommittee(result.data.committees)
                })
                .catch(err => {
                    setLoading(false);
                    alert("Connection timeout please reload the page to load content")
                    console.log(err)
                    return null;
                });
        }
        getData()
    }, []);

    //fetching all approved members
    useEffect(() => {
        async function getData() {
            fetch(`https://mydreamcommittee.com/v1/users/approved`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: 0,
                },
            })
                .then(res => res.json())
                .then(result => {
                    setLoading(false)
                    setMembers(result.data.users)
                    setBackdrop(false);
                })
                .catch(err => {
                    setLoading(false);
                    setBackdrop(false);
                    alert("Connection timeout please reload the page to load content")
                    console.log(err);
                    return null;
                });
        }
        getData()
    }, []);

    //fetching filtered approved members
    const getMembers = data => {
        setLoading(true)
        setBackdrop(true);
        fetch(`https://mydreamcommittee.com/v1/controller/user.php?committee=${data}&status=approved`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: 0,
            },
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false)
                setMembers(result.data.users)
                setBackdrop(false);
            })
            .catch(err => {
                setLoading(false);
                setBackdrop(false);
                alert("Connection timeout please reload the page to load content")
                console.log(err);
                return null;
            });
    }

    return (
        <div className="main">
            <div>
                <h1><u>All Members</u></h1>
                <hr />
            </div>
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
                                        <option>Please Select Committee</option>
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
                                            margin: "24px 10px 0 0",
                                            padding: "10px 10px",
                                            width: '20%',
                                        }}
                                        variant="contained"
                                        type="submit"

                                    >
                                        {loading ? <CircularProgress
                                            variant="indeterminate"
                                            disableShrink
                                            className={classes.bottom}
                                            classes={{
                                                circle: classes.circle,
                                            }}
                                            size={30}
                                            thickness={4}
                                            value={100}
                                        /> : 'Filter'}
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>CNIC</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mobile No</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Committee</TableCell>
                                    <TableCell>Membership Id</TableCell>
                                    <TableCell>Refrence Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell>{member.cnic}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>{member.mobileno}</TableCell>
                                        <TableCell>{member.address}</TableCell>
                                        <TableCell>{member.city}</TableCell>
                                        <TableCell>{member.committee}</TableCell>
                                        <TableCell>{member.membershipId}</TableCell>
                                        <TableCell>{member.refrenceId}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Backdrop style={{ zIndex: 100 }} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
export default Members;