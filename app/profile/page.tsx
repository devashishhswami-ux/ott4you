'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/');
        }
        if (session) {
            fetchProfile();
        }
    }, [session, status]);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/user/profile');
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                setFormData({
                    name: data.user.name || '',
                    image: data.user.image || '',
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <>
                <Header />
                <main className="container section" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner" />
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container section">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <p>Manage your account settings</p>
                    </div>

                    <div className="profile-content">
                        {/* Profile Picture Section */}
                        <div className="profile-picture-section">
                            <div className="profile-picture-wrapper">
                                {formData.image ? (
                                    <Image
                                        src={formData.image}
                                        alt={formData.name || 'Profile'}
                                        width={150}
                                        height={150}
                                        className="profile-picture"
                                    />
                                ) : (
                                    <div className="profile-picture-placeholder">
                                        {formData.name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                )}
                            </div>
                            <div className="profile-picture-info">
                                <h3>{user?.name}</h3>
                                <p>{user?.email}</p>
                                <span className={`badge ${user?.role === 'admin' ? 'badge-warning' : 'badge-success'}`}>
                                    {user?.role === 'admin' ? 'Admin' : 'Member'}
                                </span>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input"
                                    value={user?.email || ''}
                                    disabled
                                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                />
                                <span className="form-hint">Email cannot be changed</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Display Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Profile Picture URL</label>
                                <input
                                    type="url"
                                    id="image"
                                    className="input"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/your-image.jpg"
                                />
                                <span className="form-hint">Enter a URL to your profile picture</span>
                            </div>

                            {message.text && (
                                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>

                        {/* Account Info */}
                        <div className="account-info">
                            <h3>Account Information</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Member Since</span>
                                    <span className="info-value">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }) : 'N/A'}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Account Type</span>
                                    <span className="info-value">{user?.role === 'admin' ? 'Administrator' : 'Standard User'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Authentication</span>
                                    <span className="info-value">Google Sign-In</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
