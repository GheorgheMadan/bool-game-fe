// Importo la funzione createContext da React, necessaria per creare un contesto globale
import { createContext } from 'react';

// Creo un contesto globale utilizzando createContext() 
// Questo contesto servirà per condividere dati tra i componenti senza dover passare le props manualmente
const GlobalContextResults = createContext();

// Esporta il contesto per poterlo utilizzare in altre parti dell'applicazione
export default GlobalContextResults;