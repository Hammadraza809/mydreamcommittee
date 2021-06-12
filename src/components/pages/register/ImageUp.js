import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './ImageUp.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import { Formik, Form, useField, Field } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import ShowModal from '../admin/pages/common/ShowModel';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

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
  // photo: Yup.mixed().required('Please upload picture of bank deposite slip')
  //   .test("size", "Image should be  format", (value) => {
  //     return value && value[0].size <= 500000;

  //   }),
});

function ImageUp(props) {
  console.log(props);
  console.log(props.props);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);

  const handleClose = () => {
    setOpen(false);
  };

  const onRegister = data => {
    const obj = {
      
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
        setResponse(result.messages);
        setOpen(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Header/>
      <div className="registerFrom">
        <Container>
          <div className="heading">
            <h1>Upload Deposit Slip Image</h1>
          </div>
          <div className="slipimg">
            <p>
              <h5><u>Important to note</u></h5>
              <ul>
                <li>Please upload bank diposit slip as a payment proof.</li>
                <li>Our team will verify you.</li>
                <li>If the payment is varified then you will be registered for this committee and a membership Id will assign to you</li>
                <li>Picture should be in .png or .jpeg or .jpg format.</li>
              </ul>
            </p>
          </div>
          <div className="rForm imgForm">
            <Formik
              initialValues={{
                photo: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                onRegister(data);
                setSubmitting(false);
                resetForm({})
              }}
            >
              {({ values, errors, isSubmitting, resetForm }) => (
                <Form>
                  <Row className="firstRow">
                    <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                      <label>Upload picture of deposite slip:</label><br />
                      <MyTextField
                        type='file'
                        name="photo"
                      />
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
                      /> : 'Register'}
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
        <ShowModal open={open} onClose={handleClose} res={response} />
      </div>
      <Footer/>
    </div>
  );
}
export default ImageUp;