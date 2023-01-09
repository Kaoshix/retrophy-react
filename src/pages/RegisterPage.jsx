import './LoginRegisterPage.css';

export const RegisterPage = () => {
    return (
        <div>
            <form className="login-register-formular">
            <h1>Register</h1>
                <div className='input-group'>
                    <label>Username</label>
                    <input type='text' />
                </div>

                <div className='input-group'>
                    <label>Email</label>
                    <input type='text' />
                </div>

                <div className='input-group'>
                    <label>Password</label>
                    <input type='password' />
                </div>

                <div className='input-group'>
                    <label>Confirm password</label>
                    <input type='password' />
                </div>

                <div className='register'>
                    <button className='register-button'><a href='/#'>Register</a></button>
                </div>
            </form>
        </div>
    );
}