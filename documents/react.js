import React, { useState } from 'react';

const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // The login was successful, extract the access token from the response
      const { accessToken } = data;

      // Retrieve the refresh token from the HTTP-only cookie
      const cookies = document.cookie.split('; ');
      const refreshTokenCookie = cookies.find((cookie) =>
        cookie.startsWith('refreshToken=')
      );
      const refreshToken = refreshTokenCookie
        ? refreshTokenCookie.split('=')[1]
        : null;

      // Store the access token and refresh token in state
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } else {
      // The login failed, display the error message
      setError(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        value={values.email}
        onChange={handleChange('email')}
      />
      <input
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange('password')}
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
