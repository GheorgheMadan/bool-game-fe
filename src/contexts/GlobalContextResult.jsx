import { createContext, useState } from 'react';

// Creazione del contesto per gestire i risultati globali (ad esempio, i risultati di una ricerca)
const GlobalContextResults = createContext();

// Componente provider che avvolge l'app per fornire lo stato dei risultati a tutti i componenti figli
export function GlobalContextResultsProvider({ children }) {

    // Stato che memorizza i risultati
    const [results, setResults] = useState([]);

    return (
        // Il provider rende i dati (risultati e funzione per aggiornarli) disponibili per i componenti figli
        <GlobalContextResults.Provider value={{ results, setResults }}>
            {children}   {/* I componenti figli possono ora accedere a 'results' e 'setResults' */}
        </GlobalContextResults.Provider>
    );
}

export default GlobalContextResults;