import { Add, Logout } from '@mui/icons-material'
import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { getAuth, signOut } from "firebase/auth";

const ClubSelector = () => {

    const logoutAuth = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    return (
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
                <ListItem button key="Club 1"
                    sx={{
                        width: '300px',
                        alignItems: 'center',
                    }}
                >
                    <ListItemAvatar>
                        <Avatar src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                    </ListItemAvatar>
                    <ListItemText primary="Club 1" />
                </ListItem>
                <ListItem button key="Club 2"
                    sx={{
                        width: '300px',
                        alignItems: 'center',
                    }}
                >
                    <ListItemAvatar>
                        <Avatar src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                    </ListItemAvatar>
                    <ListItemText primary="Club 2" />
                </ListItem>
                <ListItem button key="Create a Club"
                    sx={{
                        width: '300px',
                        alignItems: 'center',
                    }}
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