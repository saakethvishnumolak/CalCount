import { Link } from "react-router-dom"
import {useState} from "react";

export default function Register()
{
        //Holds format for input
        const [userDetails, setUserDetails] = useState({
            name: "",
            email: "",
            password: "",
            age: ""
        })

        //Outputs response after registration is successful or not
        const [message, setMessage] = useState({
            type: "invisible-message",
            data: ""
        })

        function handleInput(event)
        {
            setUserDetails((prevState) => {

                return {...prevState, [event.target.name]:event.target.value};
            })            
        }

        function handleSubmit(event)
        {
            event.preventDefault();
            //console.log(userDetails);

            //fetch from api and stores 
            fetch("http://localhost:8000/register", {
                method: "POST",
                body:JSON.stringify(userDetails),
                headers:{
                    "Content-Type": "application/json"
                }

            })
            .then((response) => response.json())
            .then((data) => {
                setMessage({type:"success", text:data.message});

                //clears the form field
                setUserDetails({
                    name: "",
                    email: "",
                    password: "",
                    age: ""
                })
                
                //user registered message disappears
                setTimeout(() => {
                    setMessage({type:"invisible-message", text:data.message});
                }, 5000)

            }).catch((err) => {
                console.log(err);
            })
        }

    

    //HTML portion
    return (
        <section className = "container">

            <form className="form" onSubmit={handleSubmit}>

                <h1>CalCount</h1>
                <h1>Start Your Fitness Journey!</h1>

                <input className="inp" type="text" required onChange={handleInput} placeholder="Enter Name" name="name" value={userDetails.name}/>

                <input className="inp" type="email" required onChange={handleInput} placeholder="Enter Email" name="email" value={userDetails.email}/>

                <input className="inp" type="password" required maxLength={8} onChange={handleInput} placeholder="Enter Password" name="password" value={userDetails.password}/>

                <input className="inp" type="number" max={100} min={12} onChange={handleInput} placeholder="Enter Age" name="age" value={userDetails.age}/>

                <button className="btn">Register</button>

                <p>Already Registered? <Link to={'/login'}>Login Here</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>



        </section>
    )
}