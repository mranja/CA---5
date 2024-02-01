import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Forms = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
   
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    
  });

  useEffect(() => {
    
    const storedData = localStorage.getItem('registerFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '', repeatPassword: '', 
    };

    
    if (formData.name.trim().length < 3 || formData.name.trim().length > 30) {
      newErrors.name = 'Name should be between 3 and 30 characters.';
      valid = false;
    }

    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address.';
      valid = false;
    }

    
    if (formData.password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        'Password should be at least 10 characters long and contain at least one special character.';
      valid = false;
    }

    
    if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = 'Passwords do not match.';
      valid = false;
    }

    

    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();


    
    
    if (validateForm()) {
      localStorage.setItem('registerFormData', JSON.stringify(formData));
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <div className="error">{errors.name}</div>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <div className="error">{errors.email}</div>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <div className="error">{errors.password}</div>
        </div>
        <div>
          <label>Repeat Password:</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          <div className="error">{errors.repeatPassword}</div>
        </div>
        <div className='Form'>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
