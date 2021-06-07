import React, { useEffect, useState } from 'react';
import { makeStyles, Modal, Backdrop, Fade, Button, Select } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',
        },
    },
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


const validationSchema = Yup.object({
    committee: Yup.string().required('Please select committee'),
})

function Model(props) {
    console.log(props)
    
    const handleClose = data => {
        props.onClose;
    }
    
    const classes = useStyles();
    const [committee, setCommittee] = useState([{ label: "Please Select committee", value: "" }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://mydreamcommittee.com/v1/committees');
            const body = await res.json();
            setCommittee(body.data.committees);
        }
        getData()
    }, []);

    return (
        <Modal
            disableBackdropClick
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
                    <Formik
                        initialValues={{
                            committee: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true)
                            console.log(data.committee);
                            handleClose(data.committee);
                        }}
                    >
                        {({ errors, isSubmitting, values, handleChange }) => (
                            <Form>
                                <Row>
                                    <Col className={classes.root}>
                                        <label>Select Committee For Draw:</label>
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
                                </Row>
                                <Row>
                                    <Col className={classes.root}>
                                        <Button
                                            style={{
                                                color: "white",
                                                backgroundColor: "rgb(252, 143, 0)",
                                                margin: "20px 0 0 0",
                                                padding: "15px 5px",
                                            }}
                                            variant="contained"
                                            type="submit"
                                            onClick={handleClose}
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
                                            /> : 'Go'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Fade>
        </Modal>
    )
}
export default Model;