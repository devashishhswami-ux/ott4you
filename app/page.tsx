export const dynamic = 'force-dynamic';

'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IProduct } from '@/models/Product';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function HomePage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handlePurchase = async (productId: string, duration: number, price: number) => {
        try {
            const product = products.find((p) => p._id === productId);
            if (!product) return;

            // Create Razorpay order
            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: price,
                    productId,
                    productName: product.name,
                    duration,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                alert('Failed to create payment order. Please try again.');
                return;
            }

            // Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: data.keyId,
                    amount: data.amount,
                    currency: data.currency,
                    name: 'OTT4YOU',
                    description: `${product.platform} - ${duration} Month Subscription`,
                    order_id: data.orderId,
                    handler: async function (response: any) {
                        // Verify payment
                        const verifyResponse = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                productId,
                                productName: product.name,
                                platform: product.platform,
                                duration,
                                amount: price,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            alert('Payment successful! Check your dashboard for details.');
                            window.location.href = '/dashboard';
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    },
                    prefill: {
                        name: '',
                        email: '',
                    },
                    theme: {
                        color: '#8b5cf6',
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            };
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                    padding: '6rem 0',
                    textAlign: 'center',
                }}>
                    <div className="container">
                        <h1 style={{ marginBottom: '1.5rem' }} className="animate-fade-in">
                            Welcome to OTT4YOU
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '700px',
                            margin: '0 auto 2rem',
                        }} className="animate-fade-in">
                            Get premium subscriptions for your favorite streaming platforms at unbeatable prices.
                            Netflix, Prime Video, Spotify, and more!
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="animate-fade-in">
                            <a href="#products" className="btn btn-primary">
                                Browse Subscriptions
                            </a>
                            <a href="/dashboard" className="btn btn-secondary">
                                View Dashboard
                            </a>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="section" style={{ padding: '4rem 0' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Available Subscriptions</h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                                Choose from our wide range of premium OTT platforms
                            </p>
                        </div>

                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                                <div className="spinner" />
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-3">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onPurchase={handlePurchase}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                                    No products available at the moment.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section style={{
                    background: 'var(--glass-bg)',
                    padding: '4rem 0',
                }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2>Why Choose OTT4YOU?</h2>
                        </div>
                        <div className="grid grid-3">
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                }}>💰</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Best Prices</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Get premium subscriptions at the most competitive prices in the market.
                                </p>
                            </div>
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                }}>🔒</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Secure Payments</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    All transactions are secured with Razorpay's advanced encryption.
                                </p>
                            </div>
                            <div className="glass-card" style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                }}>⚡</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Instant Activation</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Your subscription gets activated immediately after successful payment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
