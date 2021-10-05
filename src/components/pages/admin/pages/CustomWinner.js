import React, { useState } from "react";
import "./CustomWinner.css";
import { Container, Row, Col } from "react-bootstrap";
import { TextField, Button, makeStyles, Select } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShowModal from "../pages/common/ShowModel";

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

const validationSchema = Yup.object({
  membershipId: Yup.string().required("Membership Id is required."),
  customwinner: Yup.string().required("Please select anyone option"),
});

const customwinner = [
  {
    label: "Plase Select Option",
    value: "",
  },
  {
    label: "true",
    value: "true",
  },
  {
    label: "false",
    value: "false",
  },
];

function CustomWinner(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);

  const handleClose = () => {
    setOpen(false);
  };

  if (localStorage.getItem("acc-token") === null) {
    console.log(props.history.push("/restricted"));
  }

  const setCustomwin = (data) => {
    setLoading(true);
    const obj = {
      customwinner: data.customwinner,
    };
    fetch(`https://amazingpak.com/mydreamcommittee/v1/controller/user.php?membershipId=${data.membershipId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setResponse(result.messages);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="winnerHeading">
        <h1>
          <u>Custom Winner</u>
        </h1>
      </div>
      <div className="mainWin">
        <Container>
          <Formik
            initialValues={{
              membershipId: "",
              customwinner: customwinner[0].label,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              setCustomwin(data);
              resetForm({});
            }}
          >
            {({ errors, isSubmitting, values, handleChange }) => (
              <Form>
                <Row>
                  <Col className={classes.root}>
                    <label>Enter Membership ID:</label>
                    <Field
                      as={TextField}
                      name="membershipId"
                      placeholder="Enter Membership Id"
                      variant="outlined"
                    />
                    {
                      <div style={{ color: "red" }}>
                        <small>{errors.membershipId}</small>
                      </div>
                    }
                  </Col>
                  <Col className={classes.root}>
                    <label>Select Value:</label>
                    <Field
                      as={Select}
                      name="customwinner"
                      variant="outlined"
                      native
                    >
                      {customwinner.map((item) => {
                        return <option key={item.value}>{item.label}</option>;
                      })}
                    </Field>
                    {
                      <div style={{ color: "red" }}>
                        <small>{errors.customwinner}</small>
                      </div>
                    }
                  </Col>
                  <Col className={classes.root}>
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "rgb(252, 143, 0)",
                        margin: "40px 0 0 0",
                        padding: "15px 10px",
                        width: "40%",
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
                        "Set"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <ShowModal
            open={open}
            onClose={handleClose}
            res={response}
            props={props}
          />
        </Container>
      </div>
    </div>
  );
}
export default CustomWinner;
