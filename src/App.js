// React - packages
import React, { createContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import shortid from "shortid";

// Custom hooks
import useUser from "./hooks/useUser";
import ScrollToTop from "./hooks/ScrollToTop";

// Layouts
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";

// Common pages
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GameDetails from "./pages/GameDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserSettings from "./pages/UserSettings";
import RunPage from "./jsnesComponents/RunPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGames from "./pages/admin/AdminGames";
import AdminGameShow from "./pages/admin/AdminGameShow";
import AdminGameEdit from "./pages/admin/AdminGameEdit";
import AdminGameCreate from "./pages/admin/AdminGameCreate";

export const AuthContext = createContext();
function App() {
   const userActions = useUser();
   const filteredAdminRole = userActions?.user?.roles.filter((role) => role === "ROLE_ADMIN");

   return (
      <AuthContext.Provider value={userActions}>
         <BrowserRouter>
            <ScrollToTop />

            <div className="min-h-screen bg-blue-abyss p-5 pb-40 font-medium text-white">
               <Header />
               <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/games" component={GamesPage} />
                  <Route exact path="/games/:gameId" component={GameDetails} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/settings" component={UserSettings} />
                  <Route exact path="/games/run/:gameId" component={RunPage} />

                  {userActions?.user ? (
                     filteredAdminRole.length > 0 ? (
                        filteredAdminRole.map(() => [
                           <Route key={shortid.generate()} exact path="/admin_dashboard" component={AdminDashboard} />,
                           <Route key={shortid.generate()} exact path="/admin/games" component={AdminGames} />,
                           <Route
                              key={shortid.generate()}
                              exact
                              path="/admin/games/:gameId"
                              component={AdminGameShow}
                           />,
                           <Route
                              key={shortid.generate()}
                              exact
                              path="/admin/games/:gameId/edit"
                              component={AdminGameEdit}
                           />,
                           <Route
                              key={shortid.generate()}
                              exact
                              path="/admin/game/create"
                              component={AdminGameCreate}
                           />,
                        ])
                     ) : (
                        <Route>
                           <h1 className="text-center text-3xl">403 : Forbidden access</h1>
                        </Route>
                     )
                  ) : (
                     <Route>
                        <h1 className="text-center text-3xl">403 : Forbidden access</h1>
                     </Route>
                  )}
               </Switch>
               <Footer />
            </div>
         </BrowserRouter>
      </AuthContext.Provider>
   );
}

export default App;
