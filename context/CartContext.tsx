'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string; // unique cart item id (productId + duration)
    productId: string;
    productName: string;
    platform: string;
    logo: string;
    duration: number;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    itemCount: number;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('ott4you_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('ott4you_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>, quantity: number = 1) => {
        setItems(prev => {
            const id = `${newItem.productId}-${newItem.duration}`;
            const existingItem = prev.find(item => item.id === id);

            if (existingItem) {
                // Return new array with updated quantity
                return prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: Math.min(item.quantity + quantity, 5) }
                        : item
                );
            }

            // Add new item with specified quantity (max 5)
            return [...prev, { ...newItem, id, quantity: Math.min(quantity, 5) }];
        });
        alert(`Added ${quantity} item(s) to cart!`);
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1 || quantity > 5) return;

        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            itemCount,
            totalAmount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
