import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ Import api helper kita
import api from '../api'; 

export default function AddUmkm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State Form
  const [formData, setFormData] = useState({
    nama_usaha: '',
    kategori: '',
    lokasi: '',   
    deskripsi: '',
    no_wa: '', // ✅ TAMBAHKAN INI (Biar tidak error undefined)
  });

  // State untuk File
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  
  const [buktiPerizinan, setBuktiPerizinan] = useState(null);
  const [previewBuktiPerizinan, setPreviewBuktiPerizinan] = useState(null);
  
  // Refs untuk cleanup memory leak
  const previewFotoRef = useRef(null);
  const previewBuktiRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewFotoRef.current) URL.revokeObjectURL(previewFotoRef.current);
      if (previewBuktiRef.current) URL.revokeObjectURL(previewBuktiRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewFotoRef.current) URL.revokeObjectURL(previewFotoRef.current);
      const newUrl = URL.createObjectURL(file);
      previewFotoRef.current = newUrl;
      setFoto(file);
      setPreviewFoto(newUrl);
    }
  };

  const handleBuktiChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewBuktiRef.current) URL.revokeObjectURL(previewBuktiRef.current);
      const newUrl = URL.createObjectURL(file);
      previewBuktiRef.current = newUrl;
      setBuktiPerizinan(file);
      setPreviewBuktiPerizinan(newUrl);
    }
  };

  // --- LOGIC SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // ✅ Pastikan nama KEY (kiri) sama persis dengan Controller Laravel
    data.append('nama_usaha', formData.nama_usaha);
    data.append('kategori', formData.kategori);
    data.append('lokasi', formData.lokasi);
    data.append('deskripsi', formData.deskripsi);
    data.append('no_wa', formData.no_wa); // ✅ JANGAN LUPA KIRIM INI
    
    if (foto) data.append('foto', foto);
    if (buktiPerizinan) data.append('bukti_perizinan', buktiPerizinan);

    try {
      const response = await api.post('/umkm', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("Sukses:", response.data);

      navigate('/review', {
        state: {
          newlyCreated: response.data.data, // Sesuaikan struktur response backend
          type: 'umkm'
        }
      });

    } catch (error) {
      if (error.response && error.response.status === 422) {
          console.log("ISI ERROR VALIDASI:", error.response.data.errors);
          alert("Gagal simpan: Cek data inputan Anda (WA Wajib diisi).");
      } else {
          console.error("Error lain:", error);
          alert("Terjadi kesalahan server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Daftarkan UMKM Baru</h2>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <p style={styles.subtitle}>Lengkapi profil usaha Anda di bawah ini.</p>

        {/* Input Nama Usaha */}
        <InputGroup 
          label="Nama Usaha" 
          name="nama_usaha" 
          val={formData.nama_usaha} 
          onChange={handleChange} 
          placeholder="Contoh: Kopi Senja Abadi" 
        />
        
        <div style={styles.row}>
           <InputGroup 
            label="Kategori" 
            name="kategori" 
            val={formData.kategori} 
            onChange={handleChange} 
            placeholder="Cth: Kuliner"
          />
          {/* ✅ Tambahkan Input No WA Disini */}
           <InputGroup 
            label="No. WhatsApp" 
            name="no_wa" 
            type="number"
            val={formData.no_wa} 
            onChange={handleChange} 
            placeholder="0812..."
          />
        </div>

        <InputGroup 
            label="Tempat / Lokasi" 
            name="lokasi" 
            val={formData.lokasi} 
            onChange={handleChange} 
            placeholder="Alamat Lengkap"
        />

        <InputGroup 
          label="Deskripsi Usaha" 
          name="deskripsi" 
          val={formData.deskripsi} 
          onChange={handleChange} 
          isTextArea 
          placeholder="Jelaskan produk atau jasa yang Anda tawarkan..."
        />

        {/* Upload Foto */}
        <label style={styles.label}>Foto Usaha</label>
        <div style={styles.uploadBox}>   
          <input type="file" onChange={handleFotoChange} accept="image/*" style={{marginTop: '10px'}} />
          {previewFoto && (
            <div style={{marginTop: '15px'}}>
              <img src={previewFoto} alt="Preview" style={styles.previewImg} />
            </div>
          )}
        </div>

        {/* Upload Bukti */}
        <label style={styles.label}>Bukti Perizinan Usaha (NIB/SIUP)</label>
        <div style={styles.uploadBox}>
          <input type="file" onChange={handleBuktiChange} accept="image/*" style={{marginTop: '10px'}} />
          {previewBuktiPerizinan && (
            <div style={{marginTop: '15px'}}>
              <img src={previewBuktiPerizinan} alt="Preview Bukti" style={styles.previewImg} />
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} style={loading ? styles.btnLoading : styles.btnSubmit}>
          {loading ? 'Sedang Mengirim...' : 'Lanjut ke Review'}
        </button>

      </form>
    </div>
  );
}

// Reusable Component
const InputGroup = ({ label, name, val, onChange, type = "text", placeholder, isTextArea }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    {isTextArea ? (
      <textarea name={name} value={val} onChange={onChange} style={styles.textarea} placeholder={placeholder} required />
    ) : (
      <input type={type} name={name} value={val} onChange={onChange} style={styles.input} placeholder={placeholder} required />
    )}
  </div>
);

// Styles
const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Poppins, sans-serif', backgroundColor: '#fff' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  backBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666', marginRight: '10px' },
  title: { flex: 1, textAlign: 'center', margin: 0, fontSize: '18px', color: '#0D2B47', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '10px', textAlign: 'center' },
  row: { display: 'flex', gap: '15px' },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column' },
  label: { fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#444' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#F9FAFB', outline: 'none' },
  textarea: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', minHeight: '100px', backgroundColor: '#F9FAFB', outline: 'none', resize: 'vertical' },
  uploadBox: { border: '2px dashed #ccc', padding: '20px', borderRadius: '10px', textAlign: 'center', backgroundColor: '#FAFAFA' },
  previewImg: { width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #eee' },
  btnSubmit: { padding: '15px', backgroundColor: '#0D2B47', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: '0.2s' },
  btnLoading: { padding: '15px', backgroundColor: '#93C5FD', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'not-allowed', marginTop: '10px' }
};