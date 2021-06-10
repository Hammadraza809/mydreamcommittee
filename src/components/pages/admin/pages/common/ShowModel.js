import React from 'react';
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
        textAlign: 'center'
    },
}));

function Model(props) {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <h1>Alert</h1>
                    <h3>{props.res}</h3>
                    <br />
                    <Button
                        style={{
                            color: "white",
                            backgroundColor: "rgb(252, 143, 0)",
                        }}
                        variant="contained"
                        onClick={props.onClose}
                    >
                        Ok
                    </Button>
                </div>
            </Fade>
        </Modal>
    )
}
export default Model;