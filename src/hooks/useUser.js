import axios from "axios";
import { useState, useEffect } from "react";

export default function useUser() {
   const [user, setUser] = useState(null);
   const [isLoadingUser, setIsLoadingUser] = useState(true);
   const [token, setToken] = useState(null);
   const [isLoadingRequest, setIsLoadingRequest] = useState(false);
   const [inlineMessage, setInlineMessage] = useState("");

   // const month = 60 * 60 * 24 * 30;

   // function parseJwt(token) {
   //    var base64Url = token.split(".")[1];
   //    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
   //    var jsonPayload = decodeURIComponent(
   //       window
   //          .atob(base64)
   //          .split("")
   //          .map(function (c) {
   //             return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
   //          })
   //          .join("")
   //    );

   //    return JSON.parse(jsonPayload);
   // }

   const login = async (username, password) => {
      try {
         const response = await axios.post("http://127.0.0.1:8000/api/login", {
            username,
            password,
         });
         axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
         const responseLogin = await axios.get("http://127.0.0.1:8000/api/me");

         if (!responseLogin.data.isActive) {
            setInlineMessage("Please confirm your email first");
            setIsLoadingRequest(false);
            return;
         } else {
            sessionStorage.setItem("refreshToken", response.data.refresh_token);
            setToken(response.data.token);
            setUser(responseLogin.data);
            setIsLoadingUser(false);
            setIsLoadingRequest(false);
            setInlineMessage("");
         }
      } catch (error) {
         throw error;
      }
   };

   const logout = () => {
      sessionStorage.removeItem("refreshToken");
      setToken(null);
      setUser(null);
   };

   useEffect(() => {
      if (!token && !sessionStorage.getItem("refreshToken")) {
         setIsLoadingUser(false);
         return;
      }

      if (!token) {
         const refreshTokenStorage = sessionStorage.getItem("refreshToken");
         async function refreshToken() {
            await axios
               .post("http://127.0.0.1:8000/api/token/refresh", {
                  refresh_token: refreshTokenStorage,
               })
               .then((response) => {
                  setToken(response.data.token);
               })
               .catch((err) => console.log(err));
         }

         refreshToken();
      }

      if (token) {
         async function tryLogin() {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.get("http://127.0.0.1:8000/api/me");
            setIsLoadingUser(false);
            setUser(response.data);
         }
         tryLogin();
      }
   }, [token]);
   return {
      user,
      setUser,
      token,
      login,
      logout,
      isLoadingUser,
      isLoadingRequest,
      setIsLoadingRequest,
      inlineMessage,
      setInlineMessage,
   };
}
