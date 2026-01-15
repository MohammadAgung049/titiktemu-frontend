import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ WAJIB IMPORT AXIOS
import { FaPhone, FaLock, FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa6';
import logoImage from '../assets/logo1-titik-kumpul.png';

const Login = () => {
  // --- STATE DATA ---
  const [noHp, setNoHp] = useState(''); // Penampung No HP
  const [password, setPassword] = useState(''); // Penampung Password
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  // --- FUNGSI LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      // 1. Kirim Data ke Backend
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        no_hp: noHp,      // Sesuai request backend
        password: password
      });

      // 2. Jika Sukses (Status 200)
      console.log("Login Berhasil:", response.data);

      // 3. Simpan Token "Kunci Masuk" di Browser
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 4. Pindah ke Halaman Utama
      alert("Login Berhasil!");
      navigate('/home'); 

    } catch (error) {
      // 5. Jika Gagal (Password Salah / Akun Gak Ada)
      console.error("Login Error:", error);
      if (error.response && error.response.status === 401) {
        alert("No Ponsel atau Password salah!");
      } else {
        alert("Terjadi kesalahan server. Coba lagi nanti.");
      }
    }
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
          
          <h1 style={styles.title}>Selamat Datang</h1>
          <p style={styles.subtitle}>Silahkan isi data dibawah untuk masuk</p>

          {/* ✅ Tambahkan onSubmit */}
          <form style={styles.form} onSubmit={handleLogin}>
            
            {/* Input No Ponsel */}
            <div style={styles.inputGroup}>
              <div style={styles.iconLeft}>
                <FaPhone size={18} color="#4B5563" />
              </div>
              <input 
                type="tel" 
                placeholder="No Ponsel" 
                style={styles.inputField}
                // ✅ Binding Data
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>

            {/* Input Password */}
            <div style={styles.inputGroup}>
              <div style={styles.iconLeft}>
                <FaLock size={18} color="#4B5563" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                style={styles.inputField}
                // ✅ Binding Data
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.iconRight}
              >
                {showPassword ? <FaEyeSlash size={20} color="#4B5563"/> : <FaEye size={20} color="#4B5563"/>}
              </button>
            </div>

            {/* Tombol Masuk */}
            {/* ✅ Ubah type jadi SUBMIT dan hapus onClick navigate manual */}
            <button type="submit" style={styles.btnLogin}>
              Masuk
            </button>
          </form>

          {/* Lupa Password */}
          <div style={{ marginTop: '16px' }}>
            <a href="#" style={styles.linkForgot} onClick={() => navigate('/forgot-password')}>lupa password?</a>
          </div>

          {/* Divider */}
          <div style={styles.dividerContainer}>
            <div style={styles.line}></div>
            <span style={styles.dividerText}>Atau Masuk dengan</span>
            <div style={styles.line}></div>
          </div>

          {/* Social Login Buttons */}
          <div style={styles.socialGroup}>
            <button style={styles.btnSocial}>
              <FaGoogle size={20} color="#EF4444" />
              <span style={styles.btnSocialText}>login with Google</span>
            </button>
            
            <button style={styles.btnSocial}>
              <FaApple size={24} color="black" />
              <span style={styles.btnSocialText}>login with Apple</span>
            </button>
          </div>

          {/* Footer Link */}
          <div style={styles.footerText}>
            belum punya akun? <span style={styles.linkRegister} onClick={() => navigate('/register')}>daftar disini</span>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- STYLES (Sama Persis, tidak saya ubah) ---
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
    maxWidth: '700px',
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
    marginBottom: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
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
    marginTop: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background 0.3s'
  },
  linkForgot: {
    color: '#0077B6',
    fontWeight: '500',
    textDecoration: 'none',
    fontSize: '0.9rem'
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#D1D5DB'
  },
  dividerText: {
    padding: '0 16px',
    color: '#9CA3AF',
    fontSize: '0.875rem'
  },
  socialGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  btnSocial: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  btnSocialText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: '0.95rem'
  },
  footerText: {
    marginTop: '24px',
    marginBottom: '-24px',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#6B7280'
  },
  linkRegister: {
    color: '#0077B6',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
  }
};

export default Login;