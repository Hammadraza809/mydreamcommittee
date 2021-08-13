import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import ShowModal from "./ShowModel";
import "../../../register/Content.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "5px 0px",
      width: "100%",
    },
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid grey",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MyTextField = ({
  type,
  rows,
  multiline,
  placeholder,
  disabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      disabled={disabled}
      type={type}
      rows={rows}
      multiline={multiline}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      variant="outlined"
      error={!!errorText}
    />
  );
};

const validationSchema = Yup.object({
  address: Yup.string().required("House address is required."),
  cityName: Yup.string().required("City Name is required."),
  refrenceId: Yup.string().max(8, "Refferal ID must contains 8 characters."),
  membershipId: Yup.string().required("Membership Id is required."),
});

function EditRecordModal(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
    props.func();
  };

  const handleCancel = () => {
    props.onClose();
  };

  const initialValuess = {
    fullName: props.res.name,
    cnic: props.res.cnic,
    email: props.res.email,
    mobileNo: props.res.mobileno,
    address: props.res.address,
    cityName: props.res.city,
    committee: props.res.committee,
    refrenceId: props.res.refrenceId,
    membershipId: props.res.membershipId,
  };

  //on update button click
  const onUpdate = (data) => {
    const obj = {
      address: data.address,
      city: data.cityName,
      membershipId: data.membershipId,
      refrenceId: data.refrenceId,
    };
    setLoading(true);
    fetch(`https://mydreamcommittee.com/v1/users/${props.res.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setLoading(false);
          setResponse(result.messages);
          setOpen(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setResponse("Error. User not updated. Please try again later.");
        setOpen(true);
        console.log(err);
      });
  };

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
          <Container>
            <div className="rForm">
              <div>
                <h4>Update Member</h4>
              </div>
              <Formik
                enableReinitialize
                initialValues={initialValuess}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true);
                  onUpdate(data);
                  setSubmitting(false);
                }}
              >
                {({ errors, isSubmitting, setFieldValue }) => (
                  <Form>
                    <Row className="firstRow">
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Name:</label>
                        <br />
                        <MyTextField
                          placeholder="Full Name"
                          name="fullName"
                          disabled
                        />
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>CNIC:</label>
                        <br />
                        <MyTextField placeholder="CNIC" name="cnic" disabled />
                      </Col>
                    </Row>
                    <Row className="firstRow">
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Email:</label>
                        <br />
                        <MyTextField
                          placeholder="Email"
                          name="email"
                          disabled
                        />
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Mobile No:</label>
                        <br />
                        <MyTextField
                          placeholder="Mobile No"
                          name="mobileNo"
                          disabled
                        />
                      </Col>
                    </Row>
                    <Row className="firstRow">
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Address:</label>
                        <br />
                        <MyTextField placeholder="Address" name="address" />
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>City Name:</label>
                        <br />
                        <MyTextField placeholder="City Name" name="cityName" />
                      </Col>
                    </Row>
                    <Row className="firstRow">
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Committee:</label>
                        <br />
                        <MyTextField name="committee" disabled />
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Referral ID:</label>
                        <br />
                        <MyTextField
                          placeholder="Referral ID (e.g. DCC-001)"
                          name="refrenceId"
                        />
                      </Col>
                    </Row>
                    <Row className="firstRow">
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className={`coll ${classes.root}`}
                      >
                        <label>Membership Id:</label>
                        <br />
                        <MyTextField name="membershipId" />
                      </Col>
                    </Row>
                    <Row className="btnRow">
                      <Col>
                        <Button
                          style={{
                            color: "rgb(252, 143, 0)",
                            padding: "10px 20px",
                          }}
                          variant="text"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          style={{
                            color: "white",
                            backgroundColor: "rgb(252, 143, 0)",
                            padding: "10px 20px",
                          }}
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {loading ? (
                            <CircularProgress
                              variant="indeterminate"
                              disableShrink
                              className={classes.bottom}
                              classes={{
                                circle: classes.circle,
                              }}
                              size={30}
                              thickness={4}
                              value={100}
                            />
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
          <ShowModal open={open} onClose={handleClose} res={response} />
        </div>
      </Fade>
    </Modal>
  );
}

export default EditRecordModal;
