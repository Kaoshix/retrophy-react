import { Link, useHistory } from 'react-router-dom';
import './LoginRegisterPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const LoginPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password)
            .then((data) => {
                // handle successful login
                console.log(data);
                localStorage.setItem('token', data.token);
                props.setIsLoggedIn(true);
                setRedirect(true);
            })
            .catch((error) => {
                // handle login error
                console.error(error);
                setError(error);
            });
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login_check', { username, password });
            const { data } = response;
            return data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        if (redirect) {
            history.push('/');
        }
    }, [redirect, history])

    return (
        <div>
            {localStorage.getItem('token') ?
                <div>
                    <p>You are already logged</p>
                    <button onClick={props.handleLogout}>Logout</button>
                </div>
                :
                <form className="login-register-formular" onSubmit={handleSubmit}>
                    <div>
                        {error && <p>Erreur</p>}
                        <h1>Login</h1>
                        <div className='input-group'>
                            <label htmlFor='username'>Email</label>
                            <input
                                type='username'
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <a href='/#' className='forgot-password'>Forgot your password ? Click here</a>

                        <button className='login-button' type='submit'>Login</button>

                        <div className='register'>
                            <p>Not registered yet ?</p>
                            <button className='register-button'><Link to='/register'>Register</Link></button>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}