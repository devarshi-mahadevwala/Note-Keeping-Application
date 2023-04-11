import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

    

function Navbar() {
    const navigate = useNavigate();
    let location = useLocation();
    const logout = ()=>{
        localStorage.removeItem('token');
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active":""}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active":""}` } to="/about">About</Link>
                            </li>
                        </ul>
                            {(!localStorage.getItem('token'))?<form className="d-flex" role="search">
                            <Link className="btn btn-outline-primary me-4" role="button" to="/login">Login</Link>
                            <Link className="btn btn-primary me-4" role="button" to="/signup">SignUp</Link>
                        </form>:<button className="btn btn-outline-primary me-4" onClick={logout} >Log Out</button>
    }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar