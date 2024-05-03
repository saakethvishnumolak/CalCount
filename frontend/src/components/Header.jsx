//redirect between links and logging out

import { userAuth } from "../contexts/userAuth"
import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom";

export default function Header()
{
    const loggedData = useContext(userAuth);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("calcount-user");
        loggedData.setLoggedUser(null);
        Navigate("/login");
    }


    return (

        <div>

            <ul>
                <Link to="/track"><li>Track</li></Link>
                <Link to="/diet"><li>Diet</li></Link>
                <li onClick={logout}>Logout</li>
            </ul>

        </div>

    )
}