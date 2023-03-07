import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

function AdminDashboard() {

    const { user } = useContext(AuthContext);

    return (
        <div className="text-center">
            <h1 className="text-4xl mb-5">Welcome {user.nickName}</h1>
            <p>Click on the element that you want to add, edit or remove </p>
            <div className="flex flex-col lg:flex-row lg:max-w-[400px] lg:m-auto">
                <Link to='/admin/games' className="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-3xl w-[250px] px-5 py-5 m-auto mt-5 lg:text-xl">Games</Link>
                <Link to='/' className="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-3xl w-[250px] px-5 py-5 m-auto mt-5 lg:text-xl">Publishers</Link>
                <Link to='/' className="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-3xl w-[250px] px-5 py-5 m-auto mt-5 lg:text-xl">Genres</Link>

            </div>
        </div>
    )
}

export default AdminDashboard;