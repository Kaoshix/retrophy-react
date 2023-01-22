import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

function AdminDashboard() {

    const { user } = useContext(AuthContext);

    return (
        <div className="text-center">
            <h1 className="text-4xl mb-5">Welcome {user.nickName}</h1>
            <p>Click on the element that you want to add, edit or remove </p>
            <div className="">
                <button className="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg py-2 px-5"><Link to='/admin/games'>Games</Link></button>
                <button className="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg py-2 px-5 m-3"><Link to='/'>Publishers</Link></button>
                <button className="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg py-2 px-5"><Link to='/'>Genres</Link></button>
            </div>
        </div>
    )
}

export default AdminDashboard;