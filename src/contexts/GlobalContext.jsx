import { createContext, useContext } from 'react';

// Creazione del contesto globale per l'app
const GlobalContext = createContext();

// Componente provider che avvolge l'app per fornire uno stato globale
const GlobalProvider = ({ children }) => {
    return (
        // Il provider avvolge i componenti figli, permettendo loro di accedere al contesto
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    );
};

// Hook personalizzato per utilizzare il contesto globale nei componenti
const useGlobalContext = () => {
    return useContext(GlobalContext);  // Ritorna il valore del contesto globale
};

// Esportazione del contesto, del provider e del custom hook per usarli in altri file
export { GlobalContext, GlobalProvider, useGlobalContext };
