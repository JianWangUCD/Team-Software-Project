import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { BASE_URL } from '../api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export default function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    role: ""
  });

  const { username, password, role } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const onInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    // 密码正则表达式，要求密码长度为至少8位，包含至少一个特殊符号、一个字母和一个数字
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      alert(
        "Password must be at least 8 characters long and contain at least one special character, one letter, and one digit."
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await axios.post(`${BASE_URL}/user-service/register`, user);
    navigate("/login");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                  type="text"
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
                <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Input password"
                  name="password"
                  value={password}
                  onChange={(e) => onInputChange(e)}
                />
                <div className="input-group-append">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={toggleShowPassword}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <option value="buyer">buyer</option>
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