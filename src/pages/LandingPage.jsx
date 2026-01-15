import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaGift, FaHandshake, FaInfoCircle, FaSearch } from "react-icons/fa";
import { FaStore, FaCalendarPlus, FaBullhorn, FaChartLine, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import logoImage from '../assets/logo2-titik-kumpul.png';

function LandingPage() {
  const navigate = useNavigate();

  // --- FUNGSI NAVIGASI SMOOTH SCROLL ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- FUNGSI SCROLL KE ATAS (UNTUK LOGO) ---
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- DATA LAYANAN KAMI ---
  const services = [
    {
      title: "Daftarkan Usaha",
      desc: "UMKM dapat mendaftar sebagai peserta event secara langsung di platform.",
      icon: <FaStore size={45} color="#0B2447" />,
    },
    {
      title: "Daftarkan Acara",
      desc: "EO dapat membuat, mengedit, dan mempublikasikan event secara digital.",
      icon: <FaCalendarPlus size={45} color="#0B2447" />,
    },
    {
      title: "Promosi",
      desc: "Bantu tenant menampilkan produk mereka kepada pengunjung.",
      icon: <FaBullhorn size={45} color="#0B2447" />,
    },
    {
      title: "Pencarian",
      desc: "Bantu pengguna menemukan event berdasarkan lokasi dan kategori.",
      icon: <FaSearch size={45} color="#0B2447" />,
    },
  ];

  // --- DATA KEUNGGULAN ---
  const advantages = [
    {
      title: "Efisien & Cepat",
      desc: "Semua proses pendaftaran dan promosi dilakukan secara digital."
    },
    {
      title: "Kolaboratif",
      desc: "Menghubungkan EO, UMKM, dan pengunjung dalam satu sistem."
    },
    {
      title: "Data Insight",
      desc: "Analisis tren dan performa event untuk strategi promosi yang lebih baik."
    },
    {
      title: "Hemat Biaya",
      desc: "Biaya promosi lebih terjangkau dibanding metode konvensional."
    }
  ];

  // --- TAMPILAN VISUAL ---
  return (
    <div style={{ fontFamily: "'Poppins','sans-serif'", minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

      {/* === A. HEADER / NAVBAR === */}
      <header style={styles.header}>
        {/* Logo sekarang bisa diklik untuk kembali ke atas */}
        <div style={styles.logoContainer} onClick={scrollToTop}>
        <img src={logoImage} alt="Logo Titik Kumpul" style={styles.logoImage} />
          <span style={styles.logoText}>TITIK KUMPUL</span>
        </div>

        <nav style={styles.navLinks}>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} 
            style={styles.link}
          >
            <FaPhoneAlt size={18} /> Hubungi Kami
          </a>
          
          <a 
            href="#advantages" 
            onClick={(e) => { e.preventDefault(); scrollToSection('advantages'); }} 
            style={styles.link}
          >
            <FaGift size={18} /> Keunggulan
          </a>
          
          <a 
            href="#services" 
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} 
            style={styles.link}
          >
            <FaHandshake size={20} /> Layanan
          </a>
          
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
            style={styles.link}
          >
            <FaInfoCircle size={18} /> Tentang Kami
          </a>
        </nav>

        <Link to="/login" style={styles.btnLogin}>
          Masuk
        </Link>
      </header>

      {/* === B. HERO SECTION === */}
      <main style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>TITIK KUMPUL</h1>
          <p style={styles.heroSubtitle}>Platform Kolaborasi Event Organizer & UMKM</p>
          <button style={styles.btnHero} onClick={() => navigate('/welcome')}>
            Gabung Sekarang
          </button>
        </div>

        {/* SVG Curve */}
        <div style={styles.waveContainer}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
            <path fill="#7FB3D5" fillOpacity="0.5" d="M0,320 C400,300 350,100 720,160 C1100,220 1000,0 1440,0 L1440,320 L0,320 Z"></path>
            <path fill="none" stroke="#0D2B47" strokeWidth="2" d="M0,320 C400,300 350,100 720,160 C1100,220 1000,0 1440,0"></path>
          </svg>
        </div>
      </main>

      {/* === C. SECTION TENTANG KAMI (ID: about) === */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutBgWrapper}>
          <div style={styles.aboutBgImage}></div>
          <div style={styles.aboutOverlay}></div>
        </div>

        <div style={styles.aboutContent}>
          <h2 style={styles.aboutTitle}>Tentang Kami</h2>
          <p style={styles.aboutText}>
            Temukan event UMKM, daftar sebagai tenant, dan bangun kolaborasi bersama
            Event Organizer. Kini, pengunjung juga bisa mencari informasi event UMKM
            terdekat dengan mudah.
          </p>
        </div>

        <div style={styles.aboutWaveContainer}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100px' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0B2447" fillOpacity="0.8"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#60A5FA"></path>
          </svg>
        </div>
      </section>

      {/* === D. SECTION LAYANAN KAMI (ID: services) === */}
      <section id="services" style={styles.serviceSection}>
        <div style={styles.serviceHeader}>
          <h2 style={styles.serviceTitle}>Layanan Kami</h2>
          <p style={styles.serviceSubtitle}>
            Kami menyediakan berbagai layanan untuk mempermudah UMKM dan Event Organizer
            dalam berkolaborasi dan mengembangkan usaha.
          </p>
        </div>

        <div style={styles.serviceGrid}>
          {services.map((item, index) => (
            <div key={index} style={styles.serviceCard}>
              <div style={{ marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={styles.serviceCardTitle}>{item.title}</h3>
              <div style={styles.serviceDescBox}>
                <p style={{ margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Item Terakhir: Tren Pasar */}
        <div style={styles.marketTrendContainer}>
          <div style={{ marginBottom: '16px' }}>
            <FaChartLine size={45} color="#16a34a" />
          </div>
          <h3 style={styles.serviceCardTitle}>Tren Pasar</h3>
          <div style={styles.serviceDescBox}>
            <p style={{ margin: 0 }}>
              Memberikan insight tentang minat pasar dan event populer.
            </p>
          </div>
        </div>
      </section>

      {/* === E. SECTION KEUNGGULAN (ID: advantages) === */}
      <section id="advantages" style={styles.advantageSection}>
        {/* Wave Divider */}
        <div style={styles.advantageTopWave}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
            <path d="M1200 120L0 120L0 0C161.24 55.06 305.87 82.91 433.85 83.55C561.83 84.19 671.27 57.63 762.16 33.85C853.05 10.07 999.03-31.42 1200 24.34L1200 120Z" fill="#f9fafb"></path>
          </svg>
        </div>

        <div style={styles.advantageContainer}>
          <h2 style={styles.advantageTitle}>Keunggulan Platform</h2>
          <div style={styles.advantageList}>
            {advantages.map((item, index) => (
              <div key={index} style={styles.advantageItem}>
                <h3 style={styles.advantageItemTitle}>
                  <span style={{ color: '#4CC9F0', marginRight: '8px' }}>•</span>
                  {item.title}
                </h3>
                <p style={styles.advantageItemDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === F. FOOTER (ID: contact) === */}
      <footer id="contact" style={styles.footerSection}>
        <div style={styles.footerBgWrapper}>
          <div style={styles.footerBgImage}></div>
          <div style={styles.footerOverlay}></div>
        </div>

        <div style={styles.footerContent}>
          <h2 style={styles.footerTitle}>Hubungi Kami!</h2>
          <p style={styles.footerPhone}>No Kontak (+62)89608962223</p>

          <p style={styles.footerSubtitle}>
            Siap bergabung dengan ribuan pelaku UMKM dan EO lainnya?
          </p>

          <nav style={styles.footerNav}>
            <a href="#" style={styles.footerLink} onClick={(e) => {e.preventDefault(); scrollToTop()}}>Beranda</a>
            <span style={{ margin: '0 8px' }}>|</span>
            <a href="#services" style={styles.footerLink} onClick={(e) => {e.preventDefault(); scrollToSection('services')}}>Layanan</a>
            <span style={{ margin: '0 8px' }}>|</span>
            <a href="#about" style={styles.footerLink} onClick={(e) => {e.preventDefault(); scrollToSection('about')}}>Tentang Kami</a>
            <span style={{ margin: '0 8px' }}>|</span>
            <a href="#contact" style={styles.footerLink} onClick={(e) => {e.preventDefault(); scrollToSection('contact')}}>Hubungi</a>
          </nav>

          <div style={styles.socialContainer}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIconIG}>
              <FaInstagram size={30} color="white" />
            </a>
            <a href="https://wa.me/6289608962223" target="_blank" rel="noopener noreferrer" style={styles.socialIconWA}>
              <FaWhatsapp size={30} color="white" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- STYLES CSS IN JS (DIPERBARUI) ---
const styles = {
  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 40px',
    backgroundColor: '#0B2447',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxSizing: 'border-box'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  logoImage: {
    height: '50px',
    width: 'auto',
    objectFit: 'contain',
    marginRight: '-6px'
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em'
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  btnLogin: {
    padding: '8px 24px',
    backgroundColor: 'white',
    color: '#0B2447',
    fontWeight: 'bold',
    borderRadius: '9999px',
    textDecoration: 'none',
    transition: '0.3s'
  },

  // Hero Section
  heroSection: {
    position: 'relative',
    height: '100vh',
    backgroundColor: '#0077B6',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: '0 80px'
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '100%',
    marginBottom: '80px',
    marginTop: '80px'
  },
  heroTitle: {
    fontSize: '5rem',
    fontWeight: '600',
    color: 'white',
    margin: 0,
    lineHeight: 0.5,
    letterSpacing: '0.01em'
  },
  heroSubtitle: {
    fontSize: '1.8rem',
    fontWeight: '550',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '30px'
  },
  btnHero: {
    padding: '15px 40px',
    backgroundColor: '#0B2447',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '400',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none'
  },

  // About Section
  aboutSection: {
    position: 'relative',
    minHeight: '550px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'center',
    overflow: 'hidden',
    color: 'white',
    paddingTop: '60px'
  },
  aboutBgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  aboutBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  aboutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  aboutContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '600px',
    marginTop: '-50',
    textAlign: 'center'
  },
  aboutTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: 'white',
    marginTop: '80px'
  },
  aboutText: {
    fontSize: '1.25rem',
    lineHeight: '1.5',
    fontWeight: '500',
    color: '#f0f0f0'
  },
  aboutWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    lineHeight: 0,
    transform: 'rotate(180deg)',
    zIndex: 5
  },

  // Services Section
  serviceSection: {
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '60px',
    paddingTop: '80px'
  },
  serviceHeader: {
    marginTop: '-40px',
    marginBottom: '40px',
    maxWidth: '800px'
  },
  serviceTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#0B2447',
    marginBottom: '16px'
  },
  serviceSubtitle: {
    fontSize: '1.5rem',
    color: '#0B2447',
    lineHeight: '1.6',
    fontWeight: '500'
  },
  serviceGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '100px',
    maxWidth: '1000px',
    width: '100%',
    marginBottom: '60px',
    marginTop: '10px'
  },
  serviceCard: {
    flex: '1 1 40%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  serviceCardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#0B2447',
    marginBottom: '12px'
  },
  serviceDescBox: {
    backgroundColor: '#0B2447',
    color: 'white',
    padding: '12px 32px',
    borderRadius: '50px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontWeight: '100%',
    width: '100%',
    lineHeight: '1.5'
  },
  marketTrendContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '450px',
    width: '100%',
    marginTop: '20px'
  },

  // Advantage Section (Keunggulan)
  advantageSection: {
    position: 'relative',
    backgroundColor: '#0B2447',
    color: 'white',
    padding: '80px 24px 40px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 20
  },
  advantageTopWave: {
    position: 'absolute',
    top: -1,
    left: 0,
    width: '100%',
    transform: 'rotate(180deg)',
    zIndex: 25,
    lineHeight: 0
  },
  advantageContainer: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
    zIndex: 30
  },
  advantageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    letterSpacing: '0.05em'
  },
  advantageList: {
    display: 'flex',
    flexDirection: 'column'
  },
  advantageItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  advantageItemTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'white'
  },
  advantageItemDesc: {
    fontSize: '1.15rem',
    opacity: 0.9,
    fontWeight: '300',
    maxWidth: '768px',
    lineHeight: '1.6'
  },

  // Footer
  footerSection: {
    position: 'relative',
    minHeight: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0px 24px 60px 24px',
    overflow: 'hidden',
    color: 'white',
    textAlign: 'left'
  },
  footerBgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  footerBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  footerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 36, 71, 0.95)'
  },
  footerContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    paddingLeft: '20px',
    paddingTop: '40px'
  },
  footerTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  footerPhone: {
    fontSize: '1.25rem',
    marginBottom: '24px',
    fontWeight: '400'
  },
  footerSubtitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    marginBottom: '16px',
    maxWidth: '600px'
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '1rem',
    marginBottom: '32px',
    color: '#e0e0e0'
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer'
  },
  socialContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  socialIconIG: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '16px',
    background: 'linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    color: 'white'
  },
  socialIconWA: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '16px',
    backgroundColor: '#25D366',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    color: 'white'
  },
};

export default LandingPage;