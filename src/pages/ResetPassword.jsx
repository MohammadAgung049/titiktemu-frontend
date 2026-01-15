import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import Icon
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa6';
import logoImage from '../assets/logo1-titik-kumpul.png'; 

const ResetPassword = () => {
  const navigate = useNavigate();
  
  // State untuk toggle visibility password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSimpan = () => {
    // Simulasi logika simpan ke database
    alert("Sukses! Password Anda berhasil diperbarui.");
    // Redirect kembali ke halaman Login
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      
      {/* --- 1. HEADER LOGO --- */}
      <header style={styles.header}>
        <div style={styles.logoContainer} onClick={() => navigate('/')}>
          <img src={logoImage} alt="Logo" style={styles.logoImage} />
          <span style={styles.logoText}>TITIK KUMPUL</span>
        </div>
      </header>

      {/* --- 2. WAVE DECORATION --- */}
      <div style={styles.waveWrapper}>
        <svg 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          style={styles.svgWave}
        >
          <path 
            fill="#0077B6" 
            fillOpacity="1" 
            d="M0,192L80,197.3C160,203,320,213,480,229.3C640,245,800,267,960,250.7C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
          <path 
            fill="#0B2447" 
            fillOpacity="1" 
            d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,165.3C840,181,960,235,1080,245.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* --- 3. FORM SECTION --- */}
      <main style={styles.mainContent}>
        <div style={styles.formCard}>
          
          {/* Judul */}
          <h1 style={styles.title}>Atur Ulang Password</h1>
          <p style={styles.subtitle}>Silahkan buat password baru untuk akun Anda</p>

          <form style={styles.form}>
            
            {/* 1. Input Password Baru */}
            <div style={styles.inputGroup}>
              <div style={styles.iconLeft}>
                <FaLock size={18} color="#4B5563" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Masukkan Password Baru" 
                style={styles.inputField}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.iconRight}
              >
                {showPassword ? <FaEyeSlash size={20} color="#4B5563"/> : <FaEye size={20} color="#4B5563"/>}
              </button>
            </div>

            {/* 2. Input Konfirmasi Password */}
            <div style={styles.inputGroup}>
              <div style={styles.iconLeft}>
                <FaLock size={18} color="#4B5563" />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Konfirmasi Password" 
                style={styles.inputField}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.iconRight}
              >
                {showConfirmPassword ? <FaEyeSlash size={20} color="#4B5563"/> : <FaEye size={20} color="#4B5563"/>}
              </button>
            </div>

            {/* Tombol Simpan */}
            <button type="button" onClick={handleSimpan} style={styles.btnLogin}>
              Simpan Password
            </button>
          </form>

        </div>
      </main>
    </div>
  );
};

// --- STYLES (KONSISTEN) ---
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Poppins', sans-serif"
  },
  header: {
    padding: '10px 32px',
    backgroundColor: 'white',
    position: 'relative',
    zIndex: 20
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    width: 'fit-content'
  },
  logoImage: {
    height: '50px',
    width: 'auto'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#0B2447',
    letterSpacing: '-0.025em'
  },
  waveWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: '-100px', 
    zIndex: 10,
    lineHeight: 0,
    transform: 'scaleX(-1)'
  },
  svgWave: {
    width: '100%',
    height: 'auto',
    minHeight: '150px'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
    marginTop: '54px',
    marginBottom: '80px'
  },
  formCard: {
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '-8px',
    marginTop: 0
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: '32px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    position: 'relative',
    width: '100%'
  },
  inputField: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    backgroundColor: '#E0E0E0',
    color: '#1F2937',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    outline: 'none',
    boxSizing: 'border-box'
  },
  iconLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '16px',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  },
  iconRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: '16px',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  btnLogin: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0B2447',
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background 0.3s'
  }
};

export default ResetPassword;