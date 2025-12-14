'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
    // Platform data for showcase
    const platforms = [
        { name: 'Prime Video', emoji: '🎬', color: '#00A8E1' },
        { name: 'Spotify', emoji: '🎵', color: '#1DB954' },
        { name: 'YouTube Premium', emoji: '📺', color: '#FF0000' },
        { name: 'JioHotstar', emoji: '⭐', color: '#0F79AF' },
        { name: 'Jio Saavn', emoji: '🎧', color: '#2BC5B4' },
        { name: 'SonyLIV', emoji: '🎥', color: '#E50914' },
    ];

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="container">
                        <div className="hero-content">
                            <h1 className="hero-title animate-fade-in">
                                Get Premium <span className="text-gradient">OTT Subscriptions</span> at Unbeatable Prices
                            </h1>
                            <p className="hero-subtitle animate-fade-in">
                                Access your favorite streaming platforms – Netflix, Prime Video, Spotify, YouTube Premium and more at prices you won't find anywhere else!
                            </p>
                            <div className="hero-buttons animate-fade-in">
                                <Link href="/products" className="btn btn-primary btn-lg btn-glow">
                                    Browse Subscriptions
                                </Link>
                                <Link href="/dashboard" className="btn btn-secondary btn-lg">
                                    View My Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platforms Showcase */}
                <section className="platforms-section">
                    <div className="container">
                        <h2 className="section-title">Available Platforms</h2>
                        <p className="section-subtitle">Choose from our wide range of premium streaming services</p>
                        <div className="platforms-grid">
                            {platforms.map((platform, index) => (
                                <Link href="/products" key={index} className="platform-card">
                                    <span className="platform-emoji">{platform.emoji}</span>
                                    <span className="platform-name">{platform.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="container">
                        <h2 className="section-title">Why Choose OTT4YOU?</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">💰</div>
                                <h3>Best Prices</h3>
                                <p>Get premium subscriptions at the most competitive prices in the market.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🔒</div>
                                <h3>Secure Payments</h3>
                                <p>All transactions are secured with Razorpay's advanced encryption.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <h3>Instant Activation</h3>
                                <p>Your subscription gets activated immediately after successful payment.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🎧</div>
                                <h3>24/7 Support</h3>
                                <p>Our support team is always ready to help you with any issues.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-card">
                            <h2>Ready to Start Streaming?</h2>
                            <p>Browse our collection and find the perfect subscription for you!</p>
                            <Link href="/products" className="btn btn-primary btn-lg btn-glow">
                                View All Products
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
