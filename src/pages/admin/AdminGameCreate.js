import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function AdminGameCreate() {
   const history = useHistory();

   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [imageFile, setImageFile] = useState("");
   const [romFile, setRomFile] = useState("");
   const [publishers, setPublishers] = useState("");
   const [genres, setGenres] = useState("");
   const [valuePublisher, setValuePublisher] = useState("");
   const [valueGenre, setValueGenre] = useState("");

   const [inlineMessage, setInlineMessage] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const formData = new FormData();
   formData.append("title", title);
   formData.append("description", description);
   formData.append("imageFile", imageFile);
   formData.append("romFile", romFile);
   formData.append("publisher", valuePublisher);
   formData.append("genre", valueGenre);

   async function handleAdd(event) {
      event.preventDefault();
      setIsLoading(true);

      await axios
         .post("http://127.0.0.1:8000/api/games/create", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
         .then((response) => {
            console.log(response.data);
            history.push("/admin/games");
         })
         .catch((error) => {
            console.log(error);
            setInlineMessage(error["response"].data);
            setIsLoading(false);
         });
   }

   useEffect(() => {
      async function fetchPublishers() {
         const response = await fetch("http://127.0.0.1:8000/api/publishers");
         const myDatas = await response.json();
         setPublishers(myDatas);
      }

      async function fetchGenres() {
         const response = await fetch("http://127.0.0.1:8000/api/genres");
         const myDatas = await response.json();
         setGenres(myDatas);
      }

      fetchPublishers();
      fetchGenres();
   }, []);

   return (
      <>
         <Link to="/admin/games" className="mb-3 inline-block">
            &lsaquo; Back to Admin games
         </Link>
         <div className="max-w-screen mb-5">
            <form
               className="bg-white max-w-lg rounded-3xl m-auto pt-3 pb-5 text-blue-abyss"
               onSubmit={handleAdd}
            >
               <div className="text-center">
                  <h1 className="text-3xl">New game</h1>
                  <div className="flex flex-col pt-3">
                     <label htmlFor="title">Title <span className="text-red-500">*</span></label>
                     <input
                        required
                        type="title"
                        id="title"
                        className="w-[60%] m-auto mt-1 rounded-3xl border border-gray-500 px-3 py-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                     />
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="description">Description</label>
                     <textarea
                        id="description"
                        className="w-[60%] m-auto mt-1 rounded border border-gray-500 px-3 py-1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     ></textarea>
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="imageFile">Image <span className="text-red-500">*</span></label>
                     <input
                        required
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        className="m-auto mt-1 max-w-[80%]"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => setImageFile(e.target.files[0])}
                     />
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="romFile">Rom <span className="text-red-500">*</span></label>
                     <input
                        required
                        type="file"
                        id="romFile"
                        name="romFile"
                        className=" m-auto mt-1 max-w-[80%]"
                        //accept="application/octet-stream"
                        onChange={(e) => setRomFile(e.target.files[0])}
                     />
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="publisher">Publisher</label>
                     <select
                        className="border bg-slate-200 max-w-[80%] m-auto px-3 py-2 rounded-lg"
                        onChange={(e) => setValuePublisher(e.target.value)}
                     >
                        <option value=""></option>
                        {publishers
                           ? publishers.map((publisher) => {
                                return (
                                   <option
                                      key={publisher.id}
                                      value={publisher.id}
                                   >
                                      {publisher.name}
                                   </option>
                                );
                             })
                           : ""}
                     </select>
                  </div>

                  <div className="flex flex-col pt-3">
                     <label htmlFor="genre">Genre</label>
                     <select
                        className="border bg-slate-200 max-w-[80%] m-auto px-3 py-2 rounded-lg"
                        onChange={(e) => setValueGenre(e.target.value)}
                     >
                        <option value=""></option>
                        {genres
                           ? genres.map((genre) => {
                                return (
                                   <option key={genre.id} value={genre.id}>
                                      {genre.name}
                                   </option>
                                );
                             })
                           : ""}
                     </select>
                  </div>
                  <span className="text-red-500">{inlineMessage}</span>
                  <div className="register">
                     <button
                        className="inline-block bg-blue-800 text-white rounded-lg mt-5 px-5 py-2"
                        type="submit"
                     >
                        {isLoading ? (
                           <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                              ></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                        ) : (
                           "Create"
                        )}
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
