import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// ✅ Import api & IMAGE_BASE_URL
import api, { IMAGE_BASE_URL } from '../api'; 
import { FaArrowLeft, FaMapPin, FaTag, FaWhatsapp } from 'react-icons/fa6';

export default function DetailUmkmPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data fallback biar gak blank kalau error
  const mockDetail = {
    id: id,
    nama_usaha: 'Memuat data...',
    kategori: '-',
    lokasi: '-',
    deskripsi: 'Sedang mengambil data terbaru...',
    foto: null,
    no_wa: ''
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      // ✅ Panggil API detail berdasarkan ID
      const response = await api.get(`/umkm/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Gagal ambil detail:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper: URL Gambar Pintar
  const getImageUrl = (imageName) => {
    if (!imageName) return 'https://via.placeholder.com/800x400?text=Tidak+Ada+Foto';
    if (imageName.startsWith('http')) return imageName;
    return `${IMAGE_BASE_URL}/storage/${imageName}`;
  };

  // ✅ Helper: Buka WhatsApp
  const handleContactWA = () => {
    // Ambil no_wa dari database
    const phone = data?.no_wa; 
    
    if (!phone) {
      alert("Nomor WhatsApp belum dicantumkan oleh pemilik.");
      return;
    }

    // Format nomor: Hapus karakter non-angka, ganti 0 depan dengan 62
    let number = phone.replace(/\D/g,'');
    if (number.startsWith('0')) number = '62' + number.slice(1);

    window.open(`https://wa.me/${number}`, '_blank');
  };

  if (loading) return <div style={styles.loading}>Memuat data...</div>;
  
  const displayData = data || mockDetail; 

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <FaArrowLeft size={16} /> Kembali
        </button>
      </div>

      <div style={styles.imageContainer}>
        <img 
          src={getImageUrl(displayData.foto)} 
          alt={displayData.nama_usaha} 
          style={styles.heroImage} 
          onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Gagal+Muat+Gambar'}
        />
        <span style={styles.categoryBadge}>
            <FaTag size={12} style={{marginRight:5}}/> {displayData.kategori || 'Umum'}
        </span>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>{displayData.nama_usaha}</h1>
        
        <div style={styles.metaRow}>
          <FaMapPin size={16} color="#666" />
          <span style={styles.metaText}>{displayData.lokasi || 'Lokasi tidak dicantumkan'}</span>
        </div>

        <hr style={styles.divider} />

        <h3 style={styles.sectionTitle}>Tentang Usaha</h3>
        <p style={styles.description}>
          {displayData.deskripsi || 'Tidak ada deskripsi.'}
        </p>

        {/* Tombol WA */}
        <button onClick={handleContactWA} style={styles.contactBtn}>
          <FaWhatsapp size={20} /> Hubungi Penjual
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif' },
  loading: { padding: '50px', textAlign: 'center', color: '#666', marginTop: '50px' },
  header: { padding: '20px', position: 'absolute', zIndex: 10, top: 0, left: 0 },
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', color: '#333' },
  
  imageContainer: { width: '100%', height: '350px', position: 'relative', backgroundColor: '#eee' },
  heroImage: { width: '100%', height: '100%', objectFit: 'cover' },
  categoryBadge: { position: 'absolute', bottom: '20px', left: '20px', backgroundColor: '#0D2B47', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' },
  
  content: { padding: '30px', position: 'relative', top: '-20px', backgroundColor: '#fff', borderRadius: '25px 25px 0 0', minHeight: '300px' }, 
  title: { fontSize: '26px', fontWeight: '800', color: '#111', marginBottom: '10px' },
  metaRow: { display: 'flex', alignItems: 'center', gap: '10px', color: '#555', marginBottom: '20px' },
  metaText: { fontSize: '14px' },
  divider: { border: 'none', borderTop: '1px solid #eee', margin: '20px 0' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#0D2B47' },
  description: { fontSize: '15px', lineHeight: '1.8', color: '#444', whiteSpace: 'pre-line' },
  
  contactBtn: { marginTop: '30px', width: '100%', padding: '16px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.2s', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)' }
};