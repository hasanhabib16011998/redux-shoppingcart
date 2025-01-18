import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.message}>Oops! Page Not Found</h2>
      <p style={styles.description}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={styles.homeButton}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  errorCode: {
    fontSize: '10rem',
    margin: 0,
    fontWeight: 'bold',
    textShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  message: {
    fontSize: '2.5rem',
    margin: '10px 0',
    fontWeight: 600,
  },
  description: {
    fontSize: '1.2rem',
    margin: '20px 0',
    maxWidth: '600px',
    lineHeight: '1.5',
  },
  homeButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#2575fc',
    backgroundColor: '#fff',
    textDecoration: 'none',
    borderRadius: '25px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease-in-out',
  },
};

styles.homeButton[':hover'] = {
  backgroundColor: '#2575fc',
  color: '#fff',
  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.4)',
};

export default NotFound;
