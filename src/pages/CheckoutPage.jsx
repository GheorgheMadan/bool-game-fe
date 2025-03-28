import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

// Carica Stripe con la chiave pubblica
const stripePromise = loadStripe('pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf');

const CheckoutPage = () => {
    const [order, setOrder] = useState(null); // Stato per i dettagli dell'ordine
    const [clientSecret, setClientSecret] = useState(''); // Stato per il client secret
    const [isProcessing, setIsProcessing] = useState(false); // Stato per il processo di pagamento
    const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '' }); // Stato per i dettagli dell'utente

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Recupera i dettagli dell'ordine e il clientSecret dal backend
        const fetchOrderDetails = async () => {
            const orderId = 1; // Cambia con l'ID dell'ordine corretto
            try {
                const { data } = await axios.post('/api/payment/process', { order_id: orderId });
                setOrder(data.order);
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Errore nel recuperare i dettagli dell'ordine:", error);
            }
        };

        fetchOrderDetails();
    }, []);

    // Funzione per inviare il pagamento
    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        // Includi anche i dettagli dell'utente nel pagamento
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
            receipt_email: userInfo.email, // Invia l'email dell'utente per la ricevuta
        });

        if (error) {
            console.error('Pagamento fallito:', error);
            alert('Pagamento fallito, riprova');
        } else if (paymentIntent.status === 'succeeded') {
            alert('Pagamento completato con successo!');
            // Qui puoi inviare una conferma via email, se necessario
        }

        setIsProcessing(false);
    };

    // Funzione per gestire il cambiamento dei dati dell'utente
    const handleUserInfoChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value,
        });
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Riepilogo Ordine</h2>
            <ul>
                {order.products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.quantity} x {product.price}€
                    </li>
                ))}
            </ul>
            <div>
                <h3>Totale: €{order.total}</h3>
                <h3>Spese di spedizione: €{order.shipping_cost}</h3>
            </div>

            <h3>Dettagli di pagamento</h3>
            <form onSubmit={handlePaymentSubmit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userInfo.name}
                        onChange={handleUserInfoChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleUserInfoChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Indirizzo di spedizione</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleUserInfoChange}
                        required
                    />
                </div>

                <CardElement />

                <button type="submit" disabled={!stripe || isProcessing}>
                    {isProcessing ? 'Elaborazione...' : 'Paga'}
                </button>
            </form>
        </div>
    );
};

// Usa il provider per Stripe.js
import { Elements } from '@stripe/react-stripe-js';

const CheckoutPageWithStripe = () => (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
);

export default CheckoutPageWithStripe;
