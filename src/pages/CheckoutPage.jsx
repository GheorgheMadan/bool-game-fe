import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';

// Chiave pubblica Stripe
const stripePromise = loadStripe("pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf");

const CheckoutPage = () => {
    // Estraiamo il carrello e la funzione clearCart dal contesto
    const { cart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState(null);

    // Stato per gestire i dettagli dell'utente
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        state: '',
        email: '',
        fiscalCode: '',
    });
    const navigate = useNavigate();

    // Calcola il totale del carrello quando cambia
    useEffect(() => {
        const calculatedTotal = cart.reduce(
            (total, product) => total + product.price * product.quantity, 0
        );
        setTotal(calculatedTotal.toFixed(2));
        // Log del totale calcolato
        console.log('Totale carrello:', calculatedTotal.toFixed(2));
    }, [cart]);

    // Funzione per gestire il pagamento
    const handleCheckout = async () => {

        setLoading(true);

        // Controlla che tutti i campi siano compilati
        for (let key in userDetails) {
            if (!userDetails[key]) {
                alert(`Campo ${key} mancante`);
                setLoading(false);
                return;
            }
        }

        try {
            console.log('Avvio del pagamento...');

            // Invia i dati al backend per creare la sessione di pagamento con Stripe
            const { data } = await axios.post('http://localhost:3000/api/payment/create-checkout-session', {
                cartItems: cart,
                userDetails,
            });
            console.log('Sessione di pagamento creata:', data);

            // Se la sessione è stata creata con successo, reindirizza alla pagina di pagamento Stripe
            if (data.sessionId) {
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

                if (error) {
                    console.error('Errore Stripe:', error);
                    setLoading(false);
                    setPaymentStatus('error');
                }
            }
        } catch (error) {
            console.error('Errore durante il checkout:', error);
            setLoading(false);
            setPaymentStatus('error');
        }
    };

    // Aggiorna lo stato dei campi di input quando l'utente digita
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Funzione per ripristinare lo stock dopo il pagamento
    const adjustStock = async () => {
        try {
            console.log('Ripristino dello stock...');
            await axios.post('http://localhost:3000/api/stock/adjust', {
                cartItems: cart,
            });
            console.log('Stock ripristinato con successo');
        } catch (error) {
            console.error('Errore durante il ripristino dello stock:', error);
        }
    };

    // Se il pagamento è andato a buon fine, svuota il carrello, ripristina lo stock e reindirizza
    useEffect(() => {
        if (paymentStatus === 'success') {
            clearCart();  // Pulisce il carrello dopo il pagamento
            adjustStock(); // Ripristina lo stock
            navigate('/'); // Reindirizza alla home appena il pagamento è completato
        }
    }, [paymentStatus, clearCart, navigate]);

    // Mostra un messaggio di caricamento durante il processo di pagamento
    if (loading) return <div>Caricamento...</div>;

    return (

        <div>
            <h1>Checkout</h1>

            {paymentStatus === 'error' && (
                <div>
                    <h2>Errore nel pagamento. Riprova.</h2>
                </div>
            )}

            {/* Sezione riepilogo carrello */}
            <div>
                <h2>Carrello</h2>
                {cart.length === 0 ? (
                    <p>Il carrello è vuoto.</p>
                ) : (
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id}>
                                <div>
                                    <img src={product.image_url || '/default-image.jpg'} alt={product.name || 'Prodotto'} width="100" />
                                    <h3>{product.name || 'Nome prodotto non disponibile'}</h3>
                                    <p>Prezzo: €{product.price}</p>
                                    <p>Quantità: {product.quantity}</p>
                                    <p>Totale: €{(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Form dati utente e pulsante per procedere al pagamento */}
            <div>
                <h3>Totale: €{total}</h3>
                {cart.length > 0 && !paymentStatus && (
                    <form onSubmit={handleCheckout}>
                        <h2>Inserisci i tuoi dati</h2>
                        <input
                            type="text"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={handleInputChange}
                            placeholder="Nome"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={handleInputChange}
                            placeholder="Cognome"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            value={userDetails.address}
                            onChange={handleInputChange}
                            placeholder="Indirizzo"
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            value={userDetails.city}
                            onChange={handleInputChange}
                            placeholder="Città"
                            required
                        />
                        <input
                            type="text"
                            name="postalCode"
                            value={userDetails.postalCode}
                            onChange={handleInputChange}
                            placeholder="CAP"
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            value={userDetails.state}
                            onChange={handleInputChange}
                            placeholder="Stato"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="fiscalCode"
                            value={userDetails.fiscalCode}
                            onChange={handleInputChange}
                            placeholder="Codice Fiscale"
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Caricamento...' : 'Procedi al pagamento'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
