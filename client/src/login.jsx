import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const loginInitialValues={
    email:"",
    password:""
}

const signUpInitialValues={
    name:"",
    email:"",
    password:""
}

const Login=({setAuthenticated})=>{

    const navigate=useNavigate()
    const [account,toggleAccount]=useState("signup");
    const [login,setLogin]=useState(loginInitialValues);
    const [signup,setSignup]=useState(signUpInitialValues);
    const [message,setMessage]=useState("");

    const onLoginChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const onSignupChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value})
    }

    const handleLoginClick=()=>{
        toggleAccount("signup")
    }
    const handleSignupClick=()=>{
        toggleAccount("login")
    }

    const signupUser= async ()=>{
        try{
            if(signup.name==="" || signup.email==="" || signup.password===""){
                setMessage("All Fields Are Required")
            }else{

                let response=await axios.post("http://localhost:8000/signup",signup);

                if(response.status===200){
                    setMessage(response.data.message);

                }
            }

        }catch(error){
            console.log(error)
            setMessage("Something went Wrong")
        }
    }

    const loginUser= async ()=>{
        try{
            if(login.email==="" || login.password===""){
                setMessage("All fields are required")
            }else{

                let response= await axios.post("http://localhost:8000/login",login);
                console.log(response)

                if(response.status===200){
                    setMessage("Login Successfull");
                    setAuthenticated(true);
                    navigate("/");
                }

            }

        }catch(error){
            setMessage("Something went wrong")
        }
    }

    return (
        <div>
            {
                account==="login"?
                <div>
                    <h1>Login to our Website</h1>
                    <label htmlFor="email">Enter Email</label>
                    <input onChange={(e)=>onLoginChange(e)} type="email" id="email" name="email" />
                    <label htmlFor="password">Enter Password</label>
                    <input onChange={(e)=>onLoginChange(e)} type="password" id="password" name="password" />
                    <button onClick={()=>handleLoginClick()}>Signup</button>
                    <button onClick={()=>{loginUser()}}>Login</button>
                    <h1>{message}</h1>

                </div>
                :
                <div>
                    <h1>Signup to Our Website</h1>
                    <label htmlFor="name">Enter your name</label>
                    <input onChange={(e)=>{onSignupChange(e)}} type="text" id="name" name="name" />
                    <label htmlFor="email">Enter your email</label>
                    <input onChange={(e)=>{onSignupChange(e)}} type="email"  name="email" id="email" />
                    <label htmlFor="password">Enter Your Password</label>
                    <input onChange={(e)=>{onSignupChange(e)}} type="password" name="password" id="password" />
                    <button onClick={()=>{signupUser()}}>Signup</button>
                    <button onClick={()=>{handleSignupClick()}}>Already have an account</button>
                    <h1>{message}</h1>

                </div>
            }
        </div>
    )

}

export default Login;