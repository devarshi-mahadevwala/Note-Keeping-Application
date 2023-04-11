import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";


const Signup = (props) => {
  const [credentials, setCredentials] = useState({userName:"",email:"", password:"",cpassword:""})
  let navigate = useNavigate ();
  const host = "http://localhost:5000"

  const handleClick = async (e) => {
    if(document.getElementById("password").value !== document.getElementById("cpassword").value){
      alert("Please input the password again correctly.")
      // do not refresh the page
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const {userName,email,password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userName,email, password})
    });
    const json = await response.json();
    console.log(json.success);
    if(json.success){
      localStorage.setItem('token', json.authToken)
      navigate("/")
      props.showAlert("Account Created Successfully","success")
    }
    else{
      props.showAlert("Invalid Details","danger")
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
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="text" value={credentials.name} className="form-control" id="userName" aria-describedby="userName" name="userName" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" value={credentials.cpassword} className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup