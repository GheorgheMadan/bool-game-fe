import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Creiamo il contesto del carrello
const CartContext = createContext();

// Componente che avvolge l'intera app per fornire il carrello
export const CartProvider = ({ children }) => {

    // Stato per memorizzare i prodotti nel carrello
    const [cart, setCart] = useState([]);

    // Stato per indicare se il carrello è stato inizializzato dal localStorage
    const [isCartInitialized, setIsCartInitialized] = useState(false);

    // Stato per gestire eventuali errori relativi a prodotti specifici (es. stock esaurito)
    const [errorMessages, setErrorMessages] = useState({});

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

    // Recupera il carrello dal localStorage al caricamento della pagina
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setIsCartInitialized(true);
    }, []);

    // Salva il carrello nel localStorage ogni volta che viene aggiornato
    useEffect(() => {
        if (isCartInitialized) {
            if (cart.length > 0) {
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                localStorage.removeItem('cart');
            }
        }
    }, [cart, isCartInitialized]);

    // Funzione per aggiungere un prodotto al carrello
    const addToCart = async (product) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/products/${product.id}`);
            const availableStock = response.data.stock;
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                // Calcola lo stock totale disponibile (incluso quello già nel carrello)
                const totalAvailableStock = availableStock + existingProduct.quantity;
                if (existingProduct.quantity < totalAvailableStock) {
                    // Aumenta la quantità del prodotto nel carrello
                    setCart((prevCart) =>
                        prevCart.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    );
                    await updateStockInDB(product.id, -1);  // Riduce lo stock nel database
                    setErrorMessages(prev => ({ ...prev, [product.id]: null })); // Resetta errore per il prodotto
                } else {
                    setErrorMessages(prev => ({ ...prev, [product.id]: "Quantità massima raggiunta." }));
                }
            } else {
                if (availableStock > 0) {
                    // Aggiunge il prodotto al carrello con quantità iniziale 1
                    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
                    await updateStockInDB(product.id, -1);  // Riduce lo stock nel database
                    setErrorMessages(prev => ({ ...prev, [product.id]: null }));
                } else {
                    setErrorMessages(prev => ({ ...prev, [product.id]: "❌ Stock esaurito." }));
                }
            }
        } catch (error) {
            console.error("Errore durante il recupero dello stock:", error);
        }
    };

    // Funzione per aumentare la quantità di un prodotto nel carrello
    const increaseQuantity = async (productId) => {
        try {
            // Recupera lo stock aggiornato del prodotto
            const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
            const availableStock = response.data.stock;

            const productInCart = cart.find(item => item.id === productId);
            const totalAvailableStock = availableStock + productInCart.quantity;

            if (productInCart.quantity < totalAvailableStock) {
                // Aumenta la quantità nel carrello
                setCart((prevCart) =>
                    prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
                await updateStockInDB(productId, -1);   // Riduce lo stock nel database
                setErrorMessages(prev => ({ ...prev, [productId]: null })); // Rimuove l'errore per questo prodotto
            } else {
                setErrorMessages(prev => ({ ...prev, [productId]: "Quantità massima raggiunta." }));
            }
        } catch (error) {
            console.error("Errore durante il recupero dello stock:", error);
        }
    };

    // Funzione per ridurre la quantità di un prodotto nel carrello
    const decreaseQuantity = async (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

        // Trova il prodotto nel carrello per aggiornare lo stock
        const product = cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
            await updateStockInDB(productId, 1);  // Aumenta lo stock nel database
        }

        setErrorMessages(prev => ({ ...prev, [productId]: null })); // Rimuove l'errore per il prodotto
    };

    // Funzione per rimuovere un singolo prodotto dal carrello
    const clearCart = async (productId) => {
        // Trova il prodotto da rimuovere
        const productToRemove = cart.find(product => product.id === productId);

        if (productToRemove) {
            await updateStockInDB(productId, productToRemove.quantity);  // Ripristina lo stock
            setCart(cart.filter(product => product.id !== productId));  // Rimuove il prodotto dal carrello
            setErrorMessages(prev => ({ ...prev, [productId]: null })); // Rimuove eventuali errori associati
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity, clearCart, errorMessages }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizzato per utilizzare il contesto del carrello
export const useCart = () => useContext(CartContext);
