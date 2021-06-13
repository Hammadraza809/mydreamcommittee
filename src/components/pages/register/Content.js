import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Content.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, useField, Field, FormikConfig, FormikValues } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import Imageup from './ImageUp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '5px 0px',
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

const MyTextField = ({ type, rows, multiline, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      type={type}
      rows={rows}
      multiline={multiline}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      variant="outlined"
      error={!!errorText}
    />
  )
}
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is requird.'),
  cnic: Yup.string().required('CNIC Number is required.'),
  email: Yup.string().email('Please enter a valid email').required('Email address is required,'),
  mobileNo: Yup.string().required('Mobile No is required.'),
  address: Yup.string().required('House address is required.'),
  cityName: Yup.string().required('City Name is required.'),
  committee: Yup.string().required('Please select anyone committee'),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
});

export default function Main(props) {
  const classes = useStyles();
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [response, setResponse] = useState([null]);
  // const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://mydreamcommittee.com/v1/committees/active');
      const body = await res.json();
      setCommittee(body.data.Committees);
    }
    getData()
  }, []);

  const onRegister = data => {
    const obj = {
      name: data.fullName,
      cnic: data.cnic,
      email: data.email,
      mobileNo: data.mobileNo,
      address: data.address,
      city: data.cityName,
      committee: data.committee,
      membershipId: '',
      status: 'pending',
      customwinner: 'false'
    }
    setLoading(true);
    fetch(`https://mydreamcommittee.com/v1/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        localStorage.setItem("id",result.data.users[0].id);
        localStorage.setItem("nic",result.data.users[0].cnic);
        props.props.history.push('/image');
      })
      .catch(err => console.log(err));
  }

  // const steps = [
  //   <Main next={handleNextStep} data={data} />,
  //   <Imageup next={handleNextStep} prev={handlePrevStep} data={data} />
  // ];

  return (
    <div className="registerFrom">
      <Container>
        <div className="heading">
          <h1>Registration Form</h1>
        </div>
        <div className="rForm">
          <Formik
            initialValues={{
              fullName: '',
              cnic: '',
              email: '',
              mobileNo: '',
              address: '',
              cityName: '',
              photo: '',
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              props.props.history.push('/image');
              onRegister(data);
              setSubmitting(false);
              resetForm({})
            }}
          >
            {({ errors, isSubmitting, }) => (
              <Form>
                <Row className="firstRow">
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>Name:</label><br />
                    <MyTextField
                      placeholder="Full Name"
                      name="fullName"

                    />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>CNIC:</label><br />
                    <MyTextField
                      placeholder="CNIC"
                      name="cnic"

                    />
                  </Col>
                </Row>
                <Row className="firstRow">
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>Email:</label><br />
                    <MyTextField
                      placeholder="Email"
                      name="email"

                    />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>Mobile No:</label><br />
                    <MyTextField
                      placeholder="Mobile No"
                      name="mobileNo"

                    />
                  </Col>
                </Row>
                <Row className="firstRow">
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>Address:</label><br />
                    <MyTextField
                      placeholder="Address"
                      name="address"

                    />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>City Name:</label><br />
                    <MyTextField
                      placeholder="City Name"
                      name="cityName"
                      as={TextField}
                      variant='outlined'
                    />
                  </Col>
                </Row>
                <Row className="firstRow">
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>Committees:</label><br />
                    <Field
                      name="committee"
                      as={Select}
                      variant='outlined'
                      native
                      type="Select"
                    >
                      <option value="">Please Select Committee</option>
                      {committee.map(item => {
                        return (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        )
                      })}
                    </Field>
                    {<div style={{ color: 'red' }}><small>{errors.committee}</small></div>}
                  </Col>
                </Row>
                <Row className="firstRow">
                  <Col>
                    <label>
                      <Field
                        as={Checkbox}
                        name="terms"
                        type="checkbox"
                      />
                      I accept terms and condition.
                    </label>
                    {<div style={{ color: 'red' }}><small>{errors.terms}</small></div>}
                  </Col>
                </Row>
                <Row className="btnRow">
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "rgb(252, 143, 0)",
                      padding: "10px 20px"
                    }}
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
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
                    /> : 'Next'}
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      {/* <Imageup res={response}/> */}
    </div>
  );
}