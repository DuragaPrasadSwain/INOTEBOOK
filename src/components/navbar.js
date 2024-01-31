import React from 'react'
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();

    const handleclick = () => {
        localStorage.clear()
        navigate("/inotebook")
    }

  React.useEffect(() => {
    // console.log(location)
  }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand">INOTEBOOK</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to={localStorage.length===0?"/inotebook":"/home" }>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className= {`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>
        
                        </ul>
                        <form className="d-flex" role="search">
                           <button type="button" onClick={handleclick} className="btn btn-primary mx-2">{localStorage.length===0?"Login":"Logout"}</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
