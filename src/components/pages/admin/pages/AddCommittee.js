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
  Paper,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShowModal from "../pages/common/ShowModel";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: 5,
  },
  body: {
    fontSize: 14,
    padding: 5,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
  // photo: Yup.mixed()
  //   .required("Please upload backgrounf image for draw")
  //   .test("fileSize", "The file is too large. Max size is 5mb.", (value) => {
  //     return value && value.size <= 5000000;
  //   })
  //   .test("fileType", "Image should be jpg/png/jpeg format", (value) => {
  //     return (
  //       value &&
  //       (value.type === "image/png" ||
  //         value.type === "image/jpg" ||
  //         value.type === "image/jpeg")
  //     );
  //   }),
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
  const getAllCommittees = () => {
    setBackdrop(true);
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
        setCommittees(result.data.committees);
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
          setBackdrop(false);
          setResponse(result.messages);
          getAllCommittees();
          setOpen(true);
        } else {
          setLoading(false);
          setBackdrop(false);
          setResponse("Error. Committee not updated.");
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
        console.log(result);
        if (result.statusCode === 201) {
          //   //For image
          //   const id = result.data.committees[0].id;
          //   const value = result.data.committees[0].value;
          //   let formdata = new FormData();
          //   formdata.append(
          //     "attributes",
          //     JSON.stringify({
          //       title: `image-${id}`,
          //       filename: `${value}`,
          //     })
          //   );
          //   formdata.append("imagefile", data.photo);
          //   fetch(
          //     `https://mydreamcommittee.com/v1/committeeimage/${id}/committeeImages`,
          //     {
          //       method: "POST",
          //       body: formdata,
          //     }
          //   )
          //     .then((res) => res.json())
          //     .then((result) => {
          //       if (result.statusCode === 201) {
          //         console.log(result);
          //         setLoading(false);
          //         setCommittees((committees) => [
          //           ...committees,
          //           result.data.committees[0],
          //         ]);
          //         setBackdrop(false);
          //         setResponse(result.messages);
          //         setOpen(true);
          //       } else {
          //         setLoading(false);
          //         setResponse("Unsuccessfull. Please try again latter.");
          //         setOpen(true);
          //         setBackdrop(false);
          //       }
          //     })
          //     .catch((err) => console.log(err));
          setLoading(false);
          setCommittees((committees) => [
            ...committees,
            result.data.committees[0],
          ]);
          setBackdrop(false);
          setResponse(result.messages);
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
      <div style={{ textAlign: "center" }}>
        <h2>
          <u>Add New Committees</u>
        </h2>
      </div>
      <div>
        <Formik
          initialValues={{
            label: "",
            value: "",
            members: "",
            photo: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            addCommitte(data);
            setSubmitting(false);
            resetForm("");
          }}
        >
          {({ errors, isSubmitting, setFieldValue }) => (
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
                {/* <Col className={`coll ${classes.root}`}>
                  <label>Upload picture of Draw Background:</label>
                  <br />
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
                </Col> */}
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
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            size="small"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Committee Name</StyledTableCell>
                <StyledTableCell>Committee Code</StyledTableCell>
                <StyledTableCell>No of Members</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Change Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {committees &&
                committees.map((committee) => (
                  <StyledTableRow key={committee.id}>
                    <StyledTableCell>{committee.label}</StyledTableCell>
                    <StyledTableCell>{committee.value}</StyledTableCell>
                    <StyledTableCell>{committee.members}</StyledTableCell>
                    <StyledTableCell>{committee.status}</StyledTableCell>
                    <StyledTableCell>
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
                    </StyledTableCell>
                    <StyledTableCell>
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
                    </StyledTableCell>
                  </StyledTableRow>
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
