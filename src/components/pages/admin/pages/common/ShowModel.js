import React, { useState } from 'react';
import { makeStyles, Modal, Backdrop, Fade, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Model(msg) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // msg.onClose;
    };
    console.log(msg.open)
    return (

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={msg.open}
            // {...msg}

            // onClose={msg.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={msg.open}>
                <div className={classes.paper}>
                    {/* <h2 id="transition-modal-title">{msg}</h2> */}
                    <Button onClick={msg.onClose}>Click Me</Button>
                    <p id="transition-modal-description">react-transition-group animates me.</p>
                </div>
            </Fade>
        </Modal>

    )
}
export default Model;