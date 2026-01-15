// src/components/UmkmCard.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. Import Link untuk tombol Edit

// Tambahkan props onDelete dan onEdit
function UmkmCard({ umkm, onDelete, onEdit }) { 
    return (
        <div style={cardStyle}>
            {/* Bagian Gambar */}
            <div style={imageContainerStyle}>
                {umkm.poster ? (
                    <img 
                        src={umkm.poster} 
                        alt={umkm.nama_usaha} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                ) : (
                    <div style={noPosterStyle}>
                        🖼️ Tidak ada foto produk/toko
                    </div>
                )}
            </div>

            {/* Bagian Teks */}
            <div style={textContainerStyle}>
                <h3 style={titleStyle}>
                    🏪 {umkm.nama_usaha}
                </h3>
                
                <div style={detailContainerStyle}>
                    <p style={detailTextStyle}>Pemilik: **{umkm.pemilik}**</p>
                    {/* Note: Kolom 'kategori' tidak ada di database kita, saya komentari */}
                    {/* <p style={detailTextStyle}>Kategori: {umkm.kategori}</p> */}
                    <p style={detailTextStyle}>📍 Alamat: {umkm.alamat}</p>
                    <p style={detailTextStyle}>📞 WA: {umkm.no_wa}</p>
                </div>

                <hr style={dividerStyle}/>
                
                <div style={footerStyle}>
                    <small style={organizerStyle}>
                        Updated At: {new Date(umkm.updated_at).toLocaleDateString()}
                    </small>
                </div>
                
                {/* 👇 BAGIAN TOMBOL EDIT & HAPUS BARU */}
                <div style={buttonGroupStyle}>
                    {/* Tombol Edit menggunakan Link ke halaman edit */}
                    <Link to={`/edit-umkm/${umkm.id}`} style={editButtonStyle}>
                        ✏️ Edit
                    </Link>
                    
                    {/* Tombol Hapus memanggil fungsi onDelete dari Home.jsx */}
                    <button 
                        onClick={() => onDelete(umkm.id)} 
                        style={deleteButtonStyle}
                    >
                        🗑️ Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------
// STYLE DEFINITION
// ----------------------------------------------------

const cardStyle = { 
    border: '1px solid #e0e0e0', 
    borderRadius: '12px', 
    width: '280px',
    background: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
};

const imageContainerStyle = { height: '160px', width: '100%', background: '#f5f5f5' };
const noPosterStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' };
const textContainerStyle = { padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' };
const titleStyle = { margin: 0, fontSize: '18px', color: '#333' };
const detailContainerStyle = { fontSize: '14px', color: '#666' };
const detailTextStyle = { margin: '4px 0' };
const dividerStyle = { border: '0', borderTop: '1px solid #eee', width: '100%', margin: '8px 0' };
const footerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const organizerStyle = { color: '#888', fontStyle: 'italic' };

// STYLE BARU UNTUK TOMBOL
const buttonGroupStyle = {
    display: 'flex', 
    gap: '10px', 
    marginTop: '15px' 
};

const editButtonStyle = {
    flex: 1,
    padding: '8px',
    backgroundColor: '#7952b3', // Ungu (sesuai branding UMKM)
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '14px'
};

const deleteButtonStyle = {
    flex: 1,
    padding: '8px',
    backgroundColor: '#dc3545', // Merah
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
};


export default UmkmCard;