import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./Content.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, useField, Field } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Yup from "yup";
import ShowModal from "../admin/pages/common/ShowModel";
import "./ImageUp.css";

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
  fullName: Yup.string().required("Full name is requird."),
  cnic: Yup.string().required("CNIC Number is required."),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email address is required,"),
  mobileNo: Yup.string().required("Mobile No is required."),
  address: Yup.string().required("House address is required."),
  cityName: Yup.string().required("City Name is required."),
  refrenceId: Yup.string().max(8, "Refferal ID must contains 8 characters."),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  photo: Yup.mixed()
    .required("Please upload picture of bank deposite slip")
    .test("fileSize", "The file is too large. Max size is 5mb.", (value) => {
      return value && value.size <= 5000000;
    })
    .test("fileType", "Image should be jpg/png/jpeg format", (value) => {
      return (
        value &&
        (value.type === "image/png" ||
          value.type === "image/jpg" ||
          value.type === "image/jpeg")
      );
    }),
});

export default function Main(props) {
  const commt = props.props.match.params.data;
  const classes = useStyles();
  const [mycommittee, setMyCommittee] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);
  const [backdrop, setBackdrop] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://amazingpak.com/mydreamcommittee/v1/controller/committee.php?value=${commt}`
      );
      const body = await res.json();
      setMyCommittee(body.data.Committees[0].label);
      setBackdrop(false);
    }
    getData();
  }, [commt]);

  const handleClose = () => {
    setOpen(false);
  };

  const initialValuess = {
    fullName: "",
    cnic: "",
    email: "",
    mobileNo: "",
    address: "",
    cityName: "",
    committee: mycommittee,
    refrenceId: "",
    photo: "",
    terms: false,
  };

  const onRegister = (data) => {
    const obj = {
      name: data.fullName,
      cnic: data.cnic,
      email: data.email,
      mobileNo: data.mobileNo,
      address: data.address,
      city: data.cityName,
      committee: commt,
      membershipId: "",
      refrenceId: data.refrenceId,
      status: "pending",
      customwinner: "false",
    };
    setLoading(true);
    fetch(`http://amazingpak.com/mydreamcommittee/v1/controller/user.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((result) => {
        //For image
        const id = result.data.users[0].id;
        const nic = result.data.users[0].cnic;
        let formdata = new FormData();
        formdata.append(
          "attributes",
          JSON.stringify({
            title: `image-${id}`,
            filename: `-${nic}`,
          })
        );
        formdata.append("imagefile", data.photo);
        fetch(
          `http://amazingpak.com/mydreamcommittee/v1/controller/image.php?memberid=${id}`,
          {
            method: "POST",
            body: formdata,
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.statusCode === 201) {
              setLoading(false);
              setResponse(
                "Registration Successfull. Our team will contact you shortly."
              );
              setOpen(true);
            } else {
              setLoading(false);
              setResponse(
                "Registration unsuccessfull. Please try again latter."
              );
              setOpen(true);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="registerFrom">
      <Container>
        <div className="heading">
          <h1>Registration Form</h1>
        </div>
        <div className="rForm">
          <Formik
            enableReinitialize
            initialValues={backdrop ? null : initialValuess}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              onRegister(data);
              setSubmitting(false);
              resetForm("");
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
                    <MyTextField placeholder="Full Name" name="fullName" />
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
                    <MyTextField placeholder="CNIC" name="cnic" />
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
                    <MyTextField placeholder="Email" name="email" />
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
                    <MyTextField placeholder="Mobile No" name="mobileNo" />
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
                <div></div>
                <Row className="firstRow">
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={`coll ${classes.root}`}
                  >
                    <label>Upload picture of deposit slip:</label>
                    <br />
                    <small className="slipimg">
                      <ul>
                        <li>
                          Please upload bank deposit slip as a payment proof.
                        </li>
                        <li>Our team will verify with you.</li>
                        <li>
                          If the payment is varified then you will be registered
                          for this committee and a membership Id will be assign
                          to you
                        </li>
                        <li>
                          Image should be in .png or .jpeg or .jpg format.
                        </li>
                      </ul>
                    </small>
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => {
                        setFieldValue("photo", e.target.files[0]);
                      }}
                    />
                    {
                      <div style={{ color: "red" }}>
                        <small>{errors.photo}</small>
                      </div>
                    }
                  </Col>
                </Row>
                <Row className="firstRow">
                  <Col>
                    <label>
                      <Field as={Checkbox} name="terms" type="checkbox" />I
                      accept{" "}
                      <a className="rTerms" href="\terms">
                        <u>Terms and Conditions</u>
                      </a>
                    </label>
                    {
                      <div style={{ color: "red" }}>
                        <small>{errors.terms}</small>
                      </div>
                    }
                  </Col>
                </Row>
                <Row className="btnRow">
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
                      "Register"
                    )}
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      <Backdrop style={{ zIndex: 100 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ShowModal open={open} onClose={handleClose} res={response} />
    </div>
  );
}
