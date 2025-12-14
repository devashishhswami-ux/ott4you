import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export default async function MaintenancePage() {
    await connectDB();
    const settings = await Settings.findOne();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <div style={{
                maxWidth: '600px',
                textAlign: 'center',
            }}>
                <div style={{
                    fontSize: '6rem',
                    marginBottom: '2rem',
                }}>
                    🔧
                </div>
                <h1 style={{ marginBottom: '1.5rem', fontSize: '3rem' }}>
                    Under Maintenance
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                }}>
                    {settings?.maintenanceMessage || 'We are currently performing maintenance. Please check back soon!'}
                </p>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Thank you for your patience. We'll be back online shortly!
                    </p>
                </div>
            </div>
        </div>
    );
}
