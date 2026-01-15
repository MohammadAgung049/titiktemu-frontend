import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaEnvelope, FaPhone, FaBuilding, FaUserTie, FaSpinner } from 'react-icons/fa';
import api from '../api'; // Pastikan path ini benar

export default function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State Form Lengkap
  const [formData, setFormData] = useState({
    nama_event: '',
    penyelenggara: '',
    lokasi: '',
    tanggal_mulai: '',
    slot_tenant: '',
    harga_tenant: '',
    email: '',
    no_telepon: '',
    deskripsi: '' // Ditambahkan biar sinkron dengan textarea
  });

  const [poster, setPoster] = useState(null);
  const [previewPoster, setPreviewPoster] = useState(null);
  
  const [buktiPerizinan, setBuktiPerizinan] = useState(null);
  const [previewBuktiPerizinan, setPreviewBuktiPerizinan] = useState(null);
  
  // Cleanup preview URL memory leak
  useEffect(() => {
    return () => {
      if (previewPoster) URL.revokeObjectURL(previewPoster);
      if (previewBuktiPerizinan) URL.revokeObjectURL(previewBuktiPerizinan);
    };
  }, [previewPoster, previewBuktiPerizinan]);

  // Handle Input Teks
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Upload Poster
  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      setPreviewPoster(URL.createObjectURL(file));
    }
  };

  // Handle Upload Bukti
  const handleBuktiChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBuktiPerizinan(file);
      setPreviewBuktiPerizinan(URL.createObjectURL(file));
    }
  };

  // Submit ke Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Wajib pakai FormData untuk kirim file
      const dataToSend = new FormData();
      
      // Append semua teks
      Object.keys(formData).forEach(key => {
        dataToSend.append(key, formData[key]);
      });

      // Append files jika ada
      if (poster) {
        dataToSend.append('poster', poster);
      }
      if (buktiPerizinan) {
        dataToSend.append('bukti_perizinan', buktiPerizinan);
      }

      // Kirim ke API (Token otomatis terkirim lewat interceptor api.js)
      await api.post('/events', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Event berhasil didaftarkan!');
      navigate('/profile'); // Redirect ke profile atau home
      
    } catch (error) {
      console.error("Error creating event:", error);
      let errMsg = "Gagal membuat event.";
      if (error.response && error.response.data) {
        // Jika error validasi dari Laravel
        errMsg = typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data);
      }
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Kembali</button>
        <h2 style={styles.title}>Daftarkan Event</h2>
        <div style={{ width: '30px' }}></div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* ROW 1: Nama Event & Penyelenggara */}
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaUserTie /> Nama Event</label>
            <input type="text" name="nama_event" value={formData.nama_event} onChange={handleChange} style={styles.input} placeholder="Contoh: Festival Kuliner" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaBuilding /> Penyelenggara</label>
            <input type="text" name="penyelenggara" value={formData.penyelenggara} onChange={handleChange} style={styles.input} placeholder="Nama EO / Organisasi" required />
          </div>
        </div>

        {/* ROW 2: Email & No Telepon */}
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaEnvelope /> Email Penanggung Jawab</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} placeholder="email@eo.com" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaPhone /> No. Telepon / WA</label>
            <input type="text" name="no_telepon" value={formData.no_telepon} onChange={handleChange} style={styles.input} placeholder="08123xxx" required />
          </div>
        </div>

        {/* ROW 3: Lokasi & Tanggal */}
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaMapMarkerAlt /> Lokasi Event</label>
            <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} style={styles.input} placeholder="Nama Gedung / Jalan" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaCalendarAlt /> Tanggal Mulai</label>
            <input type="date" name="tanggal_mulai" value={formData.tanggal_mulai} onChange={handleChange} style={styles.input} required />
          </div>
        </div>

        {/* ROW 4: Slot & Harga */}
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaUsers /> Slot Tenant</label>
            <input type="text" name="slot_tenant" value={formData.slot_tenant} onChange={handleChange} style={styles.input} placeholder="Jml Slot" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><FaMoneyBillWave /> Harga Tenant</label>
            <input type="text" name="harga_tenant" value={formData.harga_tenant} onChange={handleChange} style={styles.input} placeholder="Rp 500.000" required />
          </div>
        </div>

        {/* Deskripsi */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Deskripsi Event</label>
          <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} style={styles.textarea} placeholder="Jelaskan detail event Anda..." rows={4}></textarea>
        </div>

        {/* Upload Poster */}
        <div style={styles.inputGroup}>
            <label style={styles.label}>Poster Event</label>
            <div style={styles.uploadBox} onClick={() => document.getElementById('posterInput').click()}>
                {previewPoster ? (
                    <img src={previewPoster} alt="Preview Poster" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                ) : (
                    <>
                        <FaCloudUploadAlt size={30} color="#888" />
                        <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>Klik untuk upload Poster</p>
                    </>
                )}
                <input type="file" id="posterInput" onChange={handlePosterChange} style={{ display: 'none' }} accept="image/*" />
            </div>
        </div>

        {/* Upload Bukti Perizinan */}
        <div style={styles.inputGroup}>
            <label style={styles.label}>Bukti Perizinan / Proposal (Image)</label>
            <div style={styles.uploadBox} onClick={() => document.getElementById('buktiInput').click()}>
                {previewBuktiPerizinan ? (
                    <img src={previewBuktiPerizinan} alt="Preview Bukti" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                ) : (
                    <>
                        <FaCloudUploadAlt size={30} color="#888" />
                        <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>Klik untuk upload Bukti</p>
                    </>
                )}
                <input type="file" id="buktiInput" onChange={handleBuktiChange} style={{ display: 'none' }} accept="image/*" />
            </div>
        </div>

        <button type="submit" style={styles.btnSubmit} disabled={loading}>
          {loading ? <FaSpinner className="spin" /> : 'Daftarkan Event'}
        </button>

      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#666',
    marginRight: '10px'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    margin: 0,
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  row: {
    display: 'flex',
    gap: '15px'
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#444',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: '#F9FAFB'
  },
  textarea: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: '#F9FAFB',
    resize: 'vertical'
  },
  uploadBox: {
    border: '2px dashed #ccc',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnSubmit: {
    backgroundColor: '#0077B6',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};