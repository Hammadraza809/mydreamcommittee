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

const SUPP_FORMAT = ['image/jpg','image/jpeg','image/png'];

const validationSchema = Yup.object({
  photo: Yup.mixed().required('Please upload picture of bank deposite slip')
    .test("fileType", "Image should be jpg/png/jpeg format", (value) => {
      SUPP_FORMAT.includes(value.type);
    }),
});

function ImageUp(props) {
  const id = localStorage.getItem("id");
  const nic = localStorage.getItem("nic");

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);

  const handleClose = () => {
    props.history.push('/register');
    setOpen(false);
  };

  const onRegister = data => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append("attributes", JSON.stringify({
      "title": `image-${id}`,
      "filename": `-${nic}`,
    }));
    formdata.append("imagefile", data.photo);
    console.log(formdata);
    fetch(`https://mydreamcommittee.com/v1/userimage/${id}/images`, {
      method: 'POST',
      body: formdata,
    })
      .then(res => res.json())
      .then(result => {
        if (result.statusCode === 201) {
          setLoading(false)
          console.log(result);
          setResponse("Registration Successfull. Our team will contact you shortly.");
          setOpen(true);
        }
        else {
          setLoading(false);
          setResponse("Registration unsuccessfull. Please try again latter.")
          setOpen(true);
        }

      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Header />
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
                // onRegister(data);
                setSubmitting(false);
                resetForm({})
              }}
            >
              {({ errors, isSubmitting, setFieldValue, }) => (
                <Form>
                  <Row className="firstRow">
                    <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                      <label>Upload picture of deposite slip:</label><br />
                      <input
                        type='file'
                        name="photo"
                        onChange={(e) => {
                          setFieldValue("photo", e.target.files[0])
                        }}
                      />
                      {<div style={{ color: 'red' }}><small>{errors.photo}</small></div>}
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
      <Footer />
    </div>
  );
}
export default ImageUp;