import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CategoryManager() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    // State untuk daftar kategori
    const [categories, setCategories] = useState([]);
    // State untuk form input (nama kategori)
    const [categoryName, setCategoryName] = useState('');
    // State untuk edit (menyimpan ID jika sedang mode edit)
    const [editingId, setEditingId] = useState(null); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- 1. FETCH SEMUA KATEGORI ---
    const fetchCategories = async () => {
        if (!token) {
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
            setError(null);
        } catch (err) {
            // Menangkap error jika server tidak merespons atau status 4xx/5xx
            const statusCode = err.response?.status;
            if (statusCode === 401) {
                // Token tidak valid, paksa logout
                localStorage.removeItem('token');
                navigate('/login');
            }
            setError(`Gagal memuat kategori. Status: ${statusCode || 'Network Error'}`);
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [token, navigate]);

    // --- 2. HANDLE SUBMIT (Tambah & Edit) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        setIsSubmitting(true);
        try {
            let response;
            const data = { nama: categoryName };

            if (editingId) {
                // Mode Edit (PUT)
                response = await axios.put(`http://localhost:8000/api/categories/${editingId}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(`Kategori ${response.data.data.nama} berhasil diperbarui!`);
            } else {
                // Mode Tambah (POST)
                response = await axios.post('http://localhost:8000/api/categories', data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(`Kategori ${response.data.data.nama} berhasil ditambahkan!`);
            }

            // Reset form
            setCategoryName('');
            setEditingId(null);
            fetchCategories(); // Muat ulang daftar
        } catch (err) {
            // Tangani error validasi (ex: nama sudah ada/unique)
            const errorMsg = err.response?.data?.message || err.response?.data?.errors?.nama?.[0] || 'Terjadi kesalahan saat menyimpan.';
            alert(`Gagal menyimpan: ${errorMsg}`);
            console.error("Submit error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- 3. HANDLE DELETE ---
    const handleDelete = async (id, nama) => {
        if (!window.confirm(`Yakin ingin menghapus kategori "${nama}"? PERHATIAN: Ini akan menghapus semua UMKM yang menggunakan kategori ini!`)) {
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Kategori "${nama}" berhasil dihapus.`);
            fetchCategories();
        } catch (err) {
            alert('Gagal menghapus kategori. Cek relasi data.');
            console.error(err);
        }
    };

    // --- 4. HANDLE EDIT CLICK ---
    const handleEditClick = (category) => {
        setEditingId(category.id);
        setCategoryName(category.nama);
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>⏳ Memuat kategori...</p>;
    if (error) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</p>;

    return (
        <div style={containerStyle}>
            <Link to="/" style={backButtonStyle}>← Kembali ke Home</Link>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>⚙️ Manajer Kategori UMKM</h2>
            
            {/* Form Tambah/Edit */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <input 
                    type="text" 
                    placeholder={editingId ? `Edit: ${categoryName}` : "Nama Kategori Baru (ex: Kuliner, Fashion)"}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={submitButtonStyle} disabled={isSubmitting}>
                    {isSubmitting ? 'Memproses...' : (editingId ? 'SIMPAN PERUBAHAN' : 'TAMBAH KATEGORI')}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setCategoryName(''); }} style={cancelButtonStyle}>
                        Batal Edit
                    </button>
                )}
            </form>

            <h3 style={{ marginTop: '40px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Daftar Kategori ({categories.length})</h3>
            
            {/* Daftar Kategori */}
            <div style={listContainerStyle}>
                {categories.length === 0 ? (
                    <p style={{textAlign: 'center', color: '#666'}}>Belum ada kategori. Silakan tambahkan satu di atas.</p>
                ) : (
                    categories.map((cat) => (
                        <div key={cat.id} style={listItemStyle}>
                            <span style={{ fontWeight: 'bold' }}>{cat.nama}</span>
                            <div style={actionsStyle}>
                                <button onClick={() => handleEditClick(cat)} style={editButtonStyle}>Edit</button>
                                <button onClick={() => handleDelete(cat.id, cat.nama)} style={deleteButtonStyle}>Hapus</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// Styling Sederhana (dapat disalin ke file CSS jika Anda menggunakannya)
const containerStyle = { maxWidth: '700px', margin: '40px auto', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const formStyle = { display: 'flex', gap: '10px', alignItems: 'center' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '5px', flexGrow: 1, boxSizing: 'border-box' };
const submitButtonStyle = { padding: '10px 15px', background: '#7952b3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const cancelButtonStyle = { padding: '10px 15px', background: '#ccc', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const backButtonStyle = { display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#666' };
const listContainerStyle = { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' };
const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #eee', borderRadius: '5px', background: '#f9f9f9' };
const actionsStyle = { display: 'flex', gap: '5px' };
const editButtonStyle = { padding: '5px 10px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '3px', cursor: 'pointer' };
const deleteButtonStyle = { padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' };

export default CategoryManager;