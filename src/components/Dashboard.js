import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { AddLocation, EditNotifications, ExpandLess, ExpandMore, Logout, Settings, Edit } from '@mui/icons-material';
import { Collapse, Fab, ListItemButton } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import MessageCard from './MessageCard';

const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_API_URL;


const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openProject, setOpenProject] = useState(true);

    const handleClickProject = () => {
        setOpenProject(!openProject);
    };

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
            setAnnouncements(res.data.announcements);
        }).catch(err => {
            console.log('err', err);
        });
    };
    useEffect(() => {
        getAnnouncements();
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
            getAnnouncements();
        }).catch(err => {
            console.log('err', err);
        });
    };

    // test post announcement
    const testPostAnnouncement = () => {
        const title = prompt('Enter announcement title', '');
        const content = prompt('Enter announcement content', '');
        const announcement = {
            title,
            content
        };
        postAnnouncement(announcement);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItemButton onClick={handleClickProject}>
                    <ListItemText primary="Projects" sx={{ pl: 2 }} />
                    {openProject ? <ExpandLess sx={{ mr: 2 }} /> : <ExpandMore sx={{ mr: 2 }} />}
                </ListItemButton>
                <Collapse in={openProject} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['VITTY', 'Thinker', 'Songified'].map((text, index) => (
                            <ListItemButton button key={text} sx={{ pl: 6 }}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={handleClickEvent}>
                    <ListItemText primary="Events" sx={{ pl: 2 }} />
                    {openEvent ? <ExpandLess sx={{ mr: 2 }} /> : <ExpandMore sx={{ mr: 2 }} />}
                </ListItemButton>
                <Collapse in={openEvent} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['WT22', 'Hexathon', 'DJ22'].map((text, index) => (
                            <ListItemButton button key={text} sx={{ pl: 6 }}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List>
                {['Settings'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <Settings sx={{ ml: 1 }} />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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
                        {props.clubName}
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
                {announcements.map((announcement, index) => (
                    <MessageCard title={announcement.title} content={announcement.content} key={index} />
                ))}
                <Fab color="secondary"
                    aria-label="edit"
                    onClick={testPostAnnouncement}
                    sx={{
                        position: 'fixed',
                        bottom: '1rem',
                        right: '1rem',
                        zIndex: '1000',
                    }}
                >
                    <Edit />
                </Fab>
            </Box>
        </Box>
    );
}


Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard