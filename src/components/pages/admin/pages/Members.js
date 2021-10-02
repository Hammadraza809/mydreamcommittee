import React, { useEffect, useState } from "react";
import "./Members.css";
import { Row, Col } from "react-bootstrap";
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
  CircularProgress,
  Backdrop,
  Paper,
  withStyles,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import EditIcon from "@material-ui/icons/Edit";
import EditRecordModal from "./common/EditRecordModal";

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
    position: "relative",
    display: "block",
    "& > *": {
      margin: theme.spacing(0.5),
      width: "60%",
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

function Members() {
  const classes = useStyles();
  const [committee, setCommittee] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [response, setResponse] = useState([null]);

  const handleClose = () => {
    setOpenEditModal(false);
  };

  //getting committees for dropdown.
  useEffect(() => {
    async function getData() {
      fetch(`http://amazingpak.com/mydreamcommittee/v1/controller/committee.php`, {
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
    }
    getData();
  }, []);

  //fetching all approved members
  const getAllAprovedMem = async () => {
    setBackdrop(true);
    await fetch(`http://amazingpak.com/mydreamcommittee/v1/controller/user.php?status=approved`, {
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
        setMembers(result.data.users);
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
    getAllAprovedMem();
  }, []);

  //fetching filtered approved members
  const getMembers = (data) => {
    setLoading(true);
    setBackdrop(true);
    fetch(
      `http://amazingpak.com/mydreamcommittee/v1/controller/user.php?committee=${data}&status=approved`,
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
        setMembers(result.data.users);
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
    <div className="main">
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h2>
          <u>All Members</u>
        </h2>
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
          {(props) => (
            <Form style={{ position: "sticky", top: 0 }}>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} className={classes.root}>
                  <label>Select Committee:</label>
                  <br />
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
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "rgb(252, 143, 0)",
                      padding: "10px 15px",
                      width: "80px",
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
                {/* <Col xs={12} sm={12} md={6} lg={6} className={classes.root}>
                  <label>Search By:</label>
                  <br />
                  <Field
                    style={{ width: "40%" }}
                    as={Select}
                    name="header"
                    variant="outlined"
                    native
                  >
                    <option>Search by</option>
                    <option value="cnic">CNIC</option>
                    <option value="mobileNo">Mobile No</option>
                    <option value="membershipId">Memberhip Id</option>
                    <option value="refrenceId">Referral Id</option>
                  </Field>
                  <Field
                    as={TextField}
                    style={{ width: "40%" }}
                    variant="outlined"
                    name="value"
                    placeholder="Enter Value"
                  ></Field>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "rgb(252, 143, 0)",
                      padding: "10px 15px",
                      width: "80px",
                    }}
                    variant="contained"
                    onClick={() => onSearch(props.values)}
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
                      "Search"
                    )}
                  </Button>
                </Col> */}
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div className="results">
        <div className="rTable">
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>CNIC</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Mobile No</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>City</StyledTableCell>
                  <StyledTableCell>Committee</StyledTableCell>
                  <StyledTableCell>Membership Id</StyledTableCell>
                  <StyledTableCell>Referral Id</StyledTableCell>
                  <StyledTableCell>Edit Record</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <StyledTableRow key={member.id}>
                    <StyledTableCell>{member.name}</StyledTableCell>
                    <StyledTableCell>{member.cnic}</StyledTableCell>
                    <StyledTableCell>{member.email}</StyledTableCell>
                    <StyledTableCell>{member.mobileno}</StyledTableCell>
                    <StyledTableCell>{member.address}</StyledTableCell>
                    <StyledTableCell>{member.city}</StyledTableCell>
                    <StyledTableCell>{member.committee}</StyledTableCell>
                    <StyledTableCell>{member.membershipId}</StyledTableCell>
                    <StyledTableCell>{member.refrenceId}</StyledTableCell>
                    <StyledTableCell>
                      <EditIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setOpenEditModal(true);
                          setResponse(member);
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <EditRecordModal
        open={openEditModal}
        onClose={handleClose}
        res={response}
        func={getAllAprovedMem}
      />
      <Backdrop style={{ zIndex: 100 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Members;
