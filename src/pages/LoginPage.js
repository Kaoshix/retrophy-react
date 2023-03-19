// Assets
import { ReactComponent as LoadingIcon } from "../assets/images/loading.svg";

// React - packages
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";

// Components
import Button from "../components/Button";

// Custom hooks
import { AuthContext } from "../App";

const logoutButton = "bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-700";
const loginButton = "bg-blue-700 hover:bg-blue-800";
const registerButton = "bg-blue-700 hover:bg-blue-800";

export default function LoginPage() {
   const {
      user,
      login,
      logout,
      isLoadingUser,
      isLoadingRequest,
      setIsLoadingRequest,
      inlineMessage,
      setInlineMessage,
   } = useContext(AuthContext);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const history = useHistory();

   const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoadingRequest(true);
      try {
         await login(username, password);
         history.push("/");
      } catch (err) {
         console.error(err);
         setIsLoadingRequest(false);
         setInlineMessage(err["response"].data.message);
      }
   };

   return (
      <div className="max-w-screen mb-10">
         {isLoadingUser ? (
            "Loading..."
         ) : user ? (
            <div className="text-center">
               <p className="mb-3 text-xl">You are already logged</p>
               <Button color={logoutButton} onClick={logout}>
                  Logout
               </Button>
            </div>
         ) : (
            <form className="m-auto max-w-lg rounded-3xl bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleSubmit}>
               <div className="text-center">
                  <h1 className="text-3xl">Login</h1>
                  <div className="flex flex-col pt-3">
                     <label htmlFor="username">Email</label>
                     <input
                        type="username"
                        id="username"
                        className="m-auto mt-1 w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="password">Password</label>
                     <input
                        type="password"
                        id="password"
                        className="m-auto mt-1 w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <span className="text-red-500">{inlineMessage}</span>
                  <p className="mt-2 text-xs">
                     Forgot your password ?
                     <a href="/#" className="text-blue-600">
                        {" "}
                        Click here
                     </a>
                  </p>

                  <Button color={loginButton} type="submit">
                     {isLoadingRequest ? <LoadingIcon /> : "Login"}
                  </Button>

                  <div className="mt-5">
                     <p>Not registered yet ?</p>
                     <Link to="/register">
                        <Button color={registerButton}>Register</Button>
                     </Link>
                  </div>
               </div>
            </form>
         )}
      </div>
   );
}
