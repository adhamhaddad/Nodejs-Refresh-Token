import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import styles from '@styles/form.module.css';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    email: null,
    password: null
  });

  const { login } = useAuth();

  const handleChange = (prop) => (event) => {
    if (error.email || error.password) {
      setError({
        email: null,
        password: null
      });
    }
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    login(values, (err) => {
      const errors = err.response.data.errors;
      errors.forEach((error) => {
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
      id: 'email',
      label: 'Email',
      type: 'email',
      value: values.email,
      isValid: error.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      value: values.password,
      isValid: error.password,
      onChange: handleChange('password')
    }
  ];

  useEffect(() => {
    return () => {
      setValues({ email: '', password: '' });
    };
  }, []);
  return (
    <div className={styles['login-page']}>
      <h2>Login Page</h2>
      <form onSubmit={onFormSubmit} className={styles['form']}>
        {Inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
        <button type='submit'>Log In</button>
      </form>
      <p>
        Don't have account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
