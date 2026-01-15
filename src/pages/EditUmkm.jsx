import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditUmkm() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // State data UMKM lama
    const [namaUsaha, setNamaUsaha] = useState('');
    const [pemilik, setPemilik] = useState('');
    const [kategori, setKategori] = useState('');
    const [alamat, setAlamat] = useState('');
    const [noWa, setNoWa] = useState('');
    const [poster, setPoster] = useState(null);
    const [existingPoster, setExistingPoster] = useState(''); 
    
    // State baru untuk Kategori
    const [categories, setCategories] = useState([]); // Daftar kategori
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // ID kategori yang dipilih

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- FETCH DATA UMKM & KATEGORI ---
    useEffect(() => {
        const fetchAllData = async () => {
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                // Fetch 1: Kategori
                const resCat = await axios.get('http://localhost:8000/api/categories', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(resCat.data);

                // Fetch 2: UMKM Detail
                const resUmkm = await axios.get(`http://localhost:8000/api/umkms/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const data = resUmkm.data;
                
                // Isi State dengan data lama
                setNamaUsaha(data.nama_usaha);
                setPemilik(data.pemilik);
                setKategori(data.kategori);
                setAlamat(data.alamat);
                setNoWa(data.no_wa);
                setExistingPoster(data.poster); 

                // PENTING: Set ID Kategori lama sebagai nilai default dropdown
                setSelectedCategoryId(data.category_id); 

            } catch (err) {
                setError("Gagal mengambil data UMKM atau Kategori. Pastikan ID benar.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id, token, navigate]);

    // LOGIKA SUBMIT (MENGGUNAKAN PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('nama_usaha', namaUsaha);
        formData.append('pemilik', pemilik);
        formData.append('kategori', kategori);
        formData.append('alamat', alamat);
        formData.append('no_wa', noWa);
        
        // PENTING: Kirim category_id baru
        formData.append('category_id', selectedCategoryId); 

        if (poster) {
            formData.append('poster', poster); // File baru
        }
        
        formData.append('_method', 'PUT'); 

        try {
            await axios.post(`http://localhost:8000/api/umkms/${id}`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('UMKM Berhasil Diperbarui!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Gagal memperbarui UMKM. Cek validasi atau controller.');
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
    
    // Pastikan ada kategori yang bisa dipilih
    if (categories.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>⚠️ Tidak ada Kategori tersedia. </p>
                <Link to="/manage-categories">Kelola Kategori</Link>
            </div>
        );
    }


    // Bagian Tampilan (return)
    return (
        <div style={containerStyle}>
            <Link to="/" style={backButtonStyle}>← Kembali</Link>
            <h2 style={{textAlign: 'center', marginBottom: '30px'}}>✏️ Edit UMKM: {namaUsaha}</h2>
            
            <form onSubmit={handleSubmit} style={formStyle}>
                
                {/* Input Nama Usaha, Pemilik, Alamat, No WA (sama seperti sebelumnya) */}
                <input type="text" placeholder="Nama Usaha" value={namaUsaha} onChange={(e) => setNamaUsaha(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="Nama Pemilik" value={pemilik} onChange={(e) => setPemilik(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="Kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="Alamat Lengkap" value={alamat} onChange={(e) => setAlamat(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="Nomor WhatsApp" value={noWa} onChange={(e) => setNoWa(e.target.value)} style={inputStyle} required />
                
                {/* <--- DROPDOWN KATEGORI BARU ---> */}
                <select 
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    style={inputStyle}
                    required
                >
                    {/* Map daftar kategori ke option */}
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nama}
                        </option>
                    ))}
                </select>
                {/* <------------------------------> */}

                {/* Input Poster & Display existingPoster (sama seperti sebelumnya) */}
                <div style={posterContainerStyle}>
                    <label style={{fontWeight: 'bold'}}>Foto Produk/Toko (Ganti):</label>
                    <input type="file" onChange={(e) => setPoster(e.target.files[0])} accept="image/*" />
                    {existingPoster && (
                        <div style={{marginTop: '10px'}}>
                            <p style={{margin: '5px 0'}}>Foto Lama:</p>
                            <img src={existingPoster} alt="Foto Lama" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ccc'}} />
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ ...submitButtonStyle, background: loading ? '#ccc' : '#7952b3' }}
                >
                    {loading ? '⏳ Memperbarui...' : 'SIMPAN PERUBAHAN'}
                </button>
            </form>
        </div>
    );
}

// ... (Styling dipertahankan sama)
// ...

export default EditUmkm;