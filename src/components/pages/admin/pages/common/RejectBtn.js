import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ShowModal from './ShowModel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',

        },
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

function RejectBtn(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState([null]);

    const handleClose = () => {
        setOpen(false);
        props.func();
    };

    //rejected status button
    const changeStatus = () => {
        setLoading(true);
        fetch(`https://amazingpak.com/mydreamcommittee/v1/controller//user.php?id=${props.request.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'rejected'
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.statusCode === 200) {
                    setLoading(false);
                    setResponse("User Rejected.");
                    setOpen(true);
                }
                else {
                    setLoading(false);
                    setResponse("Error. User not updated.")
                    setOpen(true);
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                alert("Connection timeout. Please refresh the page to laod content.")
                return null;
            });

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
                /> : 'Reject'}
            </Button>
            <ShowModal open={open} onClose={handleClose} res={response} />
        </div>
    )
}
export default RejectBtn;