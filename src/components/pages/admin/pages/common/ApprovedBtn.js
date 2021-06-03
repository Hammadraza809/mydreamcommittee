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

function ApprovedBtn(id) {
    const classes = useStyles();

    return (
        <div>
            <Button
                style={{
                    color: "white",
                    backgroundColor: "rgb(252, 143, 0)",
                    padding: "10px 10px",
                }}
                variant="contained"
                // type="submit"
                onClick={() => {
                    fetch(`https://mydreamcommittee.com/v1/users/${id.props}`, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            membershipId: '',
                            status: 'approved',
                        })
                    })
                    .then(res => res.json())
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }}
            >
                Approve
            </Button>
        </div>
    )
}
export default ApprovedBtn;