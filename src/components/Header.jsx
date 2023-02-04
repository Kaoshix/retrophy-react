import logo from "../assets/images/logo.svg";

import { Link } from 'react-router-dom';
import { Fragment } from "react";

import { useContext } from 'react';
import { AuthContext } from '../App';

export const Header = () => {

    function toggleNav() {
        document.querySelector('nav').classList.toggle('opacity-0');
    }

    function toggleBurger() {
        document.querySelector('.burger-icon').classList.toggle('hidden');
        document.querySelector('.cross-icon').classList.toggle('hidden');
    }

    const { user, loading, logout } = useContext(AuthContext);
    const isLoggedIn = !!user?.id

    return (
        <header className="p-5 lg:flex lg:justify-between lg:items-end">

            <Link to='/' className="flex items-end ml-3">
                <img src={logo} alt={logo} className="pr-3 pb-[7px]" />
                <p className="text-2xl">Retrophy</p>
            </Link>

            <button className="absolute top-10 right-5 z-50 burger-icon lg:hidden" onClick={() => {
                toggleNav();
                toggleBurger();
            }}>
                <svg viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="10" rx="8" fill='white'></rect>
                    <rect y="30" width="100" height="10" rx="8" fill='white'></rect>
                    <rect y="60" width="100" height="10" rx="8" fill='white'></rect>
                </svg>
            </button>

            <button className="absolute top-6 right-1 z-50 hidden cross-icon lg:hidden" onClick={() => {
                toggleNav();
                toggleBurger();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="black" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>

            <nav className="
            opacity-0 ease-in-out duration-300 bg-slate-100 text-black absolute top-0 left-0 w-screen h-full flex flex-col justify-center items-center z-40
            lg:opacity-100 lg:bg-slate-900 lg:text-white lg:relative lg:w-auto lg:h-auto lg:flex lg:items-end
            ">
                <ul className="lg:flex lg:items-center">
                    <li className="
                    text-2xl pb-4 text-center 
                    lg:text-lg lg:pb-0 lg:mr-5" onClick={toggleNav}><Link to='/'>Home</Link></li>
                    <li className="
                    text-2xl pb-4 text-center 
                    lg:text-lg lg:pb-0 lg:mr-5" onClick={toggleNav}><Link to='/games'>Games</Link></li>
                    <li className="
                    text-2xl pb-4 text-center 
                    lg:text-lg lg:pb-0 lg:mr-5" onClick={toggleNav}><a href="/#">Community</a></li>
                    {!!user?.id ?
                        <Fragment>
                            {user ?
                                <Fragment>
                                    <li className="text-2xl text-center lg:text-lg lg:pb-0 relative">
                                        <svg className="block m-auto" height="50" width="50" onClick={() => document.querySelector('.user-settings').classList.toggle('hidden')}>
                                            <circle cx="25" cy="25" r="20" stroke="black" stroke-width="3" fill="red" />
                                        </svg>
                                        <div className="user-settings hidden absolute top-12 left-0 text-center lg:text-left">
                                            <button>Settings</button>
                                            <button onClick={logout}>Logout</button>
                                        </div>

                                    </li>
                                </Fragment>
                                : 'Loading...'
                            }
                        </Fragment>
                        : null
                    }
                    {loading ? '...' :
                        <button className="block m-auto mt-2 lg:mt-0" onClick={toggleNav}>
                            {!isLoggedIn && <Link to='/login' className="
                                                                        text-center text-2xl bg-cyan-500 shadow-lg shadow-cyan-500/50 py-2 px-6 rounded-lg lg:text-lg">Login</Link>}
                        </button>
                    }
                </ul>
            </nav>
        </header>
    )
}