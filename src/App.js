// import Header from './components/Header';
// import HomePage from "./pages/HomePage";
// import Footer from './components/Footer';

// import React from "react";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import GamesPage from './pages/GamesPage';
// import { LoginPage } from './pages/LoginPage';
// import { RegisterPage } from './pages/RegisterPage';
// import { GameDetails } from './pages/GameDetails';

// function App() {
//     return (
//         <BrowserRouter>
//             <div className='bg-slate-900 text-white font-medium overflow-hidden min-h-screen'>
//                 <Header />

//                 <Routes>
//                     <Route path='/' element={<HomePage />} />
//                     <Route path='/games' element={<GamesPage />} />
//                     <Route path='/games/:itemId' element={<GameDetails />} />
//                     <Route path='/login' element={<LoginPage />} />
//                     <Route path='/register' element={<RegisterPage />} />
//                 </Routes>

//                 <Footer />
//             </div>
//         </BrowserRouter>
//     )
// }

// export default App;

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RunPage from "./jsnesComponents/RunPage";
import { handleError } from "./jsnesComponents/utils";

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from "./pages/HomePage";
import GamesPage from './pages/GamesPage';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GameDetails } from './pages/GameDetails';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    render() {
        return (
            <BrowserRouter>
                <div className='bg-slate-900 text-white font-medium overflow-hidden min-h-screen'>
                    <Header />

                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/games' component={GamesPage} />
                    <Route exact path='/games/:gameId' component={GameDetails} />
                    <Route exact path='/login' component={LoginPage} />
                    <Route exact path='/register' component={RegisterPage} />
                    <Route exact path="/games/run/:slug" component={RunPage} />

                    <Footer />
                </div>
            </BrowserRouter>
        );
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        handleError(error, errorInfo);
    }

}

export default App;
