import Header from './components/Header';
import HomePage from "./pages/HomePage";
import Footer from './components/Footer';

import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GamesPage from './pages/GamesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GameDetails } from './pages/GameDetails';

function App() {
    return (
        <BrowserRouter>
            <div className='bg-slate-900 text-white font-medium overflow-hidden min-h-screen'>
                <Header />

                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/games' element={<GamesPage />} />
                    <Route path='/games/:itemId' element={<GameDetails />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App;