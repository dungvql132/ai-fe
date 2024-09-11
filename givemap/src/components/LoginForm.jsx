// src/components/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Replace with your API endpoint
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Login successful!');
        setErrors({});
      } else {
        setErrors({ server: data.msg });
      }
    } catch (err) {
      setErrors({ server: 'Server error' });
    }
  };

  return (
    <div className="login-container">
      <div className="background-circles">
        <div className="circle large"></div>
        <div className="circle medium"></div>
        <div className="circle small"></div>
      </div>
      <div className="login-form">
        <div className="logo"></div>
        <h2>Login</h2>
        {success && <p className="success">{success}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {errors.server && <p className="error">{errors.server}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="forgot-password">Forgot password?</p>
      </div>
    </div>
  );
};

export default LoginForm;
