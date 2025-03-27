import React,
{
    createContext,
    useState,
    useEffect
}

    from 'react';

// Creo il contesto globale per condividere lo stato del carrello e le funzioni in tutta l'app
const GlobalContext = createContext();

// Componente che fornisce il contesto ai figli
export const GlobalProvider = ({
    children

}) => {
    // Stato del carrello inizializzato come array vuoto
    const [cart,
        setCart] = useState([]);

    // Carica il carrello dal localStorage al caricamento del componente
    useEffect(() => {

        // Recupera il carrello salvato in localStorage, se presente
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart); // Imposta lo stato del carrello con i dati recuperati
    }

        , []);

    // Funzione per aggiungere un prodotto al carrello
    const addToCart = (product) => {
        // Crea una copia dell'array cart
        const updatedCart = [...cart];

        // Trovo l'indice del prodotto nel carrello
        const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

        // Se il prodotto è già nel carrello, incrementa la quantità
        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += 1;
        }

        else {

            // Se il prodotto non è presente, aggiungilo con quantità 1
            updatedCart.push({
                ...product, quantity: 1
            });
        }

        // Aggiorna lo stato del carrello e salva nel localStorage
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

        ;

    // Funzione per rimuovere un prodotto dal carrello
    const removeFromCart = (productId) => {
        // Crea un nuovo array senza il prodotto specificato
        const updatedCart = cart.filter(item => item.id !== productId);

        // Aggiorna lo stato del carrello e salva nel localStorage
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

        ;

    // Funzione per aggiornare la quantità di un prodotto nel carrello
    const updateQuantity = (productId, newQuantity) => {
        // Se la nuova quantità è inferiore a 1, non fare nulla
        if (newQuantity < 1) return;

        // Crea un nuovo array aggiornando la quantità del prodotto
        const updatedCart = cart.map(item => item.id === productId ? {
            ...item, quantity: newQuantity
        }

            : item);

        // Aggiorna lo stato del carrello e salva nel localStorage
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

        ;

    return ( // Fornisce il contesto ai componenti figli

        <GlobalContext.Provider value={
            {
                cart, addToCart, removeFromCart, updateQuantity
            }
        }

        > {
                children
            }

        </GlobalContext.Provider>);
}

    ;

export default GlobalContext;