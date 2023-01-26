import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AdminGameEdit() {


    const [title, setTitle] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const history = useHistory();

    const datas = {
        title: title,
        email: username,
        password: password
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    async function handleEdit(event) {

        event.preventDefault();

        await axios.post('http://127.0.0.1:8000/api/registration', datas, config)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        history.push('/admin/games')
    }

    return (

        <form className="login-register-formular" onSubmit={handleEdit}>
            <div className='input-group'>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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