import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import ApprovedBtn from "./common/ApprovedBtn";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Row, Col } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import RejectBtn from "./common/RejectBtn";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    "& > *": {
      margin: theme.spacing(0),
      width: "100%",
    },
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
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

const validationSchema = Yup.object({
  committee: Yup.string().required("Please select committee"),
});

function Requests() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(true);

  //Fetching committees for dropdown.
  const getAllCommittees = () => {
    fetch(`https://mydreamcommittee.com/v1/committees`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setCommittee(result.data.committees);
      })
      .catch((err) => {
        setLoading(false);
        alert("Connection timeout please reload the page to load content");
        console.log(err);
        return null;
      });
  };

  //Fetching all pending members
  const getPendingMembers = () => {
    setBackdrop(true);
    fetch(`https://mydreamcommittee.com/v1/users/pending`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setRequests(result.data.users);
        setBackdrop(false);
      })
      .catch((err) => {
        setLoading(false);
        setBackdrop(false);
        alert("Connection timeout please reload the page to load content");
        console.log(err);
        return null;
      });
  };

  useEffect(() => {
    getAllCommittees();
    getPendingMembers();
  }, []);

  //Remaining pending members
  const getRemainingPendMem = () => {
    setBackdrop(true);
    fetch(`https://mydreamcommittee.com/v1/users/pending`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setRequests(result.data.users);
        setBackdrop(false);
      })
      .catch((err) => {
        setLoading(false);
        setBackdrop(false);
        alert("Connection timeout please reload the page to load content");
        console.log(err);
        return null;
      });
  };

  //getting filtered members
  const getMembers = (data) => {
    setLoading(true);
    setBackdrop(true);
    fetch(
      `https://mydreamcommittee.com/v1/controller/user.php?committee=${data}&status=pending`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setRequests(result.data.users);
        setBackdrop(false);
      })
      .catch((err) => {
        setLoading(false);
        setBackdrop(false);
        alert("Connection timeout please reload the page to load content");
        console.log(err);
        return null;
      });
  };
  return (
    <div>
      <div>
        <h1>
          <u>Incoming Requests</u>
        </h1>
        <hr />
      </div>
      <div className="filter">
        <Formik
          initialValues={{
            committee: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            getMembers(data.committee);
          }}
        >
          {({ errors, isSubmitting, values, handleChange }) => (
            <Form>
              <Row>
                <Col className={classes.root}>
                  <label>Select Committee:</label>
                  <Field as={Select} name="committee" variant="outlined" native>
                    <option>Please Select Committee</option>
                    {committee.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </Field>
                </Col>
                <Col className={classes.root}>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "rgb(252, 143, 0)",
                      margin: "24px 10px 0 0",
                      padding: "10px 10px",
                      width: "20%",
                    }}
                    variant="contained"
                    type="submit"
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
                      "Filter"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div className="results">
        <div className="rTable">
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>CNIC</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile No</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Committee</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Referral ID</TableCell>
                  <TableCell>Image Link</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests &&
                  requests.map((request, index) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.cnic}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.mobileno}</TableCell>
                      <TableCell>{request.address}</TableCell>
                      <TableCell>{request.city}</TableCell>
                      <TableCell>{request.committee}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>{request.refrenceId}</TableCell>
                      <TableCell
                        component="a"
                        href={request.images[0].imageurl}
                        target="_blank"
                        padding="none"
                      >
                        <b>
                          <u>Click to open image</u>
                        </b>
                      </TableCell>
                      <TableCell>
                        <ApprovedBtn
                          request={request}
                          index={index}
                          func={getRemainingPendMem}
                        />
                      </TableCell>
                      <TableCell>
                        <RejectBtn request={request} index={index} />
                        {/* <IconButton aria-label="delete" onClick={() => { onDelete(request.id) }}>
                                                <DeleteIcon color='error' />
                                            </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Backdrop style={{ zIndex: 100 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Requests;
