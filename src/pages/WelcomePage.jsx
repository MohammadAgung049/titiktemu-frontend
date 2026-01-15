import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo1-titik-kumpul.png'; 

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      
      {/* --- CONTENT SECTION --- */}
      <div style={styles.contentWrapper}>
        
        {/* 1. Logo Section */}
        <div style={styles.logoWrapper}>
          <img src={logoImage} alt="Logo Titik Kumpul" style={styles.logoImage} />
        </div>

        {/* 2. Judul Brand */}
        <h1 style={styles.title}>TITIK KUMPUL</h1>
        <p style={styles.subtitle}>
          Platform Kolaborasi Event Organizer & UMKM
        </p>

        {/* 3. Sub-Judul (Tagline) */}
        <h2 style={styles.tagline}>
          Kolaborasi Dimulai di Sini.
        </h2>

        {/* 4. Tombol Action */}
        <div style={styles.buttonGroup}>
          {/* Tombol Masuk */}
          <button 
            style={styles.btnPrimary} 
            onClick={() => navigate('/login')}
          >
            Masuk
          </button>
          
          {/* Tombol Daftar */}
          <button 
            style={styles.btnSecondary} 
            onClick={() => navigate('/register')}
          >
            Daftar
          </button>
        </div>
      </div>

      {/* --- WAVE DECORATION BOTTOM --- */}
      <div style={styles.waveContainer}>
        <svg 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={styles.svgWave}
        >
          {/* Layer 1: Biru Muda (Di Belakang) */}
          <path 
            fill="#0077B6" 
            fillOpacity="1" 
            d="M0,192L80,197.3C160,203,320,213,480,229.3C640,245,800,267,960,250.7C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>

          {/* Layer 2: Biru Tua (Di Depan) */}
          <path 
            fill="#0B2447" 
            fillOpacity="1" 
            d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,165.3C840,181,960,235,1080,245.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

    </div>
  );
};

// --- STYLES REVISI (LEBIH PADAT) ---
const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      fontFamily: "'Poppins','sans-serif'"
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '400px',
      padding: '0 20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '-100px'
    },
    logoWrapper: {
      marginBottom: '10px'
    },
    logoImage: {
      width: '100px',
      height: 'auto',
      objectFit: 'contain',
      marginBottom: '1px'
    },
    title: {
      fontSize: '2rem',
      //fontFamily: 'Poppins',
      fontWeight: '800',
      color: '#0B2447',
      letterSpacing: '0.05em',
      marginBottom: '1px',
      textTransform: 'uppercase',
      margin: 0,
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '0.9rem',
      color: '#0B2447',
      fontWeight: 'bold',
      marginBottom: '10px',
      marginTop: '4px'
    },
    tagline: {
      fontSize: '1.25rem',
      color: '#6b7280',
      marginBottom: '24px',
      fontWeight: '500'
    },
    buttonGroup: {
      width: '150%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '0 10px',
      boxSizing: 'border-box'
    },
    btnPrimary: {
      width: '100%',
      padding: '10px 0',
      backgroundColor: '#0B2447',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'background 0.3s'
    },
    btnSecondary: {
      width: '100%',
      padding: '10px 0', 
      backgroundColor: 'white',
      color: '#0B2447',
      border: '2px solid #0B2447',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    // Wave
    waveContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      lineHeight: 0
    },
    svgWave: {
      display: 'block',
      width: '100%',
      height: 'auto',
      minHeight: '200px'
    }
  };
  
  export default WelcomePage;