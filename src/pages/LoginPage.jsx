import { Link, useHistory } from 'react-router-dom';
import './LoginRegisterPage.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../App';

export const LoginPage = () => {
    const { login, logout, isLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    if (isLoggedIn) history.push('/');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password)
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div>
            {isLoggedIn ?
                <div>
                    <p>You are already logged</p>
                    <button onClick={logout}>Logout</button>
                </div>
                :
                <form className="login-register-formular" onSubmit={handleSubmit}>
                    <div>
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