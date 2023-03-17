import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { ReactComponent as LoadingIcon } from "../assets/images/loading.svg";
import { useContext } from "react";
import { AuthContext } from "../App";

const registerButton =
   "bg-blue-700 hover:bg-blue-800 text-white mt-5 px-5 py-2";

export default function RegisterPage() {
   const [nickName, setNickName] = useState("");
   const [email, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [avatarFile, setAvatarFile] = useState("");

   const { inlineMessage, setInlineMessage } = useContext(AuthContext);
   const [isLoading, setIsLoading] = useState(false);

   const history = useHistory();

   const formData = new FormData();
   formData.append("nickName", nickName);
   formData.append("email", email);
   formData.append("password", password);
   formData.append("avatarFile", avatarFile);

   const config = {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   };

   async function handleRegister(event) {
      event.preventDefault();

      if (password !== confirmPassword) {
         setInlineMessage("Password confirmation doesn't match with password");
      } else {
         setIsLoading(true);
         await axios
            .post("http://127.0.0.1:8000/api/register", formData, config)
            .then((response) => {
               console.log(response);
               history.push({
                  pathname: "/",
                  state: { registrationSuccessMessage: "Registration successful ! Please check you emails to confirm your account" }
               });
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
         <div className="max-w-screen mb-10">
            <form
               className="bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss"
               onSubmit={handleRegister}
            >
               <div className="text-center">
                  <h1 className="text-3xl">Register</h1>
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
                     <label htmlFor="email">Email</label>
                     <input
                        required
                        type="email"
                        id="email"
                        className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="password">Password <br /><span className="text-xs">(one lowercase, one uppercase, one number and 8 characters)</span></label>
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

                  <div className="flex flex-col pt-3">
                     <label htmlFor="avatarFile">Avatar</label>
                     <input
                        type="file"
                        id="avatarFile"
                        accept="image/png, image/jpeg, image/webp"
                        className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                        onChange={(e) => {
                           setAvatarFile(e.target.files[0]);
                        }}
                     />
                  </div>

                  <span className="text-red-500">{inlineMessage}</span>
                  <div className="register">
                     <Button options={registerButton} type="submit">
                        {isLoading ? <LoadingIcon /> : "Register"}
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
