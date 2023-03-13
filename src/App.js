import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import HomePage from "./pages/HomePage";
import GamesPage from './pages/GamesPage';
import GameDetails from './pages/GameDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGames from "./pages/admin/AdminGames";
import AdminGameShow from "./pages/admin/AdminGameShow";
import AdminGameEdit from "./pages/admin/AdminGameEdit";

import useUser from "./hooks/useUser";
import shortid from 'shortid'
import UserSettings from "./pages/UserSettings";
import AdminGameCreate from "./pages/admin/AdminGameCreate";
import RunPage from "./jsnesComponents/RunPage";

export const AuthContext = React.createContext();

function App() {
    const userActions = useUser()
    const isLoggedIn = userActions.isLoggedIn

    return (
        <AuthContext.Provider value={userActions}>
            <BrowserRouter>
                <div className='p-5 bg-blue-abyss text-white font-medium min-h-screen'>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/games' component={GamesPage} />
                        <Route exact path='/games/:gameId' component={GameDetails} />
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/register' component={RegisterPage} />
                        <Route exact path='/settings' component={UserSettings} />
                        <Route exact path="/games/run/:gameId" component={RunPage} />

                        {isLoggedIn && userActions.user.roles.map(role => (
                            role === 'ROLE_ADMIN' ? [
                                <Route key={shortid.generate()} exact path='/admin_dashboard' component={AdminDashboard} />,
                                <Route key={shortid.generate()} exact path='/admin/games' component={AdminGames} />,
                                <Route key={shortid.generate()} exact path='/admin/games/:gameId' component={AdminGameShow} />,
                                <Route key={shortid.generate()} exact path='/admin/games/:gameId/edit' component={AdminGameEdit} />,
                                <Route key={shortid.generate()} exact path='/admin/game/create' component={AdminGameCreate} />
                            ] : []))}


                        <Route key='100' path="*"><h1>404</h1></Route>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );

}

export default App;
