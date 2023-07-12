import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { BASE_URL } from '../api';

export default function Register() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        role: ""
  });

  

  const { username, password, role } = user;

  const onInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/user-service/register`, user);
    navigate("/login");
  };
  

    
  return (
    <div>
        <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
              <label htmlFor="username" className="form-label">
              username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
              password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
                            <div className="my-3">
                <label htmlFor="role">Role</label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={role}
                  onChange={onInputChange}
                >
                  <option value="">Select role</option>
                  <option value="seller">seller</option>
                  <option value="customer">buyer</option>
                </select>
              </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}
