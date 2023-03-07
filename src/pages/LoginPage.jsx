import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../App';

export default function LoginPage() {
    const { login, logout, isLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [inlineMessage, setInlineMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    if (isLoggedIn) history.push('/');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await login(username, password)
            history.push('/')
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setInlineMessage(err["response"].data.message);
        }
    };

    return (
        <div className='max-w-screen mb-10'>
            {isLoggedIn ?
                <div>
                    <p>You are already logged</p>
                    <button onClick={logout}>Logout</button>
                </div>
                :
                <form className="bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss" onSubmit={handleSubmit}>
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
                        <span className="text-red-500">{inlineMessage}</span>
                        <p className='text-xs mt-2'>Forgot your password ?<a href='/#' className='text-blue-600'> Click here</a></p>

                        <button className='inline-block bg-blue-800 text-white rounded-lg mt-1 px-5 py-2' type='submit'>
                        {isLoading ? (
                           <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                              ></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                        ) : (
                           "Login"
                        )}
                        </button>

                        <div className='mt-5'>
                            <p>Not registered yet ?</p>
                            <Link to='/register' className='inline-block bg-blue-800 text-white rounded-lg mt-1 px-5 py-2'>Register</Link>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}