import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass, FaLocationDot, FaFilter, FaPlus, FaCalendar, FaUser } from 'react-icons/fa6'; 

export default function EventPage() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  // Dummy Data (Supaya ada tampilan saat belum connect API)
  const mockData = [
    { 
      id: 1, 
      nama_event: 'Festival Kuliner Nusantara', 
      penyelenggara: 'Karang Taruna RW 05', 
      lokasi: 'Lapangan Utama Desa', 
      tanggal_mulai: '2023-11-20',
      harga_tenant: 150000,
      poster: 'https://via.placeholder.com/300x200?text=Fest+Kuliner', 
    },
    { 
      id: 2, 
      nama_event: 'Pameran Seni & Kreatif', 
      penyelenggara: 'Komunitas Seniman', 
      lokasi: 'Balai Warga', 
      tanggal_mulai: '2023-12-05',
      harga_tenant: 100000,
      poster: 'https://via.placeholder.com/300x200?text=Pameran+Seni', 
    },
    { 
      id: 3, 
      nama_event: 'Bazaar Minggu Pagi', 
      penyelenggara: 'Ibu-ibu PKK', 
      lokasi: 'Jalan Protokol', 
      tanggal_mulai: '2023-11-26',
      harga_tenant: 50000,
      poster: 'https://via.placeholder.com/300x200?text=Bazaar+Pagi', 
    },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // Endpoint API Events
      const response = await axios.get('http://localhost:8000/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEventList(response.data.length > 0 ? response.data : mockData);
    } catch (error) {
      console.error("Gagal ambil data, menggunakan mock data:", error);
      setEventList(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Logic Filtering sederhana
  const filteredEvents = eventList.filter((item) => {
    const matchSearch = item.nama_event.toLowerCase().includes(searchTerm.toLowerCase());
    // Disini filter kategori bisa disesuaikan, misal filter berdasarkan harga atau status
    // Untuk sekarang kita set 'Semua' agar muncul semua
    return matchSearch; 
  });

  // Helper untuk format tanggal
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Helper untuk format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  return (
    <div style={styles.container}>
      
      {/* 1. Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.greeting} onClick={() => navigate('/home')}>Event Terkini 🎉</h2>
          <p style={styles.subGreeting}>Temukan peluang usaha di event sekitar!</p>
        </div>
        {/* Tombol ke Add Event */}
        <button onClick={() => navigate('/add-event')} style={styles.addButton}>
          <FaPlus size={20} />
        </button>
      </div>

      {/* 2. Search Bar & Filter */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <FaMagnifyingGlass size={18} color="#888" style={{ marginLeft: '10px' }} />
          <input 
            type="text" 
            placeholder="Cari Event..." 
            style={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Dropdown */}
        <div style={styles.filterWrapper}>
           <FaFilter size={18} color="#555" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} />
           <select 
             style={styles.filterSelect} 
             value={selectedFilter} 
             onChange={(e) => setSelectedFilter(e.target.value)}
           >
             <option value="Semua">Semua</option>
             <option value="Terbaru">Terbaru</option>
             <option value="Terdekat">Terdekat</option>
             <option value="Murah">Sewa Murah</option>
           </select>
        </div>
      </div>

      {/* 3. Navigation Tabs (Event Aktif) */}
      <div style={styles.navTabs}>
        <button 
          style={{ ...styles.tabButton, ...styles.inactiveTab }} 
          onClick={() => navigate('/umkm')}
        >
          UMKM
        </button>
        <button style={{ ...styles.tabButton, ...styles.activeTab }}>Events</button>
      </div>

      {/* 4. Content Grid */}
      <div style={styles.content}>
        {loading ? (
          <p style={{gridColumn: '1/-1', textAlign: 'center', color: '#888'}}>Memuat data event...</p>
        ) : filteredEvents.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Belum ada event yang tersedia saat ini.</p>
          </div>
        ) : (
          filteredEvents.map((item) => (
            <div key={item.id} style={styles.card} onClick={() => navigate(`/events/${item.id}`)}>
              
              {/* Image & Date Badge */}
              <div style={styles.cardImageContainer}>
                 <img 
                    src={item.poster ? (typeof item.poster === 'string' ? item.poster : URL.createObjectURL(item.poster)) : 'https://via.placeholder.com/300x200'} 
                    alt={item.nama_event} 
                    style={styles.cardImage} 
                 />
                 {/* Badge Tanggal */}
                 <span style={styles.dateBadge}>
                    <FaCalendar size={10} style={{marginRight: '4px'}}/>
                    {formatDate(item.tanggal_mulai)}
                 </span>
              </div>
              
              {/* Info Event */}
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{item.nama_event}</h3>
                
                <div style={styles.cardRow}>
                  <FaUser size={14} color="#666" style={{marginRight: '6px'}}/>
                  <span>{item.penyelenggara}</span>
                </div>

                <div style={styles.cardRow}>
                  <FaLocationDot size={14} color="#666" style={{marginRight: '6px'}}/>
                  <span>{item.lokasi}</span>
                </div>

                {/* Harga Tenant */}
                <div style={styles.priceTag}>
                    <span style={{fontSize: '11px', color: '#666'}}>Sewa Tenant:</span>
                    <span style={{fontWeight: 'bold', color: '#0D2B47'}}>{formatRupiah(item.harga_tenant)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

// CSS Styles (Sama persis dengan UmkmPage Responsive)
const styles = {
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
    padding: '20px 30px', 
    backgroundColor: '#fff', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottom: '1px solid #eee'
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
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
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

  // Content Grid Responsive
  content: { 
    padding: '30px', 
    display: 'grid', 
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
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column'
  },
  cardImageContainer: { width: '100%', height: '180px', position: 'relative', backgroundColor: '#ddd' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  // Badge Tanggal (Menggantikan Kategori)
  dateBadge: { position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', color: '#D946EF', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  
  cardContent: { padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  cardTitle: { margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' },
  
  cardRow: { display: 'flex', alignItems: 'center', fontSize: '13px', color: '#666' },
  
  priceTag: { marginTop: 'auto', paddingTop: '10px', borderTop: '1px dashed #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
};