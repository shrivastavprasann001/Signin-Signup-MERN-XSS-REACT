import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios.js';
const LOGIN_URL = '/signin';

const Login = () => {
    const { setAuth } = useContext(AuthContext); // Access the setAuth function from context
    const emailRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                }
            );
            const token = response?.data?.token;
            if (token) {
                console.log(token); // Log the token
                setAuth({ email, token }); // Save the authentication state
                localStorage.setItem('token', token); // Store the token in localStorage
            } else {
                setErrMsg('Token not found in response');
            }
            setEmail('');
            setPassword('');
            setSuccess(true);
            // navigate("/signup")  // if we want to navigate on another page
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(err)
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/signup">Go to signup</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/signup">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;
