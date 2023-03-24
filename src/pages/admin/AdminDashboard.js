// React - packages
import { useContext } from "react";
import { Link } from "react-router-dom";

// Components
import Button from "../../components/Button";

// Custom hooks
import { AuthContext } from "../../App";

function AdminDashboard() {
   const { user } = useContext(AuthContext);

   return (
      <div className="m-auto max-w-lg rounded-lg bg-white p-3 pb-0 text-center text-blue-abyss">
         <h1 className="mb-5 text-4xl">Welcome {user.nickName}</h1>
         <p className="mb-5">Click on the element that you want to add, edit or remove </p>
         <div className="flex flex-col lg:m-auto lg:max-w-[400px] lg:flex-row">
            <Link to="/admin/games" className="m-auto mb-5">
               <Button color="blue" fontSize="sm_big-lg_base">
                  Games
               </Button>
            </Link>
            <Link to="/admin/games" className="m-auto mb-5">
               <Button color="blue" fontSize="sm_big-lg_base">
                  Publishers
               </Button>
            </Link>
            <Link to="/admin/games" className="m-auto mb-5">
               <Button color="blue" fontSize="sm_big-lg_base">
                  Genres
               </Button>
            </Link>
         </div>
      </div>
   );
}

export default AdminDashboard;
