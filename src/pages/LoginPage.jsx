import { Link } from 'react-router-dom';
import './LoginRegisterPage.css';
import axios from 'axios';
import { useState } from 'react';

export const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password)
            .then((data) => {
                // handle successful login
                console.log(data);
                setToken(data.token);
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

    return (
        <form className="login-register-formular" onSubmit={handleSubmit}>
            {error && <p>Erreur</p>}
            <h1>Login</h1>
            <div className='input-group'>
                <label htmlFor='username'>Username</label>
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

            
            {token && <button onClick={() => setToken(null)}>Logout</button> }

            <div className='register'>
                <p>Not registered yet ?</p>
                <button className='register-button'><Link to='/register'>Register</Link></button>
            </div>
        </form>
    );
}