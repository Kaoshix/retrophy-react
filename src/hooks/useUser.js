import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useUser() {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(null);
   const [loading, setLoading] = useState(true);

   const [isLoading, setIsLoading] = useState(false);
   const [inlineMessage, setInlineMessage] = useState('');
   
   const history = useHistory();

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
            setIsLoading(false);
            return;
         } else {
            localStorage.setItem("token", response.data.token);
            setUser(responseLogin.data);
            setToken(response.data.token);
            setIsLoading(false);
            setInlineMessage('');
            history?.push('/');
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
         setLoading(false);
         return;
      }

      tryLogin(tempToken);

      async function tryLogin(tok) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${tok}`;
         const response = await axios.get("http://127.0.0.1:8000/api/me");
         setLoading(false);
         setUser(response.data);
      }
   }, []);

   return {
      user,
      setUser,
      login,
      logout,
      token,
      loading,
      isLoggedIn: !!user?.id,
      isLoading, setIsLoading,
      inlineMessage, setInlineMessage
   };
}
