import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [credential, setcredential] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.clear()
        const response = await fetch(`http://localhost:5000/api/auth/userlogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ email: credential.email, password: credential.password }),
        });
        const json = await response.json();
        localStorage.setItem('token', json.authToken)

        if (json.success) {
            navigate("/home")
        }



    }

    const onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email1" className="form-label">Email address</label>
                    <input type="email" className="form-control" required id="email1" value={credential.email} onChange={onchange} name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} required value={credential.password} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <div className='my-2'>
                <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/signin">
                    Create a new account
                </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
