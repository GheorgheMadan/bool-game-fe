import React, { createContext, useContext } from 'react';
import { useCart } from './CartContext';

// Crea il contesto del checkout
const CheckoutContext = createContext();

// Componente provider che avvolge l'app per fornire le funzionalità di checkout
export const CheckoutProvider = ({ children }) => {
    // Ottiengo la funzione setCart dal contesto del carrello
    const { setCart } = useCart();

    // Se setCart non è disponibile, significa che CartProvider non avvolge correttamente l'app
    if (!setCart) {
        console.error("❌ Errore: setCart non è disponibile nel contesto! Controlla che CartProvider avvolga l'app correttamente.");
        // Previene il crash dell'app
        return null;
    }


    // Funzione per svuotare il carrello dopo un pagamento riuscito
    const clearCartAfterPayment = () => {
        setCart([]); // Svuota il carrello
        localStorage.removeItem('cart'); // Rimuovi il carrello dal localStorage
        console.log("✅ Carrello svuotato dopo il pagamento.");
    };

    return (
        <CheckoutContext.Provider value={{ clearCartAfterPayment }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext);
