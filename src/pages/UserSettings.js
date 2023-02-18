import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserSettings() {
   const [user, setUser] = useState(null);
   const { userId } = useParams();

   useEffect(() => {
      async function fetchUser() {
         const response = await fetch(
            `http://127.0.0.1:8000/api/users/${userId}`
         );
         const userInfos = await response.json();
         setUser(userInfos);
      }
      fetchUser();
   }, [userId]);
   return (
      <>
      {user ? (
                 <div className="max-w-screen">
                 <img
                    src={user.avatarPath}
                    alt="random"
                    className="m-auto mb-4 h-[80px] w-[80px] rounded-full"
                 />
                 <h1 className="text-2xl text-center mb-10">{user.nickName}</h1>
                 <form className="bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss">
                    <div className="text-center">
                       <h1 className="text-3xl">Settings</h1>
     
                       <div className="flex flex-col pt-3">
                          <label htmlFor="nickName">Nickname</label>
                          <input
                             type="text"
                             id="nickName"
                             className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                          />
                       </div>
     
                       <div className="flex flex-col pt-3">
                          <label htmlFor="password">Password</label>
                          <input
                             type="password"
                             id="password"
                             className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                          />
                       </div>
     
                       <button
                          className="inline-block bg-blue-800 text-white rounded-lg mt-5 px-5 py-2"
                          type="submit"
                       >
                          Submit changes
                       </button>
                    </div>
                 </form>
              </div>
      ) : 'Loading...'}

      </>
   );
}
