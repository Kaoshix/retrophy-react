import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../App";
import { Button } from "../components/Button";
import { ReactComponent as LoadingIcon } from "../assets/images/loading.svg";

const logoutButton =
   "text-3xl bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-700";
const loginButton = "bg-blue-700 hover:bg-blue-800 text-white mt-1 px-5 py-2";
const registerButton =
   "bg-blue-700 hover:bg-blue-800 text-white mt-1 px-5 py-2";

export default function LoginPage() {
   const {
      login,
      logout,
      isLoggedIn,
      isLoading,
      setIsLoading,
      inlineMessage,
      setInlineMessage,
   } = useContext(AuthContext);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const history = useHistory();

   const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
         await login(username, password);
         history.push("/");
      } catch (err) {
         console.error(err);
         setIsLoading(false);
         setInlineMessage(err["response"].data.message);
      }
   };

   const onClick = () => {
      logout();
   };

   return (
      <div className="max-w-screen mb-10">
         { isLoggedIn ? (
            <div className="text-center">
               <p className="mb-3 text-xl">You are already logged</p>
               <Button options={logoutButton} onClick={onClick}>
                  Logout
               </Button>
            </div>
         ) : (
            <form
               className="bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss"
               onSubmit={handleSubmit}
            >
               <div className="text-center">
                  <h1 className="text-3xl">Login</h1>
                  <div className="flex flex-col pt-3">
                     <label htmlFor="username">Email</label>
                     <input
                        type="username"
                        id="username"
                        className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="password">Password</label>
                     <input
                        type="password"
                        id="password"
                        className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <span className="text-red-500">{inlineMessage}</span>
                  <p className="text-xs mt-2">
                     Forgot your password ?
                     <a href="/#" className="text-blue-600">
                        {" "}
                        Click here
                     </a>
                  </p>

                  <Button options={loginButton} type="submit">
                     {isLoading ? <LoadingIcon /> : "Login"}
                  </Button>

                  <div className="mt-5">
                     <p>Not registered yet ?</p>
                     <Link to="/register">
                        <Button options={registerButton}>Register</Button>
                     </Link>
                  </div>
               </div>
            </form>
         )}
         
      </div>
   );
}
