export default function Footer() {
    return (
        <footer style={{
            marginTop: '6rem',
            padding: '3rem 0',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)',
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem',
                }}>
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }} className="text-gradient">
                            OTT4YOU
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Your one-stop destination for premium OTT subscriptions at the best prices.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</a></li>
                            <li><a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Platforms</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li style={{ color: 'var(--text-secondary)' }}>Prime Video</li>
                            <li style={{ color: 'var(--text-secondary)' }}>Spotify</li>
                            <li style={{ color: 'var(--text-secondary)' }}>YouTube Premium</li>
                            <li style={{ color: 'var(--text-secondary)' }}>JioHotstar</li>
                            <li style={{ color: 'var(--text-secondary)' }}>Jio Saavn</li>
                            <li style={{ color: 'var(--text-secondary)' }}>SonyLIV</li>
                        </ul>
                    </div>
                </div>

                <div className="divider" />

                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>&copy; {new Date().getFullYear()} OTT4YOU. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
