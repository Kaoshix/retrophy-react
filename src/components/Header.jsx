// CSS files and images
import logo from "../assets/images/logo.svg";
import './Header.css';

// Routes
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link to='/' className="flex items-end ml-3">
                <img src={logo} alt={logo} className="pr-3 pb-[7px]" />
                <p className="text-2xl">Retrophy</p>
            </Link>
            {/* <button className="burger-icon">&#9776;</button> */}
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/games'>Games</Link></li>
                    <li><a href="/#">Community</a></li>
                    <button><Link to='/login' className="bg-cyan-500 shadow-lg shadow-cyan-500/50 py-2 px-6 rounded-lg">Login</Link></button>
                </ul>
            </nav>
        </header>
    )
}

export default Header;