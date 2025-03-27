import axios from 'axios';

export const aggiornaQuantitaProdotto = async (productId, newQuantity, currentQuantity) => {
    try {

        // Effettua una richiesta POST al backend per aggiornare lo stock
        const response = await axios.post('http://localhost:3000/api/update-stock', {
            productId,  // ID del prodotto da aggiornare
            newQuantity, // Nuova quantità richiesta nel carrello
            currentQuantity // Quantità attuale prima dell'aggiornamento
        });

        console.log(response.data.message);
        // Operazione riuscita
        return true;
    } catch (error) {
        // Se si verifica un errore, lo stampa nella console
        console.error(error.response ? error.response.data.message : error.message);
        // Operazione fallita
        return false;
    }
};
