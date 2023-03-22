// React - packages
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";

// Components
import Button from "../components/Button";
import { Loading } from "../components/Loading";

// Custom hooks
import { AuthContext } from "../App";

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
         setIsLoadingRequest(false);
         setInlineMessage(err["response"]?.data.message);
      }
   };

   return (
      <div className="max-w-screen mb-10">
         {isLoadingUser ? (
            "Loading..."
         ) : user ? (
            <div className="text-center">
               <p className="mb-3 text-xl">You are already logged</p>
               <Button color="red" onClick={logout}>
                  Logout
               </Button>
            </div>
         ) : (
            <form className="m-auto max-w-lg rounded-lg bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleSubmit}>
               <div className="text-center">
                  <h1 className="mb-5 text-3xl">Login</h1>
                  <div className="mb-5 flex flex-col">
                     <label htmlFor="username" className="mb-1">
                        Email
                     </label>
                     <input
                        required
                        type="username"
                        id="username"
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>

                  <div className="mb-3 flex flex-col">
                     <label htmlFor="password" className="mb-1">
                        Password
                     </label>
                     <input
                        required
                        type="password"
                        id="password"
                        className="m-auto mb-1 w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                     <p className="text-xs">
                        Forgot your password ?
                        <a href="/#" className="ml-1 text-blue-600 underline underline-offset-2">
                           Click here
                        </a>
                     </p>
                     <span className="text-red-500">{inlineMessage}</span>
                  </div>
                  <div className="mb-5">
                     <Button color="blue" type="submit">
                        {isLoadingRequest ? <Loading /> : "Login"}
                     </Button>
                  </div>

                  <div>
                     <p className="mb-1">Not registered yet ?</p>
                     <Link to="/register">
                        <Button color="blue">Register</Button>
                     </Link>
                  </div>
               </div>
            </form>
         )}
      </div>
   );
}
