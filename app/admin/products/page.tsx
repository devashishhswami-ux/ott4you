'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        platform: 'Prime Video',
        description: '',
        logo: '',
        durations: [
            { months: 1, price: 0 },
            { months: 3, price: 0 },
            { months: 6, price: 0 },
        ],
        features: [''],
        active: true,
        stock: 999,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingProduct
                ? `/api/products/${editingProduct._id}`
                : '/api/products';

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert(editingProduct ? 'Product updated!' : 'Product created!');
                setShowForm(false);
                setEditingProduct(null);
                resetForm();
                fetchProducts();
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('An error occurred');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                alert('Product deleted!');
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            platform: product.platform,
            description: product.description,
            logo: product.logo,
            durations: product.durations,
            features: product.features,
            active: product.active,
            stock: product.stock || 999,
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            platform: 'Prime Video',
            description: '',
            logo: '',
            durations: [
                { months: 1, price: 0 },
                { months: 3, price: 0 },
                { months: 6, price: 0 },
            ],
            features: [''],
            active: true,
            stock: 999,
        });
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
            }}>
                <h1>Products Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingProduct(null);
                        resetForm();
                    }}
                >
                    {showForm ? 'Cancel' : '+ Add Product'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Platform
                                </label>
                                <select
                                    className="input"
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                    required
                                >
                                    <option value="Prime Video">Prime Video</option>
                                    <option value="Spotify">Spotify</option>
                                    <option value="YouTube Premium">YouTube Premium</option>
                                    <option value="JioHotstar">JioHotstar</option>
                                    <option value="Jio Saavn">Jio Saavn</option>
                                    <option value="SonyLIV">SonyLIV</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Description
                                </label>
                                <textarea
                                    className="input textarea"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Logo URL
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
                                    Pricing Tiers
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                    {formData.durations.map((duration, index) => (
                                        <div key={index}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                                {duration.months} Month{duration.months > 1 ? 's' : ''} (₹)
                                            </label>
                                            <input
                                                type="number"
                                                className="input"
                                                value={duration.price}
                                                onChange={(e) => {
                                                    const newDurations = [...formData.durations];
                                                    newDurations[index].price = parseInt(e.target.value) || 0;
                                                    setFormData({ ...formData, durations: newDurations });
                                                }}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Features (one per line)
                                </label>
                                <textarea
                                    className="input textarea"
                                    value={formData.features.join('\n')}
                                    onChange={(e) =>
                                        setFormData({ ...formData, features: e.target.value.split('\n') })
                                    }
                                    placeholder="Enter features, one per line"
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                    min="0"
                                    placeholder="e.g., 999"
                                    required
                                />
                                <small style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>
                                    Set to 999 for unlimited-like inventory
                                </small>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    style={{ width: '20px', height: '20px' }}
                                />
                                <label htmlFor="active" style={{ fontWeight: 600 }}>
                                    Active
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <div className="spinner" />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {products.map((product) => (
                        <div key={product._id} className="glass-card">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'start',
                                gap: '2rem',
                            }}>
                                <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        position: 'relative',
                                        borderRadius: 'var(--radius-md)',
                                        overflow: 'hidden',
                                        background: 'var(--bg-tertiary)',
                                    }}>
                                        <Image
                                            src={product.logo}
                                            alt={product.platform}
                                            fill
                                            style={{ objectFit: 'contain', padding: '0.5rem' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                            {product.description}
                                        </p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {product.durations.map((duration: any, index: number) => (
                                                <span key={index} className="badge">
                                                    {duration.months}M: ₹{duration.price}
                                                </span>
                                            ))}
                                            <span className={`badge ${product.stock > 50 ? 'badge-success' : product.stock > 10 ? 'badge-warning' : 'badge-danger'}`}>
                                                📦 Stock: {product.stock}
                                            </span>
                                            <span className={`badge ${product.active ? 'badge-success' : 'badge-danger'}`}>
                                                {product.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleEdit(product)}
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(product._id)}
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
