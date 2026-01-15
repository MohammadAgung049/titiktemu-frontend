import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrendMarketPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Trend Market</h2>
      </div>
      
      <div style={styles.content}>
        <p style={styles.placeholderText}>This page is under construction.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#666',
    marginRight: '10px'
  },
  title: {
    flex: 1,
    margin: 0,
    fontSize: '18px',
    color: '#333'
  },
  content: {
    padding: '20px 0',
    textAlign: 'center'
  },
  placeholderText: {
    color: '#666',
    fontSize: '14px'
  }
};

export default TrendMarketPage;

