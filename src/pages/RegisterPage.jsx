import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RegisterPage() {
   const [nickName, setNickName] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const history = useHistory();

   const datas = {
      nickName: nickName,
      email: username,
      password: password,
   };

   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   async function handleRegister(event) {
      event.preventDefault();

      if (password !== confirmPassword || password === '' || confirmPassword === '') {
         return alert("Password confirmation doesn't match Password");
      } else if (username === '' || nickName === '') {
         return alert("Please fill in all the fields");
      }
      else {
         await axios
            .post("http://127.0.0.1:8000/api/registration", datas, config)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
         history.push("/login");
      }
   }

   return (
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
                     type="text"
                     id="nickName"
                     value={nickName}
                     className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                     onChange={(e) => setNickName(e.target.value)}
                  />
               </div>

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
                  <label>Password</label>
                  <input
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
                     type="password"
                     id="confirmPassword"
                     className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
               </div>

               <div className="register">
                  <button
                     className="inline-block bg-blue-800 text-white rounded-lg px-5 py-2 mt-3"
                     type="submit"
                  >
                     Register
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
}
