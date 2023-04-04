// Assets
import { ReactComponent as LoadingIcon } from "../../assets/images/loading.svg";

// Import React
import { useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

// Custom hooks
import { FetchGame, FetchGenres, FetchPublishers } from "../../hooks/useGetApi";
import useUser from "../../hooks/useUser";

// Components
import Button from "../../components/Button";

export default function AdminGameCreate() {
   const history = useHistory();
   const { gameId } = useParams();

   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [imageFile, setImageFile] = useState("");
   const [romFile, setRomFile] = useState("");
   const [publisher, setPublisher] = useState("");
   const [genre, setGenre] = useState("");

   const { isLoadingRequest, setIsLoadingRequest } = useUser();
   const { inlineMessage } = useUser();

   const { publishers } = FetchPublishers();
   const { genres } = FetchGenres();
   const { game } = FetchGame();

   const formData = new FormData();
   formData.append("id", gameId);
   formData.append("title", title);
   formData.append("description", description);
   formData.append("imageFile", imageFile);
   formData.append("romFile", romFile);
   formData.append("publisher", publisher);
   formData.append("genre", genre);

   async function handleUpdate(event) {
      event.preventDefault();
      setIsLoadingRequest(true);
      const filter = [...formData.entries()].filter((el) => el[1] !== "");
      const filteredFormData = new FormData();
      filter.map((el) => filteredFormData.append(el[0], el[1]));
      await axios
         .post("http://127.0.0.1:8000/games/update", filteredFormData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
         .then((response) => {
            history.push({
               pathname: "/admin/games",
               state: { successMessage: `${response.data}` },
            });
         })
         .catch((error) => console.log(error));
      setIsLoadingRequest(false);
   }

   return (
      <>
         <Link to="/admin/games" className="mb-3 inline-block">
            &lsaquo; Back to Admin games
         </Link>
         <div className="max-w-screen mb-5">
            {game ? (
               <form className="m-auto max-w-lg rounded-lg bg-white pt-3 pb-5 text-blue-abyss" onSubmit={handleUpdate}>
                  <div className="text-center">
                     <h1 className="mb-5 text-3xl">Update game</h1>
                     <div className="mb-5 flex flex-col">
                        <label htmlFor="title mb-1">Title</label>
                        <input
                           type="text"
                           id="title"
                           className="m-auto w-[60%] rounded-3xl border border-gray-500 px-3 py-1"
                           defaultValue={game?.title}
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
                           defaultValue={game?.description}
                           onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                     </div>

                     <div className="mb-5 flex flex-col">
                        <label htmlFor="imageFile" className="mb-1">
                           Image
                        </label>
                        <input
                           type="file"
                           id="imageFile"
                           name="imageFile"
                           className="m-auto max-w-[80%]"
                           accept="image/png, image/jpeg, image/webp"
                           onChange={(e) => {
                              setImageFile(e.target.files[0]);
                           }}
                        />
                     </div>

                     <div className="mb-5 flex flex-col">
                        <label htmlFor="romFile" className="mb-1">
                           Rom
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
                           onChange={(e) => setPublisher(e.target.value)}
                        >
                           <option>{game?.publisher?.name}</option>
                           {publishers
                              ? publishers
                                 .filter((publisher) => publisher.name !== game?.publisher?.name)
                                 .map((publisher) => {
                                    return (
                                       <option key={publisher.id} value={publisher.id}>
                                          {publisher?.name}
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
                           onChange={(e) => setGenre(e.target.value)}
                        >
                           <option>{game?.genre?.name}</option>
                           {genres
                              ? genres
                                 .filter((genre) => genre.name !== game?.genre?.name)
                                 .map((genre) => {
                                    return (
                                       <option key={genre.id} value={genre.id}>
                                          {genre?.name}
                                       </option>
                                    );
                                 })
                              : ""}
                        </select>
                     </div>

                     <div className="register">
                        <span className="text-red-500">{inlineMessage}</span>
                        <div>
                           <Button color="blue">{isLoadingRequest ? <LoadingIcon /> : "Update"}</Button>
                        </div>
                     </div>
                  </div>
               </form>
            ) : (
               <div className="mt-10 flex min-h-screen justify-center">Loading...</div>
            )}
         </div>
      </>
   );
}
