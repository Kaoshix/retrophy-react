import { Link } from 'react-router-dom';
import './LoginRegisterPage.css';

export const LoginPage = () => {
    return (
        <div>
            <form className="login-register-formular">
            <h1>Login</h1>
                <div className='input-group'>
                    <label>Username</label>
                    <input type='text' />
                </div>

                <div className='input-group'>
                    <label>Password</label>
                    <input type='password' />
                </div>
                <a href='/#' className='forgot-password'>Forgot your password ? Click here</a>

                <button className='login-button'>Login</button>

                <div className='register'>
                    <p>Not registered yet ?</p>
                    <button className='register-button'><Link to='/register'>Register</Link></button>
                </div>
            </form>
        </div>
    );
}