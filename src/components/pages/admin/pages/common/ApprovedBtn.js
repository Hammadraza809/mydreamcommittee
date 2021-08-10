import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShowModal from "../common/ShowModel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
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

function ApprovedBtn(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([null]);

  const handleClose = () => {
    setOpen(false);
    props.func();
  };

  const changeStatus = async () => {
    setLoading(true);
    await fetch(
      `https://mydreamcommittee.com/v1/controller/user.php?committee=${props.request.committee}&status=approved`,
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
        console.log(result.data.users.length);
        const id = result.data.users.length + 1;
        const member = props.request.committee;
        const comp = member + "-" + id;
        const obj = {
          membershipId: comp,
          status: "approved",
        };
        console.log(props.request.id, "========", obj);
        fetch(`https://mydreamcommittee.com/v1/users/${props.request.id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.statusCode === 200) {
              setLoading(false);
              setResponse(result.messages + " Refreh page.");
              setOpen(true);
            } else {
              setLoading(false);
              setResponse("Error. User not updated.");
              setOpen(true);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            alert("Connect timeout. Please refresh the page to laod content.");
            return null;
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button
        style={{
          color: "white",
          backgroundColor: "rgb(252, 143, 0)",
          padding: "10px 10px",
        }}
        variant="contained"
        onClick={() => {
          changeStatus();
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
          "Accept"
        )}
      </Button>
      <ShowModal open={open} onClose={handleClose} res={response} />
    </div>
  );
}
export default ApprovedBtn;
