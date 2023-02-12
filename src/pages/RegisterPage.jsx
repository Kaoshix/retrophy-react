import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function RegisterPage() {

    const [nickName, setNickName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const history = useHistory();

    const datas = {
        nickName: nickName,
        email: username,
        password: password
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    async function handleRegister(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            return (console.log("Mot de passe incorrect"));
        } else {
            await axios.post('http://127.0.0.1:8000/registration', datas, config)
                .then(response => console.log(response.data))
                .catch(error => console.log(error))
            history.push('/login')
        }
    }

    return (

        <form className="login-register-formular" onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className='input-group'>
                <label htmlFor='nickName'>Nickname</label>
                <input
                    type='text'
                    id='nickName'
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                />
            </div>

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
                <label>Password</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className='input-group'>
                <label>Confirm password</label>
                <input
                    type='password'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className='register'>
                <button className='register-button' type='submit'>Register</button>
            </div>
        </form>
    );
}