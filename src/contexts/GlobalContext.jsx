import React, { createContext, useState, useEffect } from 'react';
import { aggiornaQuantitaProdotto, ripristinaStockProdotto } from '../productService'; // Funzioni per interagire con il backend

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const aggiornaTotale = () => {
        // Calcola il totale del carrello
        return cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    };

    const addToCart = async (product) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += 1; // Aumenta la quantità del prodotto esistente
            // Chiamata API per aggiornare lo stock sul backend
            const success = await aggiornaQuantitaProdotto(product.id, updatedCart[existingProductIndex].quantity);
            if (!success) {
                console.error('Errore nell\'aggiornamento del prodotto nel database');
                return;
            }
        } else {
            updatedCart.push({ ...product, quantity: 1 });
            // Chiamata API per ridurre lo stock nel database
            const success = await aggiornaQuantitaProdotto(product.id, 1);
            if (!success) {
                console.error('Errore nell\'aggiunta del prodotto nel database');
                return;
            }
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Aggiorna il carrello in localStorage
    };

    const removeFromCart = async (productId) => {
        const productToRemove = cart.find(product => product.id === productId);
        if (productToRemove) {
            // Ripristina lo stock nel database quando il prodotto viene rimosso
            const success = await ripristinaStockProdotto(productToRemove.id, productToRemove.quantity);
            if (!success) {
                console.error('Errore nel ripristino dello stock');
                return;
            }

            // Rimuove il prodotto dal carrello
            const updatedCart = cart.filter(product => product.id !== productId);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        const productToUpdate = cart.find(product => product.id === productId);
        if (!productToUpdate) return;

        const currentQuantity = productToUpdate.quantity;
        if (newQuantity > currentQuantity) {
            // Se la quantità aumenta, diminuisce lo stock nel database
            const success = await aggiornaQuantitaProdotto(productId, newQuantity);
            if (!success) {
                console.error('Errore nell\'aggiornamento della quantità nel database');
                return;
            }
        } else if (newQuantity < currentQuantity) {
            // Se la quantità diminuisce, ripristina lo stock nel database
            const success = await ripristinaStockProdotto(productId, currentQuantity - newQuantity);
            if (!success) {
                console.error('Errore nel ripristino dello stock nel database');
                return;
            }
        }

        const updatedCart = cart.map(product =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Aggiorna il carrello in localStorage
    };

    return (
        <GlobalContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, aggiornaTotale }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;



// import React, { createContext, useState, useEffect }

//     from 'react';

// // Creo il contesto globale per condividere lo stato del carrello e le funzioni in tutta l'app
// const GlobalContext = createContext();

// // Componente che fornisce il contesto ai figli
// export const GlobalProvider = ({ children }) => {

//     // Stato del carrello inizializzato come array vuoto
//     const [cart, setCart] = useState([]);

//     // Carica il carrello dal localStorage al caricamento del componente
//     useEffect(() => {

//         // Recupera il carrello salvato in localStorage, se presente
//         const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//         setCart(savedCart); // Imposta lo stato del carrello con i dati recuperati
//     }

//         , []);

//     // Funzione per aggiungere un prodotto al carrello
//     const addToCart = (product) => {
//         // Crea una copia dell'array cart
//         const updatedCart = [...cart];

//         // Trovo l'indice del prodotto nel carrello
//         const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

//         // Se il prodotto è già nel carrello, incrementa la quantità
//         if (existingProductIndex !== -1) {
//             updatedCart[existingProductIndex].quantity += 1;
//         }
//         else {

//             // Se il prodotto non è presente, aggiungilo con quantità 1
//             updatedCart.push({
//                 ...product, quantity: 1
//             });
//         }

//         // Aggiorna lo stato del carrello e salva nel localStorage
//         setCart(updatedCart);
//         localStorage.setItem('cart', JSON.stringify(updatedCart));
//     }

//         ;

//     // Funzione per rimuovere un prodotto dal carrello
//     const removeFromCart = (productId) => {
//         // Rimuove il prodotto con l'ID specificato dal carrello
//         setCart(cart.filter(product => product.id !== productId));
//     };
//     ;

//     // Funzione per aggiornare la quantità di un prodotto nel carrello
//     const updateQuantity = (productId, newQuantity) => {
//         setCart(cart.map(product =>
//             product.id === productId
//                 ? { ...product, quantity: newQuantity }
//                 : product
//         ));
//     };
//     return ( // Fornisce il contesto ai componenti figli

//         <GlobalContext.Provider value={
//             { cart, addToCart, removeFromCart, updateQuantity }
//         }

//         > {children}
//         </GlobalContext.Provider>);
// };

// export default GlobalContext;