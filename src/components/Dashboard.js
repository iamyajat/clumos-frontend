import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { ExpandLess, ExpandMore, Logout, Settings, Edit, Videocam, ContentCopy, CallEnd, ListAlt } from '@mui/icons-material';
import { Collapse, Fab, ListItemButton, Stack } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import MessageCard from './MessageCard';
import NoAnnouncements from '../assets/noannouncements.svg';
import logo from '../assets/logo.png';
import VideoCall from './VideoCall';
import Milestones from './Milestones';

const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_API_URL;


const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openProject, setOpenProject] = useState(true);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedProjectName, setSelectedProjectName] = useState("");

    const handleClickProject = () => {
        setOpenProject(!openProject);
    };

    const roleName = props.role == 1 ? "Admin" : "Member";

    const [openEvent, setOpenEvent] = useState(true);

    const handleClickEvent = () => {
        setOpenEvent(!openEvent);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutAuth = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    // get announcements
    const [announcements, setAnnouncements] = useState([]);
    const getAnnouncements = () => {
        // console.log(process.env.REACT_APP_API_KEY);
        axios.post(`${BASE_URL}/api/getAnnouncements`, {
            clubId: `${props.clubId}`,
        }, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('announcements', res);
            // sort response on the basis of date
            const sortedAnnouncements = res.data.announcements.sort((a, b) => {
                return new Date(b.posted_date) - new Date(a.posted_date);
            });
            console.log('sortedAnnouncements', sortedAnnouncements);

            setAnnouncements(sortedAnnouncements);
        }).catch(err => {
            console.log('err', err);
        });
    };
    useEffect(() => {
        getAnnouncements();
        getProjects();
        setSelectedProject("");
        setSelectedProjectName("");
        setShowMilestone(false);
    }, [props.clubId]);

    // post announcement
    const postAnnouncement = (announcement) => {
        axios.post(`${BASE_URL}/api/newAnnouncement`,
            {
                clubId: `${props.clubId}`,
                title: `${announcement.title}`,
                content: `${announcement.content}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${props.jwt}`
                },
                params: {
                    apiKey: process.env.REACT_APP_API_KEY
                }
            }
        ).then(res => {
            console.log('res', res);
            if (selectedProject === "")
                getAnnouncements();
        }).catch(err => {
            console.log('err', err);
            alert('Not authorized to post an announcement');
        });
    };

    // test post announcement
    const testPostAnnouncement = () => {
        const title = prompt('Enter announcement title', '');
        const content = prompt('Enter announcement content', '');
        if (title && content) {
            postAnnouncement({
                title: title,
                content: content
            });
        } else {
            alert('Please enter title and content');
        }
    };

    //get Projects
    const [projects, setProjects] = useState([]);
    const getProjects = () => {
        axios.post(`${BASE_URL}/api/getProjects`, {
            clubId: `${props.clubId}`,
        }, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('projects', res);
            setProjects(res.data.projects);
        }).catch(err => {
            console.log('err', err);
        });
    }

    // join project
    const joinProject = () => {
        const projId = prompt('Enter code', '');
        axios.post(`${BASE_URL}/api/joinProject`, {
            prjId: `${projId}`,
        }, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('join project', res);
            getProjects();
        }).catch(err => {
            console.log('err', err);
        });
    }

    // create new project
    const createNewProject = (isEvent) => {
        const name = prompt('Enter name', '');
        axios.post(`${BASE_URL}/api/newProject`,
            {
                "clubId": props.clubId,
                "name": name,
                "deadline": null,
                "isEvent": isEvent
            }
            , {
                headers: {
                    Authorization: `Bearer ${props.jwt}`
                },
                params: {
                    apiKey: process.env.REACT_APP_API_KEY
                }
            }).then(res => {
                getProjects();
                const PE = isEvent == "Y" ? "event" : "project";
                const title = `Join ${PE} ${name}`
                const content = `I have created ${name}. Join the ${PE} using the code "${res.data.prj_id}".`
                const ann = {
                    title,
                    content
                };
                postAnnouncement(ann)
                console.log('res', res);
            }).catch(err => {
                console.log('err', err);
            });
    };

    //get project messages
    const getProjectMessages = (proj_id) => {
        axios.post(`${BASE_URL}/api/getProjectMessages`, {
            prjId: proj_id
        }, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('announcements', res);
            // sort response on the basis of date
            const sortedAnnouncements = res.data.announcements.sort((a, b) => {
                return new Date(b.posted_date) - new Date(a.posted_date);
            });
            console.log('sortedAnnouncements', sortedAnnouncements);

            setAnnouncements(sortedAnnouncements);
        }).catch(err => {
            console.log('err', err);
        });
    }

    // post project message
    const postProjectMessage = (announcement) => {
        axios.post(`${BASE_URL}/api/newProjectMessage`,
            {
                prjId: selectedProject,
                title: `${announcement.title}`,
                content: `${announcement.content}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${props.jwt}`
                },
                params: {
                    apiKey: process.env.REACT_APP_API_KEY
                }
            }
        ).then(res => {
            console.log('res', res);
            getProjectMessages(selectedProject);
        }).catch(err => {
            console.log('err', err);
        });
    };

    // test post project message
    const postTestProjectMessage = () => {
        const title = prompt('Enter message title', '');
        const content = prompt('Enter message content', '');
        if (title && content) {
            postProjectMessage({
                title: title,
                content: content
            });
        } else {
            alert('Please enter title and content');
        }
    }

    // start video call
    const [videoCall, setVideoCall] = useState(false);
    const startVideoCall = () => {
        setVideoCall(!videoCall);
        if (videoCall) {
            if (selectedProjectName !== "")
                postProjectMessage({
                    title: "Video call started",
                    content: "I have started a video call. Please join."
                });
            else {
                if (props.role == 1)
                    postAnnouncement({
                        title: "Video call started",
                        content: "I have started a video call. Please join."
                    });
            }
        }
    }

    const [showMilestone, setShowMilestone] = useState(false);

    const drawer = (
        <div>
            <Toolbar>
                {/* add logo */}
                <img src={logo} alt="logo" style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem", width: "100%" }} />
            </Toolbar>
            <Divider />
            <List>
                <ListItem button key="Announcements"
                    onClick={() => {
                        getAnnouncements();
                        setSelectedProject("");
                        setSelectedProjectName("");
                        setShowMilestone(false);
                    }}
                    selected={selectedProject === ""}
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <ListItemText primary="Announcements" sx={{ pl: 2 }} />
                </ListItem>
                <Divider />
                <ListItemButton onClick={handleClickProject}>
                    <ListItemText primary="Projects" sx={{ pl: 2 }} />
                    {openProject ? <ExpandLess sx={{ mr: 2 }} /> : <ExpandMore sx={{ mr: 2 }} />}
                </ListItemButton>
                <Collapse in={openProject} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {projects.map((proj, index) =>
                            proj.is_event === "Y" ? null : (<ListItemButton button key={proj.prj_id} sx={{ pl: 6 }}
                                onClick={() => {
                                    getProjectMessages(proj.prj_id);
                                    setSelectedProject(proj.prj_id);
                                    setSelectedProjectName(proj.prj_name);
                                    setShowMilestone(false);
                                    setVideoCall(false);
                                }}
                                selected={selectedProject === proj.prj_id}
                            >
                                <ListItemText primary={proj.prj_name} />
                            </ListItemButton>)
                        )}
                    </List>
                </Collapse>
                {/* <Divider
                    sx={{
                        ml: "0.75rem",
                        mr: "0.75rem",
                        mb: "0.5rem",
                    }}

                /> */}
                <ListItemButton button sx={{ pl: 4 }}
                    onClick={() => {
                        joinProject();
                    }}
                >
                    <ListItemText primary="Join Project" />
                </ListItemButton>
                {props.role == 1 ? (
                    <ListItemButton button sx={{ pl: 4 }}
                        onClick={() => {
                            createNewProject("N");
                        }}
                    >
                        <ListItemText primary="Create Project" />
                    </ListItemButton>) : null}
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={handleClickEvent}>
                    <ListItemText primary="Events" sx={{ pl: 2 }} />
                    {openEvent ? <ExpandLess sx={{ mr: 2 }} /> : <ExpandMore sx={{ mr: 2 }} />}
                </ListItemButton>
                <Collapse in={openEvent} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {projects.map((proj, index) =>
                            proj.is_event === "Y" ? (
                                <ListItemButton button key={proj.prj_id} sx={{ pl: 6 }}
                                    onClick={() => {
                                        getProjectMessages(proj.prj_id);
                                        setSelectedProject(proj.prj_id);
                                        setSelectedProjectName(proj.prj_name);
                                        setShowMilestone(false);
                                        setVideoCall(false);
                                    }}
                                    selected={selectedProject === proj.prj_id}
                                >
                                    <ListItemText primary={proj.prj_name} />
                                </ListItemButton>
                            ) : null
                        )}

                    </List>
                </Collapse>
                {/* <Divider
                    sx={{
                        ml: "0.75rem",
                        mr: "0.75rem",
                        mb: "0.5rem",
                    }}
                /> */}
                <ListItemButton button sx={{ pl: 4 }}
                    onClick={() => {
                        joinProject();
                    }}
                >
                    <ListItemText primary="Join Event" />
                </ListItemButton>
                {props.role == 1 ? (
                    <ListItemButton button sx={{ pl: 4 }}
                        onClick={() => {
                            createNewProject("Y");
                        }}
                    >
                        <ListItemText primary="Create Event" />
                    </ListItemButton>) : null}
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <ListAlt sx={{ ml: 1 }} />
                    </ListItemIcon>
                    <ListItemText primary="My Milestones" />
                </ListItem>
            </List>
            {/* logout button stick at bottom of drawer */}
            <List>
                <ListItem button key="Logout"
                    onClick={logoutAuth}
                >
                    <ListItemIcon>
                        <Logout sx={{ ml: 1 }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    // console.log()

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {props.clubName}{selectedProjectName === "" ? "" : " - " + selectedProjectName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {
                    videoCall ? (<VideoCall person={props.person} roomName={`clumos-${props.clubId}-${selectedProject}`} />) :
                        showMilestone ? (<Milestones projectId={selectedProject} jwt={props.jwt} />) :
                            announcements.length > 0 ? (
                                announcements.map((announcement, index) => (
                                    <MessageCard
                                        title={announcement.title}
                                        content={announcement.content}
                                        date={announcement.posted_date}
                                        posted_by={announcement.posted_user.user_name}
                                        key={index} />
                                ))
                            ) : (
                                // align box in the middle of the screen
                                <Stack sx={{
                                    p: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '80vh'
                                }}

                                >
                                    {/* add image */}
                                    <img src={NoAnnouncements} alt="no-announcements"
                                        width={[300, 400, 500]}
                                    />
                                    <br />
                                    <Typography variant="h5" component="h2">
                                        No {selectedProject === "" ? "Announcements" : "Messages"}
                                    </Typography>
                                </Stack>
                            )
                }
                {selectedProject !== "" ? (

                    <Fab color="success"
                        aria-label="edit"
                        onClick={() => {
                            setShowMilestone(true);
                        }}
                        sx={{
                            position: 'fixed',
                            bottom: '10rem',
                            right: '1rem',
                            zIndex: '1000',
                        }}
                    >
                        <ListAlt />
                    </Fab>) : null}
                {props.role == 1 || selectedProject !== "" ? (
                    <Fab color="secondary"
                        aria-label="edit"
                        onClick={selectedProject === '' ? testPostAnnouncement : postTestProjectMessage}
                        sx={{
                            position: 'fixed',
                            bottom: '1rem',
                            right: '1rem',
                            zIndex: '1000',
                        }}
                    >
                        <Edit />
                    </Fab>) : null}

                {props.role == 1 || selectedProject !== "" ? (

                    <Fab color={videoCall ? "error" : "primary"}
                        aria-label="edit"
                        onClick={startVideoCall}
                        sx={{
                            position: 'fixed',
                            bottom: '5.5rem',
                            right: '1rem',
                            zIndex: '1000',
                        }}
                    >
                        {videoCall ? (<CallEnd />) : (<Videocam />)}
                    </Fab>) : (

                    <Fab color={videoCall ? "error" : "primary"}
                        aria-label="edit"
                        onClick={startVideoCall}
                        sx={{
                            position: 'fixed',
                            bottom: '1rem',
                            right: '1rem',
                            zIndex: '1000',
                        }}
                    >
                        {videoCall ? (<CallEnd />) : (<Videocam />)}
                    </Fab>)
                }
                <Fab variant="extended" color="primary" aria-label="add"
                    onClick={selectedProject === "" ? () => { navigator.clipboard.writeText(props.clubId) }
                        : () => { navigator.clipboard.writeText(selectedProject) }}
                    sx={{
                        position: 'fixed',
                        bottom: '1rem',
                        zIndex: '1000',
                    }}
                >
                    <ContentCopy sx={{ mr: 1 }} />
                    {selectedProject === "" ? "Club Code" : "Project Code"}
                </Fab>
            </Box>
        </Box>
    );
}


Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard