import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const registerData = {
  email: '',
  password: ''
}

const Register = () => {
  const [data, setData] = useState(registerData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!data.email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Invalid email format';
      formIsValid = false;
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  }

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        const res = await axios.post('http://localhost:5000/register', data)
        if (res.status === 200) {
          alert('Registration Successful');
          navigate('/');
        }
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '2% 0 0 30%',
      }}
    >
      <div
        style={{
          maxWidth: '330px',
          border: '1px solid rgb(204, 204, 204)',
          borderRadius: '6px',
          margin: '9%',
          padding: '4%',
        }}
      >
        <form>
          <h1 className="h3 mb-3 fw-normal text-center fw-bold">Register</h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              onChange={handleInput}
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              onChange={handleInput}
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;
