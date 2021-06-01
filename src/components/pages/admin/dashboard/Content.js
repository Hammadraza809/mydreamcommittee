import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { GroupAdd, Group, Shuffle, ExitToApp, EmojiPeople, Add } from '@material-ui/icons';
import Requests from '../pages/Requests';
import Members from '../pages/Members';
import Winners from '../pages/Winners';
import AddCommittee from '../pages/AddCommittee';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function ClippedDrawer(props) {
    const classes = useStyles();
    const [fragment, setFragment] = useState("Requests")

    const loadFragment = () => {
        switch (fragment) {
            case "Requests":
                return <Requests/>
            case "Members":
                return <Members/>
            case "Winners":
                return <Winners/>
            case "Add_committee":
                return <AddCommittee/>
            default:
                break;
        }
    }

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
                        <ListItem button onClick={e => setFragment("Requests")}>
                            <ListItemIcon>
                                <GroupAdd />
                            </ListItemIcon>
                            <ListItemText primary="Requests" />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button onClick={e => setFragment("Members")}>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="All Members" />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button onClick={e => setFragment("Winners")}>
                            <ListItemIcon>
                                <EmojiPeople />
                            </ListItemIcon>
                            <ListItemText primary="Winners" />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button onClick={e => setFragment("Add_committee")}>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText primary="Add Committes" />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button onClick={() => props.props.push('/draw')}>
                            <ListItemIcon>
                                <Shuffle />
                            </ListItemIcon>
                            <ListItemText primary="Draw" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => {
                            console.log("Logout")
                        }}>
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
