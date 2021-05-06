import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Content.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '5px 0px',
      width: '100%',
    },
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
  fatherName: Yup.string().required('Father Name is required,'),
  mobileNo: Yup.string().required('Mobile No is required.'),
  address: Yup.string().required('House address is required.'),
  cityName: Yup.string().required('City Name is required.'),
  committee: Yup.string().required('Please Select anyone committee'),
  photo: Yup.string().required('This field is required'),
});

const committees = [
  {
    key: 'Select committee', value: ''
  },
  {
    value: 'car', key: 'Dream Car Committee'
  },
  {
    value: 'mobile', key: 'Dream Mobile Committee'
  },
  {
    value: 'bike', key: 'Dream Bike Committee'
  },
  {
    value: 'gold', key: 'Dream Gold Committee'
  },
  {
    value: 'tractor', key: 'Dream Tractor Committee'
  },
  {
    value: 'house', key: 'Dream House Committee'
  },
]

function Main() {
  const classes = useStyles();

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
              fatherName: '',
              mobileNo: '',
              address: '',
              cityName: '',
              committee: '',
              photo: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              //make async call
              console.log(data);
              setSubmitting(false);

            }}
          >
            {({ values, errors, isSubmitting, }) => (
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
                    <label>Father Name:</label><br />
                    <MyTextField
                      placeholder="Father Name"
                      name="fatherName"

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

                    />
                  </Col>
                </Row>
                <Row className="firstRow">
                  <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
                    <label>Committees:</label><br />
                    <Field
                      name='committee'
                      as={Select}
                      variant='outlined'
                      size='small'
                      helperText='Please select anyone committee'
                      native
                    >
                      {committees.map(option => {
                        return (
                          <option key={option.value} value={option.value}>{option.key}</option>
                        )
                      })}
                    </Field>
                  </Col>
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
                    Register
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>

    //           <Col xs={12} sm={12} md={6} lg={6} className="coll" className={classes.root}>
    //             <label>Picture of the deposite slip:</label><br />
    //             <Button>
    //               <input type="file" />
    //             </Button>
    //           </Col>
    //         </Row>
    //       </div>
    //     </Container>
    //   </div>
  );
}
export default Main;