import axios from 'axios';

export const aggiornaQuantitaProdotto = async (productId, newQuantity, currentQuantity) => {
    try {

        // Effettua una richiesta POST al backend per aggiornare lo stock
        const response = await axios.post('http://localhost:3000/api/update-stock', {
            productId,  // ID del prodotto da aggiornare
            newQuantity, // Nuova quantità richiesta nel carrello
            currentQuantity // Quantità attuale prima dell'aggiornamento
        });

        // Verifica la risposta e restituisce un valore booleano
        if (response.data.success) {
            console.log(response.data.message); // Messaggio di successo
            return true; // Operazione riuscita

        } else {
            console.error(response.data.message); // Messaggio di errore
            return false; // Operazione fallita
        }

    } catch (error) {
        // Se si verifica un errore, lo stampa nella console
        console.error(error.response ? error.response.data.message : error.message);
        // Operazione fallita
        return false;
    }
};

// Funzione per ripristinare lo stock di un prodotto
export const ripristinaStockProdotto = async (productId, quantityToRestore) => {
    try {
        // Effettua una richiesta POST al backend per ripristinare lo stock
        const response = await axios.post('http://localhost:3000/api/restore-stock', {
            productId,        // ID del prodotto da aggiornare
            quantityToRestore // Quantità da ripristinare nello stock
        });

        // Verifica la risposta e restituisce un valore booleano
        if (response.data.success) {
            console.log(response.data.message); // Messaggio di successo
            return true; // Operazione riuscita
        } else {
            console.error(response.data.message); // Messaggio di errore
            return false; // Operazione fallita
        }

    } catch (error) {
        // Se si verifica un errore, lo stampa nella console
        console.error(error.response ? error.response.data.message : error.message);
        // Operazione fallita
        return false;
    }
};