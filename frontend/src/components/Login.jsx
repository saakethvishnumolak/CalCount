import { Link, useNavigate } from "react-router-dom"
import {useState, useContext} from "react"
import { userAuth } from "../contexts/userAuth";

export default function Login()
{

        const loggedData = useContext(userAuth);

        const navigate = useNavigate();

        const [userCredentials, setUserCredentials] = useState({
            email: "",
            password: ""
        })

        //return message
        const [message, setMessage] = useState({
            type: "invisible-message",
            text:""
        })

        function handleInput(event)
        {
            setUserCredentials((prevState) => {
                return {...prevState, [event.target.name]:event.target.value};
            })
        }

        function handleSubmit(event)
        {
            event.preventDefault();
            console.log(userCredentials);

            //fetches from API
            fetch("http://localhost:8000/login", {
                
                method: "POST",
                body:JSON.stringify(userCredentials),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then((response) => {

                //Checks for wrong email or password
                
                if(response.status === 404)
                {
                    setMessage({type: "error", text:"Email does not exist"});
                }
                else if(response.status === 403)
                {
                    setMessage({type:"error", text:"Incorrect Password"});
                }
                

                //message disappears after 5 seconds
                setTimeout(()=> {
                    setMessage({type:"invisible-message", text:""});
                },5000)

                return response.json();
                
            })
            .then((data) => {

                //Only redirect if token is received
                if(data.token!==undefined)
                {
                    //Storing user id and token to local storage
                    localStorage.setItem("calcount-user", JSON.stringify(data));

                    loggedData.setLoggedUser(data);


                    //redirect to main page
                    navigate("/track");
                }

            })
            .catch((err) => {
                console.log(err);
            })
        }

        

    

    //HTML Portion
    return (
        <section className = "container">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Login to CalCount</h1>


                <input className="inp" required type="email" onChange={handleInput} placeholder="Enter Email" name="email" value={userCredentials.email}/>

                <input className="inp" maxLength={8} type="password" onChange={handleInput} placeholder="Enter Password" name="password" value={userCredentials.password}/>


                <button className="btn">Login</button>

                <p>Not a member yet? <Link to={'/register'}>Create an Account</Link> </p>

                <p className={message.type}>{message.text}</p>

            </form>

        </section>
    )
}