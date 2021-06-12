import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, makeStyles } from '@material-ui/core';
import ApprovedBtn from './common/ApprovedBtn';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

function Requests() {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);


    // const getMembers = () => {
    //     fetch(`https://mydreamcommittee.com/v1/users/pending`,{
    //         method: 'GET',
    //     })
    //     .then(res => res.json())
    //     .then(result => {
    //         setRequests(result.body.users)
    //     })
    //     .then(err => console.log(err));
    // }

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://mydreamcommittee.com/v1/users/pending');
            const body = await res.json();
            setRequests(body.data.users);
        }
        getData()
    }, []);

    const getRemMembers = () => {
        fetch(`https://mydreamcommittee.com/v1/users/pending`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(result => {
                setRequests(result.data.users)
            })
            .then(err => console.log(err));
    }

    const onDelete = (id) => {
        fetch(`https://mydreamcommittee.com/v1/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.statusCode === 200) {
                    window.location.reload(true);
                    setRequests(null);
                    getRemMembers()

                }
                // console.log(result)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <h1><u>Incoming Requests</u></h1>
                <hr />
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
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests && requests.map((request, index) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.name}</TableCell>
                                <TableCell>{request.cnic}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell>{request.mobileno}</TableCell>
                                <TableCell>{request.address}</TableCell>
                                <TableCell>{request.city}</TableCell>
                                <TableCell>{request.committee}</TableCell>
                                <TableCell>{request.status}</TableCell>
                                <TableCell><ApprovedBtn request={request} index={index} /></TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" onClick={() => { onDelete(request.id) }}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default Requests;