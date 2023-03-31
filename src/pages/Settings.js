// React - packages
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// Custom hooks
import { AuthContext } from "../App";
import Button from "../components/Button";
import { Loading } from "../components/Loading";

// Layouts

// Common pages

// Admin pages

export default function Settings() {
   const { user, setUser, inlineMessage, setInlineMessage, isLoadingRequest, setIsLoadingRequest } =
      useContext(AuthContext);
   const history = useHistory();

   const [nickname, setnickname] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [avatarFile, setAvatarFile] = useState("");

   const formData = new FormData();
   formData.append("id", user?.id);
   formData.append("nickname", nickname);
   formData.append("password", password);
   formData.append("avatarFile", avatarFile);

   const config = {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   };

   async function handleSubmit(event) {
      event.preventDefault();

      if (password !== confirmPassword && password.length > 1) {
         setInlineMessage("Password confirmation doesn't match with password");
      } else {
         const filter = [...formData.entries()].filter((el) => el[1] !== "");
         const filteredFormData = new FormData();
         filter.map((el) => filteredFormData.append(el[0], el[1]));
         setIsLoadingRequest(true);
         await axios
            .post("http://127.0.0.1:8000/user/update", filteredFormData, config)
            .then((response) => {
               console.log(response.data);
               history.push({
                  state: { successMessage: `Account updated` },
                  pathname: "/profil",
               });
               setUser(response.data);
               setIsLoadingRequest(false);
               setInlineMessage("");
            })
            .catch((error) => {
               setInlineMessage(error["response"].data);
               setIsLoadingRequest(false);
            });
      }
   }

   return (
      <>
         <Link to="/profil" className="mb-3 inline-block">
            &lsaquo; Back to profil
         </Link>
         <form className="m-auto max-w-lg rounded-lg bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleSubmit}>
            <div className="text-center">
               <h1 className="mb-5 text-3xl">Settings</h1>
               <div className="mb-5 flex flex-col">
                  <label htmlFor="nickname" className="mb-1">
                     nickname
                  </label>
                  <input
                     type="text"
                     id="nickname"
                     value={nickname}
                     className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                     onChange={(e) => setnickname(e.target.value)}
                  />
               </div>

               <div className="mb-5 flex flex-col">
                  <label htmlFor="password" className="mb-1">
                     Password <br />
                     <span className="text-xs">(one lowercase, one uppercase, one number and 8 characters)</span>
                  </label>
                  <input
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
               </div>

               <span className="text-red-500">{inlineMessage}</span>
               <div className="register">
                  <Button color="blue" type="submit">
                     {isLoadingRequest ? <Loading /> : "Update"}
                  </Button>
               </div>
            </div>
         </form>
      </>
   );
}
