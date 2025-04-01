import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/NotFound.css';

const NotFoundPage = () => {

    useEffect(() => {
        // Nasconde il chatbot di Tidio
        if (window.tidioChatApi) {
            window.tidioChatApi.hide();
        }

        return () => {
            // Mostra di nuovo il chatbot quando si lascia la pagina
            if (window.tidioChatApi) {
                window.tidioChatApi.show();
            }
        };
    }, []);

    return (
        <div className="not-found-container">
            <h1 className="glitch" data-text="404">404</h1>
            <p className="error-message">Oops! Sei finito in un livello segreto! 🎮</p>
            <p className="hint-text">Ma niente paura, puoi ancora tornare indietro!</p>
            <Link to="/" className="arcade-button">🏠 Torna alla Home</Link>
        </div>
    );
};

export default NotFoundPage;