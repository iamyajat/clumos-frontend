import { Button, Container, TextField, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';

const Auth = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user', user);
                setError('')
            })
            .catch((error) => {
                console.log('err', error);
                setError(error.message);
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
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
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
                /><br />
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
                            marginTop: '1rem',
                            width: '300px',
                        }}
                    >
                        Signup
                    </Button>
                </div>
            </form>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    fontSize: '1.5rem',
                    color: 'secondary',
                    textAlign: 'center',
                    marginTop: '1rem',
                }}
            >
                {error}
            </Typography>
        </Container>
    );
}
export default Auth