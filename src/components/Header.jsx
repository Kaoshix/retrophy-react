import logo from "../assets/images/logo.svg";
import '../pages/Animations.css';

function Header() {
    return (
        <header className="flex justify-between font-medium text-lg p-4 pb-5">
            <div className="flex items-end">
                <a href="" className="flex items-end">
                    <img src={logo} alt={logo} className="pr-3 pb-[7px]" />
                    <p className="pr-12 text-2xl">Retrophy</p>
                </a>
                <nav>
                    <ul className="flex">
                        <li className="pr-5"><a href="" className="nav-anim">Home</a></li>
                        <li className="pr-5"><a href="" className="nav-anim">Games</a></li>
                        <li><a href="#" className="nav-anim">Community</a></li>
                    </ul>
                </nav>
            </div>

            <ul className="flex items-end">
                <li className="pr-5"><a href="#" className="nav-anim">Login</a></li>
                <li><a href="#" className="nav-anim">Register</a></li>
            </ul>
        </header>
    )
}

export default Header;