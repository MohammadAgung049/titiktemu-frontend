import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// ✅ 1. Import api & IMAGE_BASE_URL
import api, { IMAGE_BASE_URL } from '../api'; 
import { FaCircleCheck, FaCalendar, FaLocationDot, FaUser, FaStore, FaPhone, FaMoneyBillWave, FaUsers } from 'react-icons/fa6';


export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userEvents, setUserEvents] = useState([]);
  const [userUmkm, setUserUmkm] = useState([]);
  
  // Get newly created item from navigation state
  const newlyCreated = location.state?.newlyCreated || null;
  const createdType = location.state?.type || null; // 'event' or 'umkm'

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Cek token sekedar untuk redirect kalau belum login
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // ✅ 2. Gunakan 'api.get' (Token otomatis di-handle di api.js)
      // Kita pakai Promise.all supaya loading barengan
      const [eventsRes, umkmRes] = await Promise.all([
        api.get('/events').catch(() => ({ data: [] })), // Kalau error, return array kosong biar gak crash
        api.get('/umkm').catch(() => ({ data: [] }))
      ]);

      console.log("My UMKM:", umkmRes.data); // Debugging

      setUserEvents(eventsRes.data || []);
      setUserUmkm(umkmRes.data || []);

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper: Logic Gambar Pintar (Dipakai untuk Event & UMKM)
  const getImageUrl = (imageName) => {
    if (!imageName) return 'https://via.placeholder.com/300';
    if (imageName.startsWith('http')) return imageName;
    return `${IMAGE_BASE_URL}/storage/${imageName}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatRupiah = (number) => {
    if (!number) return 'Gratis / -';
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(number);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={{ textAlign: 'center', padding: '40px' }}>Memuat data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Review Pendaftaran</h2>
      </div>

      {/* Success Message */}
      {newlyCreated && (
        <div style={styles.successBanner}>
          <FaCircleCheck size={24} color="#10B981" />
          <div style={styles.successText}>
            <h3 style={styles.successTitle}>
              {createdType === 'event' ? 'Event Berhasil Didaftarkan!' : 'UMKM Berhasil Didaftarkan!'}
            </h3>
            <p style={styles.successSubtitle}>
              Data Anda telah tersimpan. Berikut adalah daftar yang Anda kelola.
            </p>
          </div>
        </div>
      )}

      {/* Events Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <FaCalendar style={{ marginRight: '8px' }} />
            Event Saya
          </h3>
          <button 
            onClick={() => navigate('/add-event')} 
            style={styles.addButton}
          >
            + Tambah Event
          </button>
        </div>

        {userEvents.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Anda belum memiliki event. <span 
              style={styles.link} 
              onClick={() => navigate('/add-event')}
            >Daftarkan event pertama Anda!</span></p>
          </div>
        ) : (
          <div style={styles.grid}>
            {userEvents.map((event) => (
              <div key={event.id} style={styles.card}>
                  <img 
                    // Gunakan helper gambar
                    src={getImageUrl(event.poster || event.foto)} 
                    alt={event.nama_event} 
                    style={styles.cardImage}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                  />
                <div style={styles.cardContent}>
                  <h4 style={styles.cardTitle}>{event.nama_event}</h4>
                  
                  <div style={styles.cardDetail}>
                    <FaUser size={12} color="#666" />
                    <span>{event.penyelenggara}</span>
                  </div>
                  
                  <div style={styles.cardDetail}>
                    <FaLocationDot size={12} color="#666" />
                    <span>{event.lokasi}</span>
                  </div>
                  
                  <div style={styles.cardDetail}>
                    <FaCalendar size={12} color="#666" />
                    <span>{formatDate(event.tanggal_mulai)}</span>
                  </div>
                  
                  <div style={styles.cardDetail}>
                    <FaUsers size={12} color="#666" />
                    <span>{event.slot_tenant || 0} Slot Tersedia</span>
                  </div>
                  
                  <div style={styles.cardDetail}>
                    <FaMoneyBillWave size={12} color="#666" />
                    <span>{formatRupiah(event.harga_tenant)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* UMKM Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <FaStore style={{ marginRight: '8px' }} />
            UMKM Saya
          </h3>
          <button 
            onClick={() => navigate('/add-umkm')} 
            style={styles.addButton}
          >
            + Tambah UMKM
          </button>
        </div>

        {userUmkm.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Anda belum memiliki UMKM. <span 
              style={styles.link} 
              onClick={() => navigate('/add-umkm')}
            >Daftarkan UMKM pertama Anda!</span></p>
          </div>
        ) : (
          <div style={styles.grid}>
            {userUmkm.map((umkm) => (
              <div key={umkm.id} style={styles.card}>
                  <img 
                    // ✅ Sinkronisasi nama field: 'foto' (bukan poster, sesuai AddUmkm)
                    src={getImageUrl(umkm.foto)} 
                    alt={umkm.nama_usaha} 
                    style={styles.cardImage}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                  />
                <div style={styles.cardContent}>
                  <h4 style={styles.cardTitle}>{umkm.nama_usaha}</h4>
                  
                  {umkm.kategori && (
                    <div style={styles.cardBadge}>
                      {umkm.kategori}
                    </div>
                  )}

                  <div style={{marginTop: '10px'}}>
                    {umkm.pemilik && (
                      <div style={styles.cardDetail}>
                        <FaUser size={12} color="#666" />
                        <span>{umkm.pemilik}</span>
                      </div>
                    )}
                    
                    {umkm.lokasi && (
                      <div style={styles.cardDetail}>
                        <FaLocationDot size={12} color="#666" />
                        <span>{umkm.lokasi}</span> 
                        {/* Note: Di AddUmkm namanya 'lokasi', di database mungkin 'alamat' atau 'lokasi', sesuaikan ya */}
                      </div>
                    )}
                    
                    {umkm.no_wa && (
                      <div style={styles.cardDetail}>
                        <FaPhone size={12} color="#666" />
                        <span>{umkm.no_wa}</span>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button 
          onClick={() => navigate('/home')} 
          style={styles.primaryButton}
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

// Styles (Tetap sama, tidak ada perubahan yang merusak)
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#F8F9FA',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#666',
    marginRight: '15px'
  },
  title: {
    flex: 1,
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0D2B47'
  },
  successBanner: {
    backgroundColor: '#D1FAE5',
    border: '1px solid #10B981',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  successText: {
    flex: 1
  },
  successTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#065F46'
  },
  successSubtitle: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#047857'
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #F3F4F6'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#0D2B47',
    display: 'flex',
    alignItems: 'center'
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#0D2B47',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    backgroundColor: '#E5E7EB'
  },
  cardContent: {
    padding: '15px'
  },
  cardTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#111827'
  },
  cardDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#6B7280',
    marginBottom: '8px'
  },
  cardBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#0D2B47',
    color: 'white',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    marginBottom: '10px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6B7280'
  },
  link: {
    color: '#0D2B47',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '2px solid #E5E7EB'
  },
  primaryButton: {
    padding: '12px 30px',
    backgroundColor: '#0D2B47',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s'
  }
};