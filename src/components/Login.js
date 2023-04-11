import React, { useState  } from 'react'
import { useNavigate  } from "react-router-dom";


const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate ();
    
    const host = "http://localhost:5000"
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/loginuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json.success);
        if (json.success){
            // alert("success")
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Logged In Successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login