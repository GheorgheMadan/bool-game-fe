import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);

        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(savedProducts);
    }, []);

    // Funzione per aggiornare lo stock nel database
    const updateProductStock = async (productId, quantityChange) => {
        try {
            const response = await axios.post(`/api/products/${productId}/updateStock`, {
                quantityChange
            });

            if (response.data.success) {
                const updatedProduct = response.data.product;
                return updatedProduct;
            } else {
                alert('Errore nell\'aggiornamento dello stock');
                return null;
            }
        } catch (error) {
            console.error('Errore nella chiamata API:', error);
            return null;
        }
    };

    const addToCart = async (product) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

        if (product.stock <= 0) {
            alert('Prodotto esaurito!');
            return;
        }

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        // Aggiorna lo stock nel database
        const updatedProduct = await updateProductStock(product.id, -1);
        if (updatedProduct) {
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            localStorage.setItem('products', JSON.stringify(products));
        }
    };

    const removeFromCart = async (productId) => {
        const productToRemove = cart.find(item => item.id === productId);
        if (!productToRemove) return;

        const updatedCart = cart.filter(item => item.id !== productId);

        // Ripristina lo stock nel database
        const updatedProduct = await updateProductStock(productId, productToRemove.quantity);
        if (updatedProduct) {
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            localStorage.setItem('products', JSON.stringify(products));
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const productToUpdate = cart.find(item => item.id === productId);
        if (!productToUpdate) return;

        const quantityDifference = newQuantity - productToUpdate.quantity;

        // Aggiusta lo stock nel database
        const updatedProduct = await updateProductStock(productId, -quantityDifference);
        if (updatedProduct) {
            const updatedCart = cart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );

            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            localStorage.setItem('products', JSON.stringify(products));
        }
    };

    return (
        <GlobalContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
