import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../App';

export default function LoginPage() {
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
        <div className='max-w-screen'>
            {isLoggedIn ?
                <div>
                    <p>You are already logged</p>
                    <button onClick={logout}>Logout</button>
                </div>
                :
                <form className="login-register-formular bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss" onSubmit={handleSubmit}>
                    <div className='text-center'>
                        <h1 className='text-3xl'>Login</h1>
                        <div className='flex flex-col pt-3'>
                            <label htmlFor='username'>Email</label>
                            <input
                                type='username'
                                id='username'
                                className='w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col pt-3'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                className='w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <p className='text-xs mt-2'>Forgot your password ?<a href='/#' className='text-blue-600'> Click here</a></p>

                        <button className='inline-block bg-blue-800 text-white rounded-lg mt-5 px-5 py-2' type='submit'>Login</button>

                        <div className='mt-5'>
                            <p>Not registered yet ?</p>
                            <Link to='/register' className='inline-block bg-blue-800 text-white rounded-lg mt-5 px-5 py-2'>Register</Link>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}