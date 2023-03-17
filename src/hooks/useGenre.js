import axios from "axios";
import { useEffect, useState } from "react";

export const useGenre = () => {
   const [genres, setGenres] = useState(null);

   useEffect(() => {
      async function fetchData() {
         await axios.get("http://127.0.0.1:8000/api/genres")
            .then(response => setGenres(response.data))
            .catch(error => console.log(error));
      }
      fetchData();
   }, []);

   return { genres };
}