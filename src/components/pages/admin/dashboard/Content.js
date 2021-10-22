import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  GroupAdd,
  Group,
  Shuffle,
  ExitToApp,
  EmojiPeople,
  Add,
} from "@material-ui/icons";
import Requests from "../pages/Requests";
import Members from "../pages/Members";
import Winners from "../pages/Winners";
import AddCommittee from "../pages/AddCommittee";
import GoToDraw from "../pages/common/GoToDrawModal";
import RejectedReq from "../pages/RejectedReq";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();
  const [fragment, setFragment] = useState("Requests");
  const [open, setOpen] = useState(true);

  const userid = localStorage.getItem("user-id");
  const acc_token = localStorage.getItem("acc-token");
  // const ref_token = localStorage.getItem('ref-token');

  if (localStorage.getItem("acc-token") === null) {
    props.props.push("/restricted");
    return null;
  }
  // else {
  //     fetch(`https://mydreamcommittee.com/v1/logout/${userid}`, {
  //         method: 'PATCH',
  //         headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //             'Authorization': acc_token,
  //         },
  //         body: JSON.stringify({
  //             refresh_token: ref_token
  //         })
  //     })
  //     .then(res => res.json())
  //     .then(result => {
  //         console.log(result);
  //         if (result.statusCode === 401) {
  //             localStorage.removeItem('acc-token');
  //             localStorage.removeItem('ref-token');
  //             localStorage.removeItem('user-id');
  //             props.props.push('/expired');
  //             return null;
  //         }
  //         else{
  //             localStorage.setItem('acc-token',result.data.access_token)
  //             localStorage.setItem('ref-token',result.data.refresh_token)
  //             localStorage.setItem('user-id',result.data.session_id)
  //             return;
  //         }
  //     })
  //     .catch(err => console.log(err))
  // }

  const handleClose = () => {
    setOpen(false);
  };

  const loadFragment = () => {
    switch (fragment) {
      case "Requests":
        return <Requests />;
      case "Members":
        return <Members />;
      case "Rejected":
        return <RejectedReq />;
      case "Winners":
        return <Winners />;
      case "Add_committee":
        return <AddCommittee props={props.props} />;
      case "GoToDraw":
        return <GoToDraw open={open} onClose={handleClose} props={props} />;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard - My Dream Committee
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={(e) => setFragment("Requests")}>
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={(e) => setFragment("Members")}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="All Members" />
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={(e) => setFragment("Rejected")}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Rejected Requests" />
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={(e) => setFragment("Winners")}>
              <ListItemIcon>
                <EmojiPeople />
              </ListItemIcon>
              <ListItemText primary="Winners" />
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={(e) => setFragment("Add_committee")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Add Committes" />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={(e) => {
                setOpen(true);
                setFragment("GoToDraw");
              }}
            >
              <ListItemIcon>
                <Shuffle />
              </ListItemIcon>
              <ListItemText primary="Draw" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                fetch(`https://mydreamcommittee.com/v1/controller/sessions.php?sessionid=${userid}`, {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: acc_token,
                  },
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.statusCode === 200) {
                      localStorage.removeItem("acc-token");
                      localStorage.removeItem("ref-token");
                      localStorage.removeItem("user-id");
                      props.props.push("/admin");
                    } else {
                      return null;
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {loadFragment()}
      </main>
    </div>
  );
}
