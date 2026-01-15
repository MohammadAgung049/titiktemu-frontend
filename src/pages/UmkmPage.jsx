import React, { useState, useEffect } from 'react';
import api, { IMAGE_BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass, FaLocationDot, FaFilter, FaPlus } from 'react-icons/fa6'; 

export default function UmkmPage() {
  const navigate = useNavigate();
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Dummy Data (Jika API belum siap, ini akan tampil)
  const mockData = [
    { id: 1, nama_usaha: 'Kopi Senja', kategori: 'Kuliner', lokasi: 'Jl. Merdeka No. 10', foto: 'https://via.placeholder.com/150', deskripsi: 'Kopi nikmat dengan suasana senja yang menenangkan.' },
    { id: 2, nama_usaha: 'Kerajinan Bambu', kategori: 'Kerajinan', lokasi: 'Desa Wisata', foto: 'https://via.placeholder.com/150', deskripsi: 'Produk kerajinan tangan asli dari bambu pilihan.' },
    { id: 3, nama_usaha: 'Bakso Mas Kumis', kategori: 'Kuliner', lokasi: 'Pasar Lama', foto: 'https://via.placeholder.com/150', deskripsi: 'Bakso urat paling legendaris di kota ini.' },
  ];

  useEffect(() => {
    fetchUmkm();
  }, []);

  const fetchUmkm = async () => {
    try {
      setLoading(true);
      
      // 1. Panggil API (Singkat & Bersih)
      // Tidak perlu tulis http://localhost... atau header token lagi
      const response = await api.get('/umkm');

      console.log("Data dari API:", response.data); // Cek console browser untuk debug

      // 2. Logika Penentuan Data
      // Jika API mengembalikan data (array ada isinya), pakai data API.
      if (response.data && response.data.length > 0) {
        setUmkmList(response.data);
      } else {
        // Jika API sukses tapi datanya kosong (belum ada UMKM),
        // Kita tampilkan mockData sementara supaya tampilan tidak kosong melompong.
        console.log("Data API kosong, menggunakan Mock Data.");
        setUmkmList(mockData);
      }

    } catch (error) {
      console.error("Gagal koneksi ke API:", error);
      // 3. Error Handling
      // Jika Backend mati atau error, otomatis pakai Mock Data
      setUmkmList(mockData); 
    } finally {
      setLoading(false);
    }
  };

  // Logic Filtering
  const filteredUmkm = umkmList.filter((item) => {
    const matchSearch = item.nama_usaha.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div style={styles.container}>
      
      {/* 1. Header (Mirip Home Page) */}
      <div style={styles.header}>
        <div onClick={() => navigate('/home')}>
          <h2 style={styles.greeting}>Halo, Warga! 👋</h2>
          <p style={styles.subGreeting}>Mau cari jajanan atau jasa apa hari ini?</p>
        </div>
        {/* Tombol Tambah (Opsional, untuk admin/user) */}
        <button onClick={() => navigate('/add-umkm')} style={styles.addButton}>
          <FaPlus size={20} />
        </button>
      </div>

      {/* 2. Search Bar & Filter Dropdown */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <FaMagnifyingGlass size={18} color="#888" style={{ marginLeft: '10px' }} />
          <input 
            type="text" 
            placeholder="Cari UMKM..." 
            style={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Dropdown Filter */}
        <div style={styles.filterWrapper}>
           <FaFilter size={18} color="#555" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} />
           <select 
             style={styles.filterSelect} 
             value={selectedCategory} 
             onChange={(e) => setSelectedCategory(e.target.value)}
           >
             <option value="Semua">Semua</option>
             <option value="Kuliner">Kuliner</option>
             <option value="Fashion">Fashion</option>
             <option value="Jasa">Jasa</option>
             <option value="Kerajinan">Kerajinan</option>
           </select>
        </div>
      </div>

      {/* 3. Navigation Buttons (Tabs) */}
      <div style={styles.navTabs}>
        <button style={{ ...styles.tabButton, ...styles.activeTab }}>UMKM</button>
        <button 
          style={{ ...styles.tabButton, ...styles.inactiveTab }} 
          onClick={() => navigate('/event')} // Asumsi ada page events
        >
          Events
        </button>
      </div>

      {/* 4. Content Area (List Card) */}
      <div style={styles.content}>
        {loading ? (
          <p style={{textAlign: 'center', color: '#888'}}>Memuat data...</p>
        ) : filteredUmkm.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Tidak ada UMKM yang ditemukan.</p>
          </div>
        ) : (
          filteredUmkm.map((item) => (
            <div key={item.id} style={styles.card} onClick={() => navigate(`/umkm/${item.id}`)}>
              {/* Foto UMKM */}
              <div style={styles.cardImageContainer}>
              <img 
                  src={
                    item.foto 
                      // Cek 1: Kalau fotonya link lengkap (misal dari Mock Data/Google), pakai langsung
                      ? (item.foto.startsWith('http') 
                          ? item.foto 
                          // Cek 2: Kalau dari API (nama file doang), gabungin sama Base URL
                          : `${IMAGE_BASE_URL}/storage/${item.foto}`) 
                      // Cek 3: Kalau gak ada foto, pakai gambar abu-abu (placeholder)
                      : 'https://via.placeholder.com/300'
                  } 
                  
                  alt={item.nama_usaha} 
                  style={styles.cardImage} 
                />
                 <span style={styles.categoryBadge}>{item.kategori}</span>
              </div>
              
              {/* Info UMKM */}
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{item.nama_usaha}</h3>
                <div style={styles.cardLocation}>
                  <FaLocationDot size={14} color="#666" style={{marginRight: '4px'}}/>
                  <span>{item.lokasi}</span>
                </div>
                <p style={styles.cardDesc}>{item.deskripsi.substring(0, 60)}...</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

// Styles
// Ganti seluruh bagian const styles dengan ini:
const styles = {
    // 1. Container diperlebar agar full screen di laptop
    container: { 
      maxWidth: '1200px', 
      margin: '0 auto', 
      minHeight: '100vh', 
      backgroundColor: '#F8F9FA', 
      fontFamily: 'Poppins, sans-serif', 
      paddingBottom: '80px' 
    },
    
    // Header
    header: { 
      padding: '20px 30px', // Padding sedikit diperbesar
      backgroundColor: '#fff', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid #eee' // Tambahan garis bawah biar rapi
    },
    greeting: { fontSize: '24px', fontWeight: 'bold', color: '#0D2B47', margin: 0 },
    subGreeting: { fontSize: '14px', color: '#666', marginTop: '4px' },
    addButton: { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#0D2B47', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  
    // Search & Filter
    searchContainer: { 
      display: 'flex', 
      gap: '15px', 
      padding: '20px 30px', 
      backgroundColor: '#fff', 
      position: 'sticky', 
      top: 0, 
      zIndex: 10,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)' // Sedikit bayangan saat scroll
    },
    searchWrapper: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#F0F2F5', borderRadius: '12px', padding: '0 10px' },
    searchInput: { width: '100%', padding: '14px', border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '15px' },
    
    filterWrapper: { position: 'relative', display: 'flex', alignItems: 'center', width: '150px' },
    filterSelect: { width: '100%', padding: '14px 10px 14px 40px', borderRadius: '12px', border: 'none', backgroundColor: '#F0F2F5', fontSize: '14px', color: '#333', appearance: 'none', cursor: 'pointer' },
  
    // Tabs
    navTabs: { display: 'flex', padding: '0 30px 20px 30px', backgroundColor: '#fff', gap: '20px' },
    tabButton: { padding: '10px 25px', borderRadius: '25px', border: 'none', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: '0.3s' },
    activeTab: { backgroundColor: '#0D2B47', color: '#fff' },
    inactiveTab: { backgroundColor: '#E5E7EB', color: '#9CA3AF' },
  
    // 2. Content Grid (KUNCI PERUBAHAN TAMPILAN)
    content: { 
      padding: '30px', 
      display: 'grid', 
      // Rumus ajaib CSS Grid:
      // Buat kolom sebanyak mungkin (auto-fill), tapi tiap kolom minimal 280px.
      // Kalau layar sempit (HP), otomatis jadi 1 kolom. Kalau layar lebar (PC), bisa 3-4 kolom.
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '25px' 
    },
    
    emptyState: { gridColumn: '1 / -1', textAlign: 'center', marginTop: '50px', color: '#999', fontSize: '16px' },
  
    // Card Styles
    card: { 
      backgroundColor: '#fff', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
      cursor: 'pointer', 
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',         // Agar isi card tertata vertikal
      flexDirection: 'column' 
    },
    // Hover effect manual bisa ditambahkan via CSS eksternal, tapi di inline style agak sulit tanpa state onMouseEnter.
    
    cardImageContainer: { width: '100%', height: '180px', position: 'relative', backgroundColor: '#ddd' },
    cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
    categoryBadge: { position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', color: '#0D2B47', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    
    cardContent: { padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' },
    cardTitle: { margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' },
    cardLocation: { display: 'flex', alignItems: 'center', fontSize: '13px', color: '#666', marginBottom: '10px' },
    cardDesc: { fontSize: '13px', color: '#888', lineHeight: '1.6', flex: 1 }, // flex: 1 akan mendorong footer card (jika ada) ke bawah
  };