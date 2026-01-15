import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditEvent() {
    // 1. Ambil ID dari URL
    const { id } = useParams(); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // State untuk data Event
    const [namaEvent, setNamaEvent] = useState('');
    const [penyelenggara, setPenyelenggara] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [slotTenant, setSlotTenant] = useState('');
    const [poster, setPoster] = useState(null);
    const [existingPoster, setExistingPoster] = useState(''); // Untuk menampilkan gambar lama

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. FETCH DATA LAMA BERDASARKAN ID
    useEffect(() => {
        const fetchEvent = async () => {
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                // Endpoint untuk mengambil satu data event (kita anggap sudah ada di Laravel)
                const response = await axios.get(`http://localhost:8000/api/events/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const data = response.data;
                
                // Isi State dengan data lama
                setNamaEvent(data.nama_event);
                setPenyelenggara(data.penyelenggara);
                setLokasi(data.lokasi);
                setTanggalMulai(data.tanggal_mulai);
                setTanggalSelesai(data.tanggal_selesai);
                setSlotTenant(data.slot_tenant);
                setExistingPoster(data.poster); // Simpan URL poster lama

            } catch (err) {
                setError("Gagal mengambil data event. Pastikan ID benar.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, token, navigate]);

    // 3. LOGIKA SUBMIT (GANTI DARI POST JADI PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Data yang akan dikirim (tetap pakai FormData karena mungkin ada file)
        const formData = new FormData();
        formData.append('nama_event', namaEvent);
        formData.append('penyelenggara', penyelenggara);
        formData.append('lokasi', lokasi);
        formData.append('tanggal_mulai', tanggalMulai);
        formData.append('tanggal_selesai', tanggalSelesai);
        formData.append('slot_tenant', slotTenant);
        
        if (poster) {
            formData.append('poster', poster); // File baru
        }
        
        // PENTING: Laravel PUT/PATCH tidak bisa membaca FormData dengan file
        // Kita harus menambahkan _method: 'PUT' secara eksplisit
        formData.append('_method', 'PUT'); 

        try {
            await axios.post(`http://localhost:8000/api/events/${id}`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Event Berhasil Diperbarui!');
            navigate('/'); // Kembali ke Home
        } catch (error) {
            console.error(error);
            alert('Gagal memperbarui Event.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p style={{textAlign: 'center', marginTop: '50px'}}>⏳ Loading Form Data...</p>;
    }
    
    if (error) {
        return <p style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>{error}</p>;
    }

    // 4. Tampilan Form
    return (
        <div style={containerStyle}>
            <Link to="/" style={backButtonStyle}>← Kembali</Link>
            <h2 style={{textAlign: 'center', marginBottom: '30px'}}>✏️ Edit Event: {namaEvent}</h2>
            
            <form onSubmit={handleSubmit} style={formStyle}>
                
                {/* ... Input Nama Event ... */}
                <input 
                    type="text" 
                    placeholder="Nama Event" 
                    value={namaEvent}
                    onChange={(e) => setNamaEvent(e.target.value)}
                    style={inputStyle}
                    required
                />
                
                {/* ... Input Penyelenggara ... */}
                <input 
                    type="text" 
                    placeholder="Penyelenggara" 
                    value={penyelenggara}
                    onChange={(e) => setPenyelenggara(e.target.value)}
                    style={inputStyle}
                    required
                />
                
                {/* ... Input Lokasi ... */}
                <input 
                    type="text" 
                    placeholder="Lokasi" 
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    style={inputStyle}
                    required
                />
                
                {/* ... Input Tanggal Mulai & Selesai ... */}
                <div style={groupStyle}>
                    <input 
                        type="date" 
                        value={tanggalMulai}
                        onChange={(e) => setTanggalMulai(e.target.value)}
                        style={inputStyle}
                        required
                    />
                     <input 
                        type="date" 
                        value={tanggalSelesai}
                        onChange={(e) => setTanggalSelesai(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                
                {/* ... Input Slot Tenant ... */}
                <input 
                    type="number" 
                    placeholder="Slot Tenant" 
                    value={slotTenant}
                    onChange={(e) => setSlotTenant(e.target.value)}
                    style={inputStyle}
                    required
                />
                
                {/* Input Poster */}
                <div style={posterContainerStyle}>
                    <label style={{fontWeight: 'bold'}}>Poster (Ganti):</label>
                    <input type="file" onChange={(e) => setPoster(e.target.files[0])} accept="image/*" />
                    {existingPoster && (
                        <div style={{marginTop: '10px'}}>
                            <p style={{margin: '5px 0'}}>Poster Lama:</p>
                            <img src={existingPoster} alt="Poster Lama" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ccc'}} />
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        padding: '12px', 
                        background: loading ? '#ccc' : '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: loading ? 'not-allowed' : 'pointer', 
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginTop: '20px'
                    }}
                >
                    {loading ? '⏳ Memperbarui...' : 'SIMPAN PERUBAHAN'}
                </button>
            </form>
        </div>
    );
}

// ... Styling ... (Ambil dari AddEvent.jsx dan sesuaikan jika perlu)
const containerStyle = { 
    maxWidth: '600px', 
    margin: '40px auto', 
    padding: '30px', 
    background: 'white', 
    borderRadius: '10px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
};
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', boxSizing: 'border-box' };
const groupStyle = { display: 'flex', gap: '10px' };
const posterContainerStyle = { border: '1px dashed #ccc', padding: '15px', borderRadius: '5px' };
const backButtonStyle = { display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#666' };

export default EditEvent;