import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import ApprovedBtn from './common/ApprovedBtn';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    }
}));

function Requests() {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://mydreamcommittee.com/v1/users/pending');
            const body = await res.json();
            setRequests(body.data.users);
        }
        getData()
    }, []);

    return (
        <div>
            <div>
                <h1><u>Incoming Requests</u></h1>
                <hr/>
            </div>
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
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests && requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.name}</TableCell>
                                <TableCell>{request.cnic}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell>{request.mobileno}</TableCell>
                                <TableCell>{request.address}</TableCell>
                                <TableCell>{request.city}</TableCell>
                                <TableCell>{request.committee}</TableCell>
                                <TableCell>{request.status}</TableCell>
                                <TableCell>{<ApprovedBtn props={request.id}/>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default Requests;