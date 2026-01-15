import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaStore, FaCalendarAlt, FaSignOutAlt, FaPhone, FaChevronRight } from 'react-icons/fa';
import api from '../api'; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myList, setMyList] = useState({ events: [], umkm: [] });
  const [loading, setLoading] = useState(true);

  // --- 1. AMBIL DATA USER & CONTENT ---
  useEffect(() => {
    // Ambil data user dari LocalStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchUserContent(); // Jalankan fetch data real
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // --- 2. FUNGSI AMBIL DATA REAL (Integrasi API) ---
  const fetchUserContent = async () => {
    setLoading(true);
    try {
      // Kita panggil 2 endpoint sekaligus: UMKM saya & Event saya
      const [umkmRes, eventRes] = await Promise.all([
        api.get('/my-umkm'),   // Sesuai route di api.php
        api.get('/my-events')  // Sesuai route baru di api.php
      ]);

      setMyList({
        // Gunakan .data.data jika backend pakai API Resource, atau .data saja jika return langsung
        umkm: umkmRes.data.data || umkmRes.data || [], 
        events: eventRes.data.data || eventRes.data || []
      });

    } catch (error) {
      console.error("Gagal mengambil data profil:", error);
      // Opsional: Jika unauthorized (401), paksa logout
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- 3. FUNGSI LOGOUT ---
  const handleLogout = async () => {
    const confirm = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirm) {
      try {
        await api.post('/logout'); // Logout di server (opsional, best practice)
      } catch (err) {
        console.log("Logout server error", err);
      }
      
      // Hapus data lokal
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (!user) return null; 

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>← Kembali</button>
        <h2 style={styles.headerTitle}>Profil Saya</h2>
        <div style={{ width: '30px' }}></div>
      </div>
      
      <div style={styles.content}>
        
        {/* --- BAGIAN PROFIL USER --- */}
        <div style={styles.profileCard}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              <FaUser size={40} color="#0B2447" />
            </div>
          </div>
          <div style={styles.userInfo}>
            <h3 style={styles.userName}>{user.name || "Nama Pengguna"}</h3>
            <p style={styles.userPhone}>
              <FaPhone size={12} style={{ marginRight: '6px' }} />
              {user.no_hp || user.email || "-"}
            </p>
          </div>
        </div>

        {/* --- LIST UMKM SAYA --- */}
        <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>UMKM Terdaftar</h3>
        </div>

        {loading ? (
            <p style={{textAlign:'center'}}>Memuat data...</p>
        ) : myList.umkm.length > 0 ? (
          <div style={styles.listContainer}>
            {myList.umkm.map((item) => (
              <div key={item.id} style={styles.cardItem} onClick={() => navigate(`/umkm/${item.id}`)}>
                <div style={styles.cardIconUmkm}><FaStore size={20} color="white"/></div>
                <div style={styles.cardContent}>
                  {/* Sesuaikan nama field dengan database (misal: 'name' atau 'nama_umkm') */}
                  <h4 style={styles.cardTitle}>{item.name || item.nama_umkm}</h4> 
                  <p style={styles.cardSubtitle}>
                    {item.category ? item.category.name : 'Kategori'} • 
                    <span style={{color: 'green', marginLeft:'4px'}}>{item.status || 'Aktif'}</span>
                  </p>
                </div>
                <FaChevronRight color="#ccc" />
              </div>
            ))}
          </div>
        ) : (
            <div style={styles.emptyState}>Belum ada UMKM didaftarkan.</div>
        )}

        {/* --- LIST EVENT SAYA --- */}
        <div style={{...styles.sectionHeader, marginTop: '24px'}}>
            <h3 style={styles.sectionTitle}>Event Terdaftar</h3>
        </div>

        {loading ? (
            <p style={{textAlign:'center'}}>Memuat data...</p>
        ) : myList.events.length > 0 ? (
          <div style={styles.listContainer}>
            {myList.events.map((item) => (
              <div key={item.id} style={styles.cardItem} onClick={() => navigate(`/events/${item.id}`)}>
                <div style={styles.cardIconEvent}><FaCalendarAlt size={20} color="white"/></div>
                <div style={styles.cardContent}>
                   {/* Sesuaikan nama field dengan database (misal: 'title' atau 'nama_event') */}
                  <h4 style={styles.cardTitle}>{item.title || item.nama_event}</h4>
                  <p style={styles.cardSubtitle}>
                    {item.date || item.tanggal_event} • {item.location || item.lokasi}
                  </p>
                </div>
                <FaChevronRight color="#ccc" />
              </div>
            ))}
          </div>
        ) : (
            <div style={styles.emptyState}>Belum ada Event didaftarkan.</div>
        )}

        {/* --- TOMBOL LOGOUT --- */}
        <div style={styles.logoutContainer}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <FaSignOutAlt style={{ marginRight: '10px' }} />
            Keluar Akun
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '480px', 
    margin: '0 auto',
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: 0
  },
  content: {
    padding: '20px',
    paddingBottom: '40px'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    marginBottom: '30px'
  },
  avatarContainer: {
    marginBottom: '16px'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#E0F2FE', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #0077B6'
  },
  userInfo: {
    textAlign: 'center'
  },
  userName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  userPhone: {
    fontSize: '0.9rem',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeader: {
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#374151',
    margin: 0
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  cardItem: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  cardIconUmkm: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#0077B6', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardIconEvent: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#F59E0B', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 2px 0'
  },
  cardSubtitle: {
    fontSize: '0.8rem',
    color: '#6B7280',
    margin: 0
  },
  emptyState: {
    padding: '20px',
    textAlign: 'center',
    color: '#9CA3AF',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px dashed #D1D5DB',
    fontSize: '0.9rem'
  },
  logoutContainer: {
    marginTop: '40px',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '20px'
  },
  logoutBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#EF4444', 
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)'
  }
};

export default ProfilePage;