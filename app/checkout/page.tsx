'use client';

import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, totalAmount, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!session) {
            router.push('/cart');
        }
    }, [session, router]);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // For now, we'll process items sequentially or just sum up.
            // Since our backend is set up for single item purchase, 
            // we will create a 'Cart Purchase' logic if possible, 
            // but for speed, let's iterate and create orders for each item 
            // OR ideally, update backend to handle bulk orders.

            // SIMPLIFICATION: We will trigger payment for the Total Amount.
            // On success, we will create multiple order records in backend.

            // First, create a Razorpay order for the total amount
            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalAmount,
                    productId: 'CART_CHECKOUT',
                    productName: `Cart Checkout (${items.length} items)`,
                    duration: 0,
                    isCart: true,
                    items: items // Send items to backend
                }),
            });

            const data = await response.json();

            if (!data.success) {
                alert('Failed to initiate payment');
                setLoading(false);
                return;
            }

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'OTT4YOU',
                description: 'Subscription Purchase',
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
                            productId: 'CART_CHECKOUT',
                            isCart: true,
                            items: items,
                            amount: totalAmount
                        }),
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.success) {
                        clearCart();
                        router.push('/dashboard');
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: session?.user?.name,
                    email: session?.user?.email,
                },
                theme: {
                    color: '#8b5cf6',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!session || items.length === 0) return null;

    return (
        <>
            <Header />
            <main className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
                <h1 className="section-title">Checkout</h1>

                <div className="glass-card">
                    <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        Order Review
                    </h3>

                    <div style={{ marginBottom: '2rem' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>{item.platform} ({item.duration}M) x {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div style={{
                            borderTop: '1px solid var(--glass-border)',
                            marginTop: '1rem',
                            paddingTop: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 'bold',
                            fontSize: '1.25rem'
                        }}>
                            <span>Total Amount</span>
                            <span>₹{totalAmount}</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4>Payment Method</h4>
                        <div style={{
                            padding: '1rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            marginTop: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ fontSize: '1.5rem' }}>🔒</div>
                            <div>
                                <div>Secured by Razorpay</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    Cards, UPI, NetBanking, Wallets
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="btn btn-primary full-width btn-lg btn-glow"
                    >
                        {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
                    </button>
                </div>
            </main>
            <Footer />
        </>
    );
}
