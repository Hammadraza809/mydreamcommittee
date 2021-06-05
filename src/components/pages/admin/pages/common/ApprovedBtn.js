import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
    },
}));

function ApprovedBtn(props) {
    const classes = useStyles();
    const changeStatus = () => {
        console.log(props.request.committee)
        fetch(`https://mydreamcommittee.com/v1/controller/user.php?committee=${props.request.committee}&status=approved`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(result => {
                // const id = props.request.committee + '-' + parseInt(result.data.users.length) + 1
                // console.log(result.data.users.length,parseInt(result.data.users.length)+1)
                const id = result.data.users.length + 1
                console.log(id)
                const obj = {
                    membershipId: props.request.committee + '-' + id,
                    status: 'approved'
                }
                fetch(`https://mydreamcommittee.com/v1/users/${props.request.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(result => console.log(result))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <Button
                style={{
                    color: "white",
                    backgroundColor: "rgb(252, 143, 0)",
                    padding: "10px 10px",
                }}
                variant="contained"
                onClick={() => {
                    changeStatus()
                }}
            >
                Approve
            </Button>
        </div>
    )
}
export default ApprovedBtn;