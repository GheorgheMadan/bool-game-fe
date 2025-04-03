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
        // Previene il crash dell'app restituendo null (evita di renderizzare il provider)
        return null;
    }


    // Funzione per svuotare il carrello dopo un pagamento riuscito
    const clearCartAfterPayment = () => {
        setCart([]); // Svuota il carrello impostandolo come array vuoto
        localStorage.removeItem('cart'); // Rimuovi il carrello dal localStorage
        console.log("✅ Carrello svuotato dopo il pagamento.");
    };

    return (
        // Fornisce la funzione di svuotamento del carrello a tutti i componenti figli
        <CheckoutContext.Provider value={{ clearCartAfterPayment }}>
            {children}
        </CheckoutContext.Provider>
    );
};

// Hook personalizzato per utilizzare il contesto del checkout
export const useCheckout = () => useContext(CheckoutContext);
