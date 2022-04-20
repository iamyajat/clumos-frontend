import { Alert, Button, Container, Snackbar, TextField, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";


const Auth = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [signup, setSignup] = useState(false);
    const BASE_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getAuth().onAuthStateChanged(user => {
            if (user) {
                console.log('user logged in', user);
            } else {
                console.log('user logged out');
            }
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        if (signup) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('user', user);
                    axios.post(`${BASE_URL}/auth/signup`, {
                        authtoken: user.accessToken,
                        name: name,
                    },
                        {
                            params: {
                                apiKey: process.env.REACT_APP_API_KEY
                            }
                        }
                    ).then(res => {
                        console.log('res', res);
                        setError('')
                        setSuccess('Signed up successfully!');
                        props.logAuth(true);
                    }).catch(err => {
                        console.log('err', err);
                        setSuccess('');
                        setError(err.message);
                        props.logAuth(false);
                    });
                })
                .catch((error) => {
                    console.log('err', error);
                    setError(error.message);
                    setSuccess('');
                    props.logAuth(false);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('user', user);
                    axios.post(`${BASE_URL}/auth/login`, {
                        authtoken: user.accessToken,
                    },
                        {
                            params: {
                                apiKey: process.env.REACT_APP_API_KEY
                            }
                        }
                    ).then(res => {
                        console.log('res', res);
                        setError('')
                        setSuccess('Logged in successfully!');
                        props.logAuth(true);
                    }).catch(err => {
                        console.log('err', err);
                        setSuccess('');
                        setError(err.message);
                        props.logAuth(false);
                    });
                })
                .catch((error) => {
                    console.log('err', error);
                    setError(error.message);
                    setSuccess('');
                    props.logAuth(false);
                });
        }
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
                {signup ? 'Sign Up' : 'Login'}
            </Typography>
            <form onSubmit={handleSubmit}>
                {signup ? (<>
                    <TextField
                        label="Name"
                        variant="outlined"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        sx={{
                            marginBottom: '1rem',
                            width: '300px',
                        }}
                    />
                    <br /></>) : null}
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{
                        marginBottom: '1rem',
                        width: '300px',
                    }}
                /><br />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    sx={{
                        marginBottom: '1rem',
                        width: '300px',
                    }}
                />
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: '0.5rem',
                            marginBottom: '1rem',
                            width: '300px',
                        }}
                    >
                        {signup ? 'Sign Up' : 'Login'}
                    </Button>
                </div>
            </form>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    fontSize: '1rem',
                    color: 'secondary',
                    textAlign: 'center',
                    marginTop: '1rem',
                }}
            >
                {signup ? 'Already have an account? ' : 'Don\'t have an account? '}
                <span
                    onClick={() => setSignup(!signup)}
                    style={{
                        cursor: 'pointer',
                        color: 'primary',
                        textDecoration: 'underline',
                    }}
                >
                    {signup ? 'Login' : 'Sign Up'}
                </span>
            </Typography>
            <Snackbar
                open={error !== ''}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
            <Snackbar
                open={success !== ''}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success">{success}</Alert>
            </Snackbar>
        </Container>
    );
}
export default Auth