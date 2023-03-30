// Assets
import avatar from "../assets/images/avatar_default.webp";

// React - packages
import axios from "axios";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// Components
import Button from "../components/Button";
import troph from "../assets/images/trophy.svg";
import { PopupMessage } from "../components/PopupMessage";
import { Loading } from "../components/Loading";

// Custom hooks
import { AuthContext } from "../App";
import { Game } from "../components/Game";

export default function UserSettings() {
   const { user, inlineMessage, setInlineMessage, isLoadingRequest, setIsLoadingRequest } = useContext(AuthContext);
   const history = useHistory();
   const location = useLocation();

   const [nickName, setNickName] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [avatarFile, setAvatarFile] = useState("");

   const formData = new FormData();
   formData.append("id", user?.id);
   formData.append("nickName", nickName);
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
               history.push({
                  state: { successMessage: `${response.data}` },
               });
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
         {location.state && location.state.successMessage && <PopupMessage message={location.state.successMessage} />}
         {user ? (
            <div className="m-auto max-w-screen-2xl">
               <div className="lg:flex">
                  <div className="lg:mr-10">
                     <img
                        src={user.avatarPath === "http://127.0.0.1:8000" ? avatar : user.avatarPath}
                        alt="random"
                        className="m-auto mb-2 h-[80px] w-[80px] rounded-full"
                     />
                     <h1 className="mb-5 text-center text-2xl">{user.nickName}</h1>
                  </div>

                  <div className="mb-10 grow rounded bg-slate-600 p-3 lg:min-h-[300px]">
                     <h1 className="mb-5 text-center text-xl">Trophies Showcase</h1>
                     {user?.trophy?.map((trophy) => (
                        <div key={trophy.id}>
                           <div className="flex justify-center lg:justify-start">
                              <img src={troph} alt="trophy" className="mr-2" />
                              <h2 className="text-2xl font-bold">{trophy.name}</h2>
                           </div>
                           <p className="text-center lg:text-left">{trophy.description}</p>
                        </div>
                     ))}
                  </div>
               </div>
               <div>
                  <h2 className="mb-5 text-center text-4xl lg:text-left">Favorites</h2>
                  {/* jeu favori.map */}
                  {user?.games?.map((game) => (
                     <Game key={game.id} game={game} />
                  ))}
               </div>

               <form className="m-auto max-w-lg rounded-lg bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleSubmit}>
                  <div className="text-center">
                     <h1 className="mb-5 text-3xl">Settings</h1>
                     <div className="mb-5 flex flex-col">
                        <label htmlFor="nickName" className="mb-1">
                           Nickname
                        </label>
                        <input
                           type="text"
                           id="nickName"
                           value={nickName}
                           className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                           onChange={(e) => setNickName(e.target.value)}
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
            </div>
         ) : (
            "Loading..."
         )}
      </>
   );
}
