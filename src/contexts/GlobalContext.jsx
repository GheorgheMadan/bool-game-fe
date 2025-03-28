import { createContext, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {



    return (
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalContext, GlobalProvider, useGlobalContext };
