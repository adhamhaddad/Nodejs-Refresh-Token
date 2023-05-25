import React from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '@hooks';
import styles from '@styles/home.module.css';

const Home = () => {
  const { logout } = useAuth();
  return (
    <div className={styles['home-page']}>
      <h2>Welcome</h2>
      <hr />
      <p className={styles['localStorage-data']}>
        <strong>accessToken:</strong> {localStorage.getItem('accessToken')}
      </p>
      <p className={styles['localStorage-data']}>
        <strong>refreshToken:</strong> {Cookies.get('refreshToken')}
      </p>
      <p className={styles['localStorage-data']}>
        <strong>user:</strong>
        {localStorage.getItem('user')}
      </p>
      <hr />
      <button className={styles['logout-button']} onClick={logout}>
        Logout
      </button>
    </div>
  );
};
export default Home;
