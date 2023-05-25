import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import styles from '@styles/form.module.css';

const Register = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null
  });

  const { register } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(values, (err) => {
      const errors = err.response.data.errors;
      errors.forEach((error) => {
        if (error.first_name) {
          setError((prev) => ({ ...prev, first_name: error.first_name }));
        }
        if (error.last_name) {
          setError((prev) => ({ ...prev, last_name: error.last_name }));
        }
        if (error.email) {
          setError((prev) => ({ ...prev, email: error.email }));
        }
        if (error.password) {
          setError((prev) => ({ ...prev, password: error.password }));
        }
      });
    });
  };

  const Inputs = [
    {
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      value: values.first_name,
      isValid: error.first_name,
      onChange: handleChange('first_name')
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: values.last_name,
      isValid: error.last_name,
      onChange: handleChange('last_name')
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      value: values.email,
      isValid: error.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'New Password',
      type: 'password',
      value: values.password,
      isValid: error.password,
      onChange: handleChange('password')
    }
  ];

  useEffect(() => {
    return () => {
      setValues({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      });
      setError({
        first_name: null,
        last_name: null,
        email: null,
        password: null
      });
    };
  }, []);
  return (
    <div className={styles['register-page']}>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit} className={styles['form']}>
        {Inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
        <button type='submit'>Register</button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};
export default Register;
