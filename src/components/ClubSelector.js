import { Add, JoinFull, Logout } from '@mui/icons-material'
import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@mui/material'
import axios from 'axios';
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const BASE_URL = process.env.REACT_APP_API_URL;

const ClubSelector = (props) => {

    const logoutAuth = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    const [clubs, setClubs] = useState([]);
    const [clubId, setClubId] = useState("");
    const [clubName, setClubName] = useState("");

    // add clubs
    const addClub = (clubName) => {
        axios.post(`${BASE_URL}/api/newClub`,
            {
                name: `${clubName}`,
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
            getClubs();
        }).catch(err => {
            console.log('err', err);
        });
    };

    // join club
    const joinClub = (clubId) => {
        axios.post(`${BASE_URL}/api/joinClub`,
            {
                clubId: `${clubId}`,
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
            getClubs();
        }).catch(err => {
            console.log('err', err);
        });
    };


    const testAddClubs = () => {
        const clubName = prompt('Enter club name', '')
        if (clubName) {
            addClub(clubName);
        }
    };

    const testJoinClubs = () => {
        const clubId = prompt('Enter club code', '')
        if (clubId) {
            joinClub(clubId);
        }
    };

    // get clubs
    const getClubs = () => {
        axios.get(`${BASE_URL}/api/getClubs`, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('res', res);
            setClubs(res.data.clubs);
        }).catch(err => {
            console.log('err', err);
        });
    };

    // open dashboard with club_id
    const openDashboard = (club_id, club_name) => {
        setClubName(club_name);
        setClubId(club_id);
        console.log('clubName', clubName);
    }


    useEffect(() => {
        getClubs();
    }, []);

    return clubId ? <Dashboard clubId={clubId} clubName={clubName} jwt={props.jwt} /> : (
        <Container
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontSize: '3rem',
                    fontWeight: 'medium',
                    color: 'primary',
                    textAlign: 'center',
                    marginBottom: '2rem',
                }}
            >
                Select a Club
            </Typography>

            <List
                sx={{
                    width: '300px',
                    margin: '0 auto',
                    marginBottom: '2rem',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                }}
            >
                {clubs.map((club, index) => (

                    <ListItem button key={club.club_id}
                        sx={{
                            width: '300px',
                            alignItems: 'center',
                        }}
                        onClick={() => openDashboard(club.club_id, club.club_name)}
                    >
                        <ListItemAvatar>
                            <Avatar src={club.logo_url == "" ?
                                "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                                : club.photo_url} />
                        </ListItemAvatar>
                        <ListItemText primary={club.club_name} />
                    </ListItem>)
                )}
                <Divider
                    sx={{
                        margin: '0.5rem 0',
                    }}
                />
                <ListItem button key="Join a Club"
                    sx={{
                        width: '300px',
                        alignItems: 'center',
                    }}
                    onClick={testJoinClubs}
                >
                    <ListItemIcon
                        sx={{
                            marginLeft: '0.5rem',
                            marginRight: '-0.5rem',
                        }}
                    >
                        <JoinFull />
                    </ListItemIcon>
                    <ListItemText primary="Join a Club" />
                </ListItem>
                <ListItem button key="Create a Club"
                    sx={{
                        width: '300px',
                        alignItems: 'center',
                    }}
                    onClick={testAddClubs}
                >
                    <ListItemIcon
                        sx={{
                            marginLeft: '0.5rem',
                            marginRight: '-0.5rem',
                        }}
                    >
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Create a Club" />
                </ListItem>
                <Divider
                    sx={{
                        margin: '0.5rem 0',
                    }}
                />
                <ListItem button key="Logout"
                    sx={{
                        width: '300px',
                        alignItems: 'center',
                    }}
                    onClick={logoutAuth}
                >
                    <ListItemIcon
                        sx={{
                            marginLeft: '0.5rem',
                            marginRight: '-0.5rem',
                        }}
                    >
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Container>
    )
}

export default ClubSelector