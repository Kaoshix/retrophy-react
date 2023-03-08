import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import troph from "../assets/images/trophy.svg";

export default function UserSettings() {
   const { user } = useContext(AuthContext);

   const [nickName, setNickName] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const [inlineMessage, setInlineMessage] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const datas = {
      nickName: nickName,
      password: password,
   };

   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   async function handleSubmit(event) {
      event.preventDefault();

      if (password !== confirmPassword) {
         setInlineMessage("Password confirmation doesn't match with password");
      } else {
         setIsLoading(true);
         await axios
            .post("http://127.0.0.1:8000/api/registration", datas, config)
            .then((response) => {
               console.log(response);
            })
            .catch((error) => {
               console.log(error);
               setInlineMessage(error["response"].data);
               setIsLoading(false);
            });
      }
   }
   return (
      <>
         {user ? (
            <div className="max-w-screen mb-5">
               <img
                  src={user.avatarPath}
                  alt="random"
                  className="m-auto mb-2 h-[80px] w-[80px] rounded-full"
               />
               <h1 className="text-2xl text-center mb-5">{user.nickName}</h1>

               <div className="bg-blue-600 p-3 mb-10 rounded-lg">
                  <h1 className="text-xl text-center mb-5">
                     Trophies Showcase
                  </h1>
                  {user?.trophy?.map((trophy) => (
                     <div key={trophy.id}>
                        <div className="flex justify-center">
                           <img src={troph} alt="trophy" className="mr-2" />
                           <h2 className="text-2xl font-bold">{trophy.name}</h2>
                        </div>
                        <p className="text-center">{trophy.description}</p>
                     </div>
                  ))}
               </div>

               <form
                  className="bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss"
                  onSubmit={handleSubmit}
               >
                  <div className="text-center">
                     <h1 className="text-3xl">Update settings</h1>
                     <div className="flex flex-col pt-3">
                        <label htmlFor="nickName">Nickname</label>
                        <input
                           required
                           type="text"
                           id="nickName"
                           value={nickName}
                           className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                           onChange={(e) => setNickName(e.target.value)}
                        />
                     </div>

                     <div className="flex flex-col pt-3">
                        <label>Password</label>
                        <input
                           required
                           type="password"
                           id="password"
                           className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>

                     <div className="flex flex-col pt-3">
                        <label>Confirm password</label>
                        <input
                           required
                           type="password"
                           id="confirmPassword"
                           className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                     </div>
                     <span className="text-red-500">{inlineMessage}</span>
                     <div className="register">
                        <button
                           className="inline-block bg-blue-800 text-white rounded-lg px-5 py-2 mt-3"
                           type="submit"
                        >
                           {isLoading ? (
                              <svg
                                 className="animate-spin h-5 w-5 text-white"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                              >
                                 <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                 ></circle>
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                 ></path>
                              </svg>
                           ) : (
                              "Update"
                           )}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         ) : (
            "Loading..."
         )}
      </>
   );
}
