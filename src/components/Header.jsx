// CSS files and images
import logo from "../assets/images/logo.svg";
import './Header.css';

// Routes
import { Link } from 'react-router-dom';
import { Fragment } from "react";



function Header(props) {
    return (

        <header>
            <Link to='/' className="flex items-end ml-3">
                <img src={logo} alt={logo} className="pr-3 pb-[7px]" />
                <p className="text-2xl">Retrophy</p>
            </Link>
            {/* <button className="burger-icon">&#9776;</button> */}
            <nav>
                <ul className="flex items-end">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/games'>Games</Link></li>
                    <li><a href="/#">Community</a></li>

                    {props.isLoggedIn ?
                        <Fragment>
                            {props.user ?
                                <li className="le_test">
                                    {props.user.nickName}
                                    <ul className="hidden_test">

                                        {props.user.roles.map(role => (
                                            role === 'ROLE_ADMIN' && <li key={role}><Link to='/admin_dashboard'>Admin Dashboard</Link></li>
                                        ))}

                                        <li>My profil</li>

                                        <li>
                                            <button onClick={props.handleLogout}>Logout</button>
                                        </li>
                                    </ul>

                                </li>
                                : 'Loading...'
                            }
                        </Fragment>
                        :
                        <button><Link to='/login' className="bg-cyan-500 shadow-lg shadow-cyan-500/50 py-2 px-6 rounded-lg">Login</Link></button>

                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;