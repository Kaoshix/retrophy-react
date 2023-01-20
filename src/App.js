import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RunPage from "./jsnesComponents/RunPage";

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from "./pages/HomePage";
import GamesPage from './pages/GamesPage';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GameDetails } from './pages/GameDetails';
import { useState, useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";

import axios from 'axios';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('http://127.0.0.1:8000/api/me')
                .then(response => {
                    setUser(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }, []);

    return (
        <BrowserRouter>
            <div className='bg-slate-900 text-white font-medium overflow-hidden flex flex-col justify-between min-h-screen'>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} user={user} />

                <Route exact path='/' component={HomePage} />
                <Route exact path='/games' component={GamesPage} />
                <Route exact path='/games/:gameId' component={GameDetails} />
                <Route exact path='/login' render={() => <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path="/games/run/:slug" component={RunPage} />

                {user && user.roles.map(role => (
                    role === 'ROLE_ADMIN' &&
                    <Route key={role} exact path='/admin_dashboard' render={() => <AdminDashboard isLoggedIn={isLoggedIn} />} />
                ))}

                {/* Il faudra penser à ajouter une route pour les erreurs */}
                <Footer />
            </div>
        </BrowserRouter>
    );

}

export default App;
