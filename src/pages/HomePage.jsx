import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 

import { 
  FaStore, 
  FaCalendarPlus, 
  FaChartLine, 
  FaMagnifyingGlass, 
  FaStar, 
  FaLocationDot, 
  FaTicket, 
  FaClock
} from 'react-icons/fa6';

import logoImage from '../assets/logo2-titik-kumpul.png'; 

const HomePage = () => {
  const navigate = useNavigate();
  
  const [eventList, setEventList] = useState([]);
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [umkmRes, eventRes] = await Promise.all([
          api.get('/umkm'),
          api.get('/events')
        ]);

        const allUmkm = Array.isArray(umkmRes.data) ? umkmRes.data : [];
        const allEvents = Array.isArray(eventRes.data) ? eventRes.data : [];

        setUmkmList(allUmkm.slice(0, 4)); 
        setEventList(allEvents.slice(0, 3)); 

      } catch (error) {
        console.error("Gagal mengambil data home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // --- HELPER FUNCTIONS ---

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} size={14} color={i < count ? "#F59E0B" : "#D1D5DB"} />
    ));
  };

  // ✅ PERBAIKAN UTAMA DI SINI
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300?text=No+Image';
    
    // Jika backend sudah mengirim link lengkap (karena Accessor di Model), pakai langsung!
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    
    // Jika backend cuma mengirim nama file (misal untuk UMKM jika belum ada accessor), baru tambah base url
    return `http://localhost:8000/storage/${path}`; 
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoGroup}>
             <img src={logoImage} alt="Logo" style={styles.logoImage} onClick={() => navigate('/home')} />
             <span style={styles.logoText} onClick={() => navigate('/home')}>TITIK KUMPUL</span>
          </div>

          <div style={styles.navGroup}>
            <button style={styles.navItem} onClick={() => navigate('/add-umkm')}>
              <FaStore />
              <span style={styles.navText}>Daftarkan Usaha</span>
            </button>
            <button style={styles.navItem} onClick={() => navigate('/add-event')}>
              <FaCalendarPlus />
              <span style={styles.navText}>Daftarkan Acara</span>
            </button>
            <button style={styles.navItem} onClick={() => navigate('/trend-market')}>
              <FaChartLine />
              <span style={styles.navText}>Tren Pasar</span>
            </button>
            
            <div style={styles.userProfile} onClick={() => navigate('/profile')}>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
                alt="User" 
                style={styles.userImage}
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT UTAMA */}
      <main style={styles.main}>
        
        {/* SEARCH BAR */}
        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <FaMagnifyingGlass color="#9CA3AF" style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Cari event atau umkm..." 
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <button style={styles.filterBtn} onClick={() => navigate('/umkm')}>
              <FaStore color="#0B2447" />
              <span style={styles.filterText}>UMKM</span>
            </button>
            <button style={styles.filterBtn} onClick={() => navigate('/event')}>
              <FaTicket color="#0B2447" />
              <span style={styles.filterText}>Event</span>
            </button>
          </div>
        </div>

        {/* SECTION UMKM */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>UMKM Terbaru</h2>
          
          {loading ? (
            <p>Sedang memuat data...</p>
          ) : umkmList.length === 0 ? (
            <p>Belum ada UMKM terdaftar.</p>
          ) : (
            <div style={styles.gridContainer}>
              {umkmList.map((item) => (
                <div 
                  key={item.id} 
                  style={styles.card}
                  onClick={() => navigate(`/umkm/${item.id}`)}
                >
                  <div style={styles.cardHeader}>
                    <div>
                      <h3 style={styles.cardTitle}>{item.nama_usaha}</h3> 
                      <p style={styles.cardSubtitle}>{item.lokasi}</p>
                    </div>
                    <div style={{  display: 'flex' }}>
                      {renderStars(5)} 
                    </div>
                  </div>
                  
                  <div style={styles.cardImageContainer}>
                    <img 
                      src={getImageUrl(item.foto)} 
                      alt={item.nama_usaha} 
                      style={styles.cardImage} 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Error+Loading'}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION EVENT */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Event Mendatang</h2>
          
          {loading ? (
            <p>Sedang memuat data...</p>
          ) : eventList.length === 0 ? (
            <p>Belum ada Event Saat ini.</p>
          ) : (
            <div style={styles.gridContainer}>
              {eventList.map((item) => (
                <div 
                  key={item.id} 
                  style={styles.card}
                  onClick={() => navigate(`/events/${item.id}`)}
                >
                  <div style={styles.cardHeader}>
                    <div>
                      <h3 style={styles.cardTitleEvent}>{item.nama_event}</h3> 
                    </div>
                    <div style={{  display: 'flex' }}>
                      {renderStars(5)} 
                    </div>
                  </div>
                  
                  
                  <div style={styles.cardImageContainerEvent}>
                    {/* Menggunakan item.poster dengan getImageUrl yang sudah diperbaiki */}
                    <img 
                      src={getImageUrl(item.poster)} 
                      alt={item.nama_event} 
                      style={styles.cardImage} 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Error+Loading'}
                    />
                     <span style={styles.dateBadge}>
                        <FaCalendarPlus style={{marginRight: '4px'}}/> 
                        {formatDate(item.tanggal_mulai)}
                     </span>
                  </div>
                  
                  <div style={{paddingTop: '5px'}}>
                     <p style={{fontSize: '1rem', color: '#666', display:'flex', alignItems:'center', gap:'16px'}}>
                        <FaLocationDot color="#0B2447"/> {item.lokasi}
                     </p>
                     <p style={{fontSize: '1rem', color: '#666', display:'flex', alignItems:'center', gap:'16px'}}>
                        <FaClock color="#0B2447"/> {item.tanggal_mulai}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

// --- STYLES (SAMA PERSIS DENGAN KODE KAMU) ---
const styles = {
  // --- GLOBAL ---
  container: { 
    minHeight: '100vh', 
    backgroundColor: 'white', 
    fontFamily: "'Poppins', sans-serif", 
    color: '#0B2447',
    overflowX: 'hidden' // Mencegah scroll samping yang tidak perlu
  },

  // --- HEADER (NAVBAR) ---
  header: { 
    width: '100%', 
    backgroundColor: '#0B2447', 
    color: 'white',
    // Hapus padding di sini biar ga ngerusak width 100%
    // Padding kita pindah ke headerContent
    position: 'sticky', 
    top: 0, 
    zIndex: 50, 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center' // Biar headerContent di tengah
  },

  headerContent: { 
    width: '100%',            // Isi penuh container
    maxWidth: '95%',       // TAPI mentok di 1200px (Standar Web)
    margin: '0 auto', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '12px 24px',     // Padding pindah kesini
    boxSizing: 'border-box'   // WAJIB: Biar padding ga bikin lebar nambah
  },

  logoGroup: { display: 'flex', alignItems: 'center', gap: '8px' }, // Kasih gap dikit biar ga nempel
  logoImage: { height: '64px', width: 'auto', cursor: 'pointer' }, // 64px kegedean buat HP, 40-48px ideal
  logoText: { fontSize: '1.5rem', fontWeight: '500', letterSpacing: '1px', cursor: 'pointer' }, // Font disesuaikan dikit

  navGroup: { display: 'flex', alignItems: 'center', gap: '16px' }, // Gap antar menu
  navItem: { fontSize: '1.6rem',background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', opacity: 0.9 },
  navText: { fontSize: '0.7rem', fontWeight: '300' }, // Teks menu diperkecil dikit biar elegan
  userProfile: { width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid white', marginLeft: '8px', cursor: 'pointer' },
  userImage: { width: '100%', height: '100%', objectFit: 'cover' },

  // --- MAIN CONTENT ---
  main: { 
    width: '100%',
    maxWidth: '95%', // Samain kaya headerContent biar lurus garis tepinya
    margin: '0 auto', 
    padding: '32px 16px',
    boxSizing: 'border-box'
  },

  // --- SEARCH SECTION ---
  searchSection: { display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap', alignItems: 'center' },
  
  searchContainer: {
    flex: 1, 
    maxWidth: '500px', // Batas maksimal search bar
    position: 'relative', 
    minWidth: '280px'  // Minimal segini biar ga gepeng di HP jadul
  },
  
  searchIcon: { fontSize: '1.6rem', position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' },
  searchInput: { width: '100%', padding: '14px 16px 14px 48px', backgroundColor: '#DADADA', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1.3rem', outline: 'none', boxSizing: 'border-box' },

  filterGroup: { display: 'flex', gap: '12px', alignItems: 'center' },
  filterBtn: { fontSize: '1.6rem', background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' },
  filterText: { fontSize: '0.8rem', fontWeight: '600', color: '#0B2447' },

  // --- SECTIONS & CARDS ---
  section: { marginBottom: '48px' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', marginTop: 0 },

  // 🔥 PERBAIKAN GRID (CRITICAL) 🔥
  gridContainer: { 
    display: 'grid', 
    // GANTI 450px JADI 280px
    // Artinya: "Minimal kolom 280px". Kalau layar HP 360px, dia muat 1 kolom.
    // Kalau layar Laptop, dia otomatis bagi jadi 3-4 kolom.
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '24px',
    justifyItems: 'center' // Biar card posisinya tengah kalau kolomnya sisa
  },

  card: { 
    display: 'flex', 
    flexDirection: 'column', 
    cursor: 'pointer', 
    transition: 'transform 0.2s', 
    width: '100%', 
    maxWidth: '500px', // Ini batas max biar ga kelebaran
    backgroundColor: 'white',
    // Tambahkan border radius di card utama juga biar sudut bawah ga lancip kalau ada border
    borderRadius: '16px' 
  },

  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  cardTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#0B2447', marginBottom: '4px', lineHeight: '1.4' },
  
  // Style Image
  cardImageContainer: { 
    width: '100%', 
    height: '200px', // Sedikit dipendekkan biar proporsional
    borderRadius: '16px', 
    overflow: 'hidden', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    position: 'relative',
    backgroundColor: '#eee'
  },
  
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },

  // Badges
  dateBadge: {
    position: 'absolute', top: '10px', right: '10px', 
    backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px 12px', 
    borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', 
    color: '#D946EF', display: 'flex', alignItems: 'center', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10
  },

  ratingBadge: {
    position: 'absolute', top: '10px', right: '10px', 
    backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px 12px', 
    borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', 
    color: '#F59E0B', display: 'flex', alignItems: 'center', 
    gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10
  },

  cardContent: {
    padding: '16px 4px', // Tambahan padding text
    display: 'flex',
    flexDirection: 'column'
  },
  
  cardSubtitle: { fontSize: '0.85rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' },
};

export default HomePage;