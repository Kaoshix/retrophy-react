import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RunPage from "./jsnesComponents/RunPage";

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from "./pages/HomePage";
import GamesPage from './pages/GamesPage';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GameDetails } from './pages/GameDetails';
import AdminDashboard from "./pages/AdminDashboard";
import useUser from "./hooks/useUser";
import AdminGames from "./pages/AdminGames";


export const AuthContext = React.createContext();

function App() {
    const userActions = useUser()

    console.log('[user]:', userActions.user)
    const isLoggedIn = userActions.isLoggedIn
    console.log({ isLoggedIn })

    return (
        <AuthContext.Provider value={userActions}>
            <BrowserRouter>
                <div className='bg-slate-900 text-white font-medium overflow-hidden flex flex-col justify-between min-h-screen'>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/games' component={GamesPage} />
                        <Route exact path='/games/:gameId' component={GameDetails} />
                        <Route exact path='/login' render={() => <LoginPage />} />
                        <Route exact path='/register' component={RegisterPage} />
                        <Route exact path="/games/run/:slug" component={RunPage} />

                        {isLoggedIn && userActions.user.roles.map(role => (
                            role === 'ROLE_ADMIN' ?
                                <>
                                    <Route key={role} exact path='/admin_dashboard' render={() => <AdminDashboard isLoggedIn={isLoggedIn} />} />
                                    <Route exact path='/admin/games' component={AdminGames} />
                                </>
                                : null))}


                        <Route path="*"><h1>404</h1></Route>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );

}

export default App;
