import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Creiamo il contesto del carrello
const CartContext = createContext();

// Componente che avvolge l'intera app per fornire il carrello
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Funzione centrale per aggiornare lo stock nel database
    const updateStockInDB = async (productId, quantityChange) => {
        try {
            await axios.post('http://localhost:3000/api/stock/adjust', {
                productId,
                quantityChange,
            });
        } catch (error) {
            console.error('Errore nell\'aggiornamento dello stock:', error);
        }
    };

    // Aggiungi prodotto al carrello
    const addToCart = async (product) => {

        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            // Se il prodotto esiste già, aumenta la quantità
            setCart((prevCart) =>
                prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            // Aggiorna lo stock nel database
            await updateStockInDB(product.id, -1); // decremento dello stock
        } else {
            // Altrimenti aggiungi il prodotto al carrello
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
            // Aggiorna lo stock nel database
            await updateStockInDB(product.id, -1); // decremento dello stock
        }
    };

    // Aumenta la quantità di un prodotto nel carrello
    const increaseQuantity = async (productId) => {
        try {
            // Recupera lo stock disponibile dal database
            const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
            const productStock = response.data.stock;

            // Trova il prodotto nel carrello
            const productInCart = cart.find(item => item.id === productId);

            // Verifica se è possibile aumentare la quantità
            if (productInCart.quantity < productStock) {
                // Aumenta la quantità nel carrello
                setCart((prevCart) =>
                    prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
                // Aggiorna lo stock nel database (decrementa)
                await updateStockInDB(productId, -1);
            } else {
                console.log("❌ Impossibile aggiungere altro prodotto: quantità massima raggiunta.");
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
        // Solo se la quantità è maggiore di 1, aggiorna lo stock
        const product = cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
            await updateStockInDB(productId, 1); // incremento dello stock
        }
    };

    // Rimuovi un prodotto dal carrello
    const removeFromCart = async (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
        await updateStockInDB(productId, 1); // incremento dello stock
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook per utilizzare il contesto
export const useCart = () => useContext(CartContext);
