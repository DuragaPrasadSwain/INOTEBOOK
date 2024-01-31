import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const [credential, setcredential] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate()
  const ref = useRef(null)
  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }

  const onsubmit = async (e) => {
    e.preventDefault()

    if (credential.password === credential.cpassword) {
      ref.current.hidden = 'true'

      console.log("if");

      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
      });
      const json = await response.json();
      console.log(json)
      navigate("/inotebook")

    } else {
      console.log("else");
      ref.current.className = "alert alert-danger"
    }



  }

  return (
    <div className=" container">
      <form onSubmit={onsubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" required type="text" name='name' onChange={onChange} aria-label="default input example" />
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' required id="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' required minLength={5} onChange={onChange} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Conform Password</label>
          <input type="password" className="form-control" name='cpassword' required onChange={onChange} id="cpassword" />
        </div>
        <div ref={ref} className = "" role="alert">
        PASSWORD and CONFIRM PASSWORD mismatched
        </div>
        <button  type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signin
