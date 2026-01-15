import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserTie, FaUsers, FaMoneyBillWave, FaWhatsapp, FaEnvelope, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import api from '../api';

const DetailEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  // Fungsi untuk format tanggal agar lebih cantik (Contoh: 12 Januari 2025)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Fungsi untuk membuka WhatsApp
  const handleContactWA = () => {
    if (event?.no_telepon) {
      // Membersihkan nomor hp (ganti 08xx jadi 628xx jika perlu, ini versi sederhana)
      let phone = event.no_telepon.replace(/\D/g, '');
      if (phone.startsWith('0')) {
        phone = '62' + phone.substring(1);
      }
      const message = `Halo, saya tertarik dengan event "${event.nama_event}". Apakah slot masih tersedia?`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      alert("Nomor telepon tidak tersedia.");
    }
  };

  if (loading) return <div style={styles.loading}>Memuat detail event...</div>;
  if (!event) return <div style={styles.loading}>Event tidak ditemukan.</div>;

  return (
    <div style={styles.container}>
      {/* Header Navigasi */}
      <div style={styles.headerNav}>
        <button onClick={() => navigate(-1)} style={styles.iconBtn}>
          <FaArrowLeft />
        </button>
        <span style={styles.headerTitle}>Detail Event</span>
        <button style={styles.iconBtn}>
          <FaShareAlt />
        </button>
      </div>

      {/* Gambar Poster */}
      <div style={styles.imageContainer}>
        {event.poster ? (
          <img src={event.poster} alt={event.nama_event} style={styles.poster} />
        ) : (
          <div style={styles.placeholderImage}>
            <span>Tidak ada poster</span>
          </div>
        )}
      </div>

      {/* Konten Utama */}
      <div style={styles.content}>
        {/* Judul & Penyelenggara */}
        <h1 style={styles.title}>{event.nama_event}</h1>
        <div style={styles.organizer}>
          <FaUserTie color="#6B7280" />
          <span>Diselenggarakan oleh <strong>{event.penyelenggara}</strong></span>
        </div>

        {/* Informasi Utama (Grid) */}
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <div style={styles.iconBox}><FaCalendarAlt color="#0077B6" /></div>
            <div>
              <p style={styles.infoLabel}>Tanggal</p>
              <p style={styles.infoValue}>{formatDate(event.tanggal_mulai)}</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.iconBox}><FaMapMarkerAlt color="#DC2626" /></div>
            <div>
              <p style={styles.infoLabel}>Lokasi</p>
              <p style={styles.infoValue}>{event.lokasi}</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.iconBox}><FaUsers color="#F59E0B" /></div>
            <div>
              <p style={styles.infoLabel}>Sisa Slot</p>
              <p style={styles.infoValue}>{event.slot_tenant} Tenant</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.iconBox}><FaMoneyBillWave color="#10B981" /></div>
            <div>
              <p style={styles.infoLabel}>Harga Sewa</p>
              <p style={styles.infoValue}>{event.harga_tenant}</p>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Deskripsi Event</h3>
          <p style={styles.description}>
            {event.deskripsi || "Tidak ada deskripsi tambahan untuk event ini."}
          </p>
        </div>

        {/* Informasi Kontak (BARU) */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Kontak Penyelenggara</h3>
          <div style={styles.contactCard}>
            
            {/* Baris Email */}
            <div style={styles.contactRow}>
              <FaEnvelope color="#6B7280" size={18} />
              <div style={styles.contactText}>
                <span style={styles.contactLabel}>Email</span>
                <a href={`mailto:${event.email}`} style={styles.contactLink}>{event.email || "-"}</a>
              </div>
            </div>

            <div style={styles.divider}></div>

            {/* Baris Telepon */}
            <div style={styles.contactRow}>
              <FaWhatsapp color="#25D366" size={20} />
              <div style={styles.contactText}>
                <span style={styles.contactLabel}>WhatsApp / Telepon</span>
                <span style={styles.contactValue}>{event.no_telepon || "-"}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Sticky Bottom Button */}
      <div style={styles.bottomAction}>
        <button onClick={handleContactWA} style={styles.btnPrimary}>
          <FaWhatsapp size={20} style={{ marginRight: '8px' }} />
          Hubungi via WhatsApp
        </button>
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
    position: 'relative',
    paddingBottom: '80px' // Space untuk tombol bawah
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#666'
  },
  headerNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#374151',
    cursor: 'pointer',
    padding: '8px'
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  imageContainer: {
    width: '100%',
    height: '250px',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  placeholderImage: {
    color: '#9CA3AF',
    fontSize: '14px'
  },
  content: {
    padding: '20px'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '8px',
    lineHeight: '1.3'
  },
  organizer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#4B5563',
    fontSize: '0.9rem',
    marginBottom: '24px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px'
  },
  infoItem: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    border: '1px solid #F3F4F6'
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLabel: {
    fontSize: '0.75rem',
    color: '#6B7280',
    margin: 0
  },
  infoValue: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1F2937',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px'
  },
  section: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '12px'
  },
  description: {
    fontSize: '0.95rem',
    color: '#4B5563',
    lineHeight: '1.6',
    whiteSpace: 'pre-line' // Agar enter/paragraf terbaca
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    overflow: 'hidden'
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    gap: '12px'
  },
  contactText: {
    display: 'flex',
    flexDirection: 'column'
  },
  contactLabel: {
    fontSize: '0.75rem',
    color: '#9CA3AF'
  },
  contactLink: {
    fontSize: '0.95rem',
    color: '#0077B6',
    textDecoration: 'none',
    fontWeight: '500'
  },
  contactValue: {
    fontSize: '0.95rem',
    color: '#1F2937',
    fontWeight: '500'
  },
  divider: {
    height: '1px',
    backgroundColor: '#E5E7EB',
    margin: '0 16px'
  },
  bottomAction: {
    position: 'fixed',
    bottom: 0,
    left: '50%', // Trik untuk centering jika max-width container dibatasi
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px', // Samakan dengan container
    backgroundColor: 'white',
    padding: '16px 20px',
    boxShadow: '0 -4px 6px rgba(0,0,0,0.05)',
    borderTop: '1px solid #F3F4F6',
    display: 'flex',
    justifyContent: 'center'
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#25D366', // Warna WA
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    boxShadow: '0 4px 6px rgba(37, 211, 102, 0.2)'
  }
};

export default DetailEventPage;