// Assets
import { ReactComponent as LoadingIcon } from "../../assets/images/loading.svg";

// Import React
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

// Custom hooks
import { FetchGenres, FetchPublishers } from "../../hooks/useGetApi";
import useUser from "../../hooks/useUser";
import Button from "../../components/Button";

export default function AdminGameCreate() {
   const history = useHistory();

   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [imageFile, setImageFile] = useState("");
   const [romFile, setRomFile] = useState("");
   const [valuePublisher, setValuePublisher] = useState("");
   const [valueGenre, setValueGenre] = useState("");

   const { publishers } = FetchPublishers();
   const { genres } = FetchGenres();

   const { inlineMessage, setInlineMessage, isLoadingRequest, setIsLoadingRequest } = useUser();

   const formData = new FormData();
   formData.append("title", title);
   formData.append("description", description);
   formData.append("imageFile", imageFile);
   formData.append("romFile", romFile);
   formData.append("publisher", valuePublisher);
   formData.append("genre", valueGenre);

   async function handleCreateGame(event) {
      event.preventDefault();
      setIsLoadingRequest(true);

      await axios
         .post("http://127.0.0.1:8000/games/create", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
         .then(() => {
            history.push("/admin/games");
         })
         .catch((error) => {
            setInlineMessage(error["response"].data);
            setIsLoadingRequest(false);
         });
   }

   return (
      <>
         <Link to="/admin/games" className="mb-3 inline-block">
            &lsaquo; Back to Admin games
         </Link>
         <div className="max-w-screen">
            <form className="m-auto max-w-lg rounded-lg bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleCreateGame}>
               <div className="text-center">
                  <h1 className="mb-5 text-3xl">New game</h1>
                  <div className="mb-5 flex flex-col">
                     <label htmlFor="title" className="mb-1">
                        Title <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="title"
                        id="title"
                        className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="description" className="mb-1">
                        Description
                     </label>
                     <textarea
                        id="description"
                        className="m-auto w-[60%] rounded border border-gray-500 px-3 py-1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     ></textarea>
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="imageFile" className="mb-1">
                        Image <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        className="m-auto max-w-[80%]"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => setImageFile(e.target.files[0])}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="romFile" className="mb-1">
                        Rom <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="file"
                        id="romFile"
                        name="romFile"
                        className=" m-auto max-w-[80%]"
                        //accept="application/octet-stream"
                        onChange={(e) => setRomFile(e.target.files[0])}
                     />
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="publisher" className="mb-1">
                        Publisher
                     </label>
                     <select
                        className="m-auto max-w-[80%] rounded-lg border bg-slate-200 px-3 py-2"
                        onChange={(e) => setValuePublisher(e.target.value)}
                     >
                        <option value=""></option>
                        {publishers
                           ? publishers.map((publisher) => {
                                return (
                                   <option key={publisher.id} value={publisher.id}>
                                      {publisher.name}
                                   </option>
                                );
                             })
                           : ""}
                     </select>
                  </div>

                  <div className="mb-5 flex flex-col">
                     <label htmlFor="genre" className="mb-1">
                        Genre
                     </label>
                     <select
                        className="m-auto max-w-[80%] rounded-lg border bg-slate-200 px-3 py-2"
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
                  <div>
                     <Button color="blue" hoverColor>
                        {isLoadingRequest ? <LoadingIcon /> : "Create"}
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
