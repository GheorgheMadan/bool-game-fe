import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Creiamo il contesto del carrello
const CartContext = createContext();

// Componente che avvolge l'intera app per fornire il carrello
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartInitialized, setIsCartInitialized] = useState(false);
    const [errorMessages, setErrorMessages] = useState({}); // Stato per errori specifici per ogni prodotto

    // Funzione per aggiornare lo stock nel database
    const updateStockInDB = async (productId, quantityChange) => {
        try {
            await axios.post('http://localhost:3000/api/stock/adjust', {
                productId,
                quantityChange,
            });
        } catch (error) {
            console.error("Errore nell'aggiornamento dello stock:", error);
        }
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setIsCartInitialized(true);
    }, []);

    useEffect(() => {
        if (isCartInitialized) {
            if (cart.length > 0) {
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                localStorage.removeItem('cart');
            }
        }
    }, [cart, isCartInitialized]);

    // Aggiungi prodotto al carrello
    const addToCart = async (product) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/products/${product.id}`);
            const availableStock = response.data.stock;
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                const totalAvailableStock = availableStock + existingProduct.quantity;
                if (existingProduct.quantity < totalAvailableStock) {
                    setCart((prevCart) =>
                        prevCart.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    );
                    await updateStockInDB(product.id, -1);
                    setErrorMessages(prev => ({ ...prev, [product.id]: null })); // Resetta errore per il prodotto
                } else {
                    setErrorMessages(prev => ({ ...prev, [product.id]: "Quantità massima raggiunta." }));
                }
            } else {
                if (availableStock > 0) {
                    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
                    await updateStockInDB(product.id, -1);
                    setErrorMessages(prev => ({ ...prev, [product.id]: null }));
                } else {
                    setErrorMessages(prev => ({ ...prev, [product.id]: "❌ Stock esaurito." }));
                }
            }
        } catch (error) {
            console.error("Errore durante il recupero dello stock:", error);
        }
    };

    // Aumenta la quantità di un prodotto nel carrello
    const increaseQuantity = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
            const availableStock = response.data.stock;

            const productInCart = cart.find(item => item.id === productId);
            const totalAvailableStock = availableStock + productInCart.quantity;

            if (productInCart.quantity < totalAvailableStock) {
                setCart((prevCart) =>
                    prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
                await updateStockInDB(productId, -1);
                setErrorMessages(prev => ({ ...prev, [productId]: null })); // Rimuove l'errore per questo prodotto
            } else {
                setErrorMessages(prev => ({ ...prev, [productId]: "Quantità massima raggiunta." }));
            }
        } catch (error) {
            console.error("Errore durante il recupero dello stock:", error);
        }
    };

    // Riduci la quantità di un prodotto nel carrello
    const decreaseQuantity = async (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

        const product = cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
            await updateStockInDB(productId, 1);
        }

        setErrorMessages(prev => ({ ...prev, [productId]: null })); // Rimuove l'errore per questo prodotto
    };

    // Funzione per rimuovere un singolo prodotto dal carrello
    const clearCart = async (productId) => {
        const productToRemove = cart.find(product => product.id === productId);

        if (productToRemove) {
            await updateStockInDB(productId, productToRemove.quantity);
            setCart(cart.filter(product => product.id !== productId));
            setErrorMessages(prev => ({ ...prev, [productId]: null })); // Rimuove l'errore per il prodotto rimosso
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity, clearCart, errorMessages }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook per utilizzare il contesto
export const useCart = () => useContext(CartContext);
