// React - packages
import { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Components
import Button from "../components/Button";
import { Loading } from "../components/Loading";

// Custom hooks
import { AuthContext } from "../App";

export default function RegisterPage() {
   const [nickName, setNickName] = useState("");
   const [email, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [avatarFile, setAvatarFile] = useState(null);

   const { inlineMessage, setInlineMessage, isLoadingRequest, setIsLoadingRequest } = useContext(AuthContext);

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
         setIsLoadingRequest(true);
         await axios
            .post("http://127.0.0.1:8000/user/register", formData, config)
            .then((response) => {
               setInlineMessage("");
               setIsLoadingRequest(false);
               history.push({
                  pathname: "/",
                  state: { registrationSuccessMessage: `${response.data}` },
               });
            })
            .catch((error) => {
               setInlineMessage(error["response"].data);
               setIsLoadingRequest(false);
            });
      }
   }

   return (
      <>
         <div className="max-w-screen mb-10">
            <form className="m-auto max-w-lg rounded-lg bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleRegister}>
               <div className="text-center">
                  <h1 className="mb-5 text-3xl">Register</h1>
                  <div className="mb-5 flex flex-col">
                     <label htmlFor="nickName" className="mb-1">
                        Nickname
                     </label>
                     <input
                        required
                        type="text"
                        id="nickName"
                        value={nickName}
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        onChange={(e) => setNickName(e.target.value)}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="email" className="mb-1">
                        Email
                     </label>
                     <input
                        required
                        type="email"
                        id="email"
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="password" className="mb-1">
                        Password <br />
                        <span className="text-xs">(one lowercase, one uppercase, one number and 8 characters)</span>
                     </label>
                     <input
                        required
                        type="password"
                        id="password"
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label className="mb-1">Confirm password</label>
                     <input
                        required
                        type="password"
                        id="confirmPassword"
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="avatarFile" className="mb-1">
                        Avatar
                     </label>
                     <input
                        type="file"
                        id="avatarFile"
                        accept="image/png, image/jpeg, image/webp"
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        onChange={(e) => {
                           setAvatarFile(e.target.files[0]);
                        }}
                     />
                     <span className="text-red-500">{inlineMessage}</span>
                  </div>

                  <div>
                     <Button color="blue" hoverColor type="submit">
                        {isLoadingRequest ? <Loading /> : "Register"}
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
