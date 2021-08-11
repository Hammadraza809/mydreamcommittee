import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./AddCommittee.css";
import Backdrop from "@material-ui/core/Backdrop";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShowModal from "../pages/common/ShowModel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "5px 0px",
      width: "100%",
    },
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
  label: Yup.string().required("Name is required."),
  value: Yup.string().required("Value is required."),
  members: Yup.string().required("No of Members required."),
});

function AddCommittee(props) {
  const classes = useStyles();
  const [committees, setCommittees] = useState([]);
  const [selectValue, setSelectValue] = useState("close");
  const [loading, setLoading] = useState(false);
  const menu = React.useRef();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);
  const [backdrop, setBackdrop] = useState(true);

  //fetching all committees
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://mydreamcommittee.com/v1/committees");
      const body = await res.json();
      setCommittees(body.data.committees);
      setBackdrop(false);
    }
    getData();
  }, []);

  const updateCommittee = (value, id) => {
    setLoading(true);
    setBackdrop(true);
    fetch(`https://mydreamcommittee.com/v1/committees/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setLoading(false);
          setResponse(result.messages + " Please refresh page.");
          setBackdrop(false);
          setOpen(true);
        } else {
          setLoading(false);
          setResponse("Error. Committee not updated.");
          setBackdrop(false);
          setOpen(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setBackdrop(false);
        alert("Connect timeout. Please refresh the page to laod content.");
        return null;
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCommitte = (data) => {
    setLoading(true);
    setBackdrop(true);
    fetch(`https://mydreamcommittee.com/v1/committees`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: data.label,
        value: data.value,
        status: "active",
        members: data.members,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 201) {
          setLoading(false);
          setCommittees(...committees, result.data.committees);
          setBackdrop(false);
          setResponse(result.messages + " Please refresh page.");
          setOpen(true);
        } else {
          setLoading(false);
          setBackdrop(false);
          setResponse("Error. Committee not added.");
          setOpen(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setBackdrop(false);
        alert("Connect timeout. Please refresh the page to laod content.");
        return null;
      });
  };
  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <div>
      <div>
        <h1>
          <u>Add Committees</u>
        </h1>
        <hr />
      </div>
      <div>
        <Formik
          initialValues={{
            label: "",
            value: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            addCommitte(data);
            setSubmitting(false);
            resetForm("");
          }}
        >
          {({ errors, handleChange, values, isSubmitting, touched }) => (
            <Form>
              <Row>
                <Col className={classes.root}>
                  <label>Enter Committee Name:</label>
                  <Field
                    as={TextField}
                    name="label"
                    placeholder="Dream Car Committee"
                    variant="outlined"
                  />
                  {errors.label}
                </Col>
                <Col className={classes.root}>
                  <label>Enter Committee Code:</label>
                  <Field
                    as={TextField}
                    name="value"
                    placeholder="DCC"
                    variant="outlined"
                  />
                  {errors.value}
                </Col>
                <Col className={classes.root}>
                  <label>Enter No of Members:</label>
                  <Field
                    as={TextField}
                    name="members"
                    placeholder="200"
                    variant="outlined"
                  />
                  {errors.members}
                </Col>
              </Row>
              <Row className="btnRoww">
                <Button
                  className="btn"
                  style={{
                    color: "white",
                    backgroundColor: "rgb(252, 143, 0)",
                    padding: "10px 30px",
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
                    "Add"
                  )}
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div className="headingCommittee">
        <h4>Committees</h4>
      </div>
      <hr />
      <div>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Committee Name</TableCell>
                <TableCell>Committee Code</TableCell>
                <TableCell>No of Members</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {committees &&
                committees.map((committee) => (
                  <TableRow key={committee.id}>
                    <TableCell>{committee.label}</TableCell>
                    <TableCell>{committee.value}</TableCell>
                    <TableCell>{committee.members}</TableCell>
                    <TableCell>{committee.status}</TableCell>
                    <TableCell>
                      {
                        <select
                          id="dropdown"
                          ref={menu}
                          defaultValue={selectValue}
                          onChange={handleChange}
                          name="changeStatus"
                        >
                          <option value="active">active</option>
                          <option value="close">close</option>
                        </select>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                          className="btn"
                          style={{
                            color: "white",
                            backgroundColor: "rgb(252, 143, 0)",
                            padding: "10px 20px",
                          }}
                          variant="contained"
                          type="submit"
                          onClick={() => {
                            updateCommittee(selectValue, committee.id);
                          }}
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
                      }
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ShowModal
        open={open}
        onClose={handleClose}
        res={response}
        props={props}
      />
      <Backdrop style={{ zIndex: 100 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default AddCommittee;
