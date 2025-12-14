'use client';

import { useEffect, useState } from 'react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            if (data.success) {
                setSettings(data.settings);
                setMaintenanceMode(data.settings.maintenanceMode);
                setMaintenanceMessage(data.settings.maintenanceMessage);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    maintenanceMode,
                    maintenanceMessage,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Settings saved successfully!');
                setSettings(data.settings);
            } else {
                alert('Error saving settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Settings</h1>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Maintenance Mode</h2>

                <div style={{
                    padding: '1.5rem',
                    background: maintenanceMode
                        ? 'rgba(239, 68, 68, 0.1)'
                        : 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${maintenanceMode ? '#ef4444' : 'var(--accent-green)'}`,
                    marginBottom: '1.5rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>
                            {maintenanceMode ? '🔴' : '🟢'}
                        </span>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>
                                {maintenanceMode ? 'Site is in Maintenance Mode' : 'Site is Live'}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                {maintenanceMode
                                    ? 'Visitors will see the maintenance page'
                                    : 'Site is accessible to all users'}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        padding: '1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--glass-border)',
                        transition: 'all var(--transition-fast)',
                    }}>
                        <input
                            type="checkbox"
                            checked={maintenanceMode}
                            onChange={(e) => setMaintenanceMode(e.target.checked)}
                            style={{
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                            }}
                        />
                        <div>
                            <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                                Enable Maintenance Mode
                            </span>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                When enabled, all users except admins will see the maintenance page
                            </p>
                        </div>
                    </label>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                    }}>
                        Maintenance Message
                    </label>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        marginBottom: '0.75rem',
                    }}>
                        This message will be displayed to users on the maintenance page
                    </p>
                    <textarea
                        className="input textarea"
                        value={maintenanceMessage}
                        onChange={(e) => setMaintenanceMessage(e.target.value)}
                        placeholder="Enter maintenance message..."
                        rows={4}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            {/* Additional Info */}
            <div className="glass-card">
                <h2 style={{ marginBottom: '1rem' }}>Important Notes</h2>
                <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                }}>
                    <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--accent-green)', fontSize: '1.25rem' }}>✓</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            Admin panel will remain accessible even in maintenance mode
                        </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--accent-green)', fontSize: '1.25rem' }}>✓</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            API endpoints will continue to work during maintenance
                        </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--accent-green)', fontSize: '1.25rem' }}>✓</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            Users will be redirected to the maintenance page automatically
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
