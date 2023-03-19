import axios from "axios";
import { useState, useEffect } from "react";

export default function useUser() {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(null);
   const [isLoadingUser, setIsLoadingUser] = useState(true);

   const [isLoadingRequest, setIsLoadingRequest] = useState(false);
   const [inlineMessage, setInlineMessage] = useState("");


   const login = async (username, password) => {
      try {
         const response = await axios.post("http://127.0.0.1:8000/api/login", {
            username,
            password,
         });

         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${response.data.token}`;
         const responseLogin = await axios.get("http://127.0.0.1:8000/api/me");

         if (!responseLogin.data.isActive) {
            setInlineMessage("Please confirm your email first");
            setIsLoadingRequest(false);
            return;
         } else {
            localStorage.setItem("token", response.data.token);
            setUser(responseLogin.data);
            setToken(response.data.token);
            setIsLoadingUser(false);
            setIsLoadingRequest(false);
            setInlineMessage("");
         }
      } catch (error) {
         throw error;
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
   };

   useEffect(() => {
      const tempToken = localStorage.getItem("token");
      if (!tempToken) {
         setIsLoadingUser(false);
         return;
      }

      tryLogin(tempToken);

      async function tryLogin(tok) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${tok}`;
         const response = await axios.get("http://127.0.0.1:8000/api/me");
         setIsLoadingUser(false);
         setUser(response.data);
      }
   }, []);

   return {
      user,
      setUser,
      login,
      logout,
      token,
      isLoadingUser,
      isLoadingRequest,
      setIsLoadingRequest,
      inlineMessage,
      setInlineMessage,
   };
}
