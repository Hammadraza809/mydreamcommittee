import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Content.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      width: '100%',
    },
  },
}));

function Main() {
  const classes = useStyles();
  return (
    <div className="registerFrom">
      <Container>
        <div className="heading">
          <h1>Registration Form</h1>
        </div>
        <div className="rForm">
          <Row className="firstRow">
            <Col xs={12} sm={12} md={6} lg={6}>
              <label>Name:</label><br />
              <TextField
                type="text"
                name="name"
                placeholder="Enter Name"
                variant="outlined"
                size="small"
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <label>CNIC:</label><br />
              <TextField
                type="text"
                name="cnic"
                placeholder="Enter CNIC"
                variant="outlined"
                size="small"
              />
            </Col>
          </Row>
          <Row className="firstRow">
            <Col xs={12} sm={12} md={6} lg={6}>
              <label>Father Name:</label><br />
              <TextField
                type="text"
                name="fName"
                placeholder="Enter Father Name"
                variant="outlined"
                size="small"
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <label>Mobile No:</label><br />
              <TextField
                type="text"
                name="mobileNo"
                placeholder="Enter Mobile No"
                variant="outlined"
                size="small"
              />
            </Col>
          </Row>
          <Row className="firstRow">
            <Col xs={12} sm={12} md={6} lg={6}>
              <label>Address:</label><br />
              <TextField
                type="text"
                name="address"
                placeholder="Enter Address"
                variant="outlined"
                size="small"
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <label>City Name:</label><br />
              <TextField
                type="text"
                name="cityName"
                placeholder="Enter City Name"
                variant="outlined"
                size="small"
              />
            </Col>
          </Row>
          <Row className="btnRow">
            <Button
              style={{
                color:"white",
                backgroundColor:"rgb(252, 143, 0)",
                padding:"10px 20px"
              }}
              variant="contained"
            >Register</Button>
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default Main;

// class Main extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       cnic: "",
//       fatherName: "",
//       mobileNo: "",
//       address: "",
//       cityName: ""
//     }
//   }

//   handleChange = (e) => {
//     this.setState({
//       value: e.target.value
//     });
//   }

//   handleSubmit = (e) => {
//     console.log(this.state.value);
//     e.preventDefault();
//   }
//   render() {
//     return (
//       <div className="registerFrom">
//         <Container>
//           <div className="heading">
//             <h1>Registration Form</h1>
//           </div>
//           <div className="form">
//             <form onSubmit={this.handleSubmit}>
//               <Row>
//                 <Col>
//                   <Textfiled
//                     type="text"
//                     variant="outlined"
//                     size="large"
//                     name="name"
//                     label="Name"
//                     value={this.state.name}
//                     onChange={this.handleChange}
//                   />
//                 </Col>
//                 <Col xs={12} sm={12} md={12} lg={6}>
//                   <Textfiled
//                     variant="outlined"
//                     size="large"
//                     name="cnic"
//                     label="CNIC"
//                     value={this.state.cnic}
//                     onChange={this.handleChange}
//                   />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={12} sm={12} md={12} lg={6}>
//                   <Textfiled
//                     variant="outlined"
//                     size="large"
//                     name="fatherName"
//                     label="Father Name"
//                     value={this.state.fatherName}
//                     onChange={this.handleChange}
//                   />
//                 </Col>
//                 <Col xs={12} sm={12} md={12} lg={6}>
//                   <Textfiled
//                     variant="outlined"
//                     size="large"
//                     name="mobileNo"
//                     label="Mobile NO"
//                     value={this.state.mobileNo}
//                     onChange={this.handleChange}
//                   />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={12} sm={12} md={12} lg={6}>
//                   <Textfiled
//                     variant="outlined"
//                     size="large"
//                     name="address"
//                     label="Address"
//                     value={this.state.address}
//                     onChange={this.handleChange}
//                   />
//                 </Col>
//                 <Col xs={12} sm={12} md={12} lg={6}>
//                   <Textfiled
//                     variant="outlined"
//                     size="large"
//                     name="cityName"
//                     label="City Name"
//                     value={this.state.cityName}
//                     onChange={this.handleChange}
//                   />
//                 </Col>
//               </Row>
//               {/* <input type="submit" value="Submit"/> */}
//             </form>
//           </div>
//         </Container>
//       </div>
//     );
//   }
// }
// export default Main;