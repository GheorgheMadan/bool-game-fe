import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

// Carica Stripe con la configurazione per disabilitare i cookie
const stripePromise = loadStripe('pk_test_51R4oHvPXYjIqouRcxeNvWgRuFnQ1vo8PlqPEzVS6mDT2ix4nlzdDPaqwSVD5oHDfiTx0xdfcL0IzUQTsy4IU1bvA0079IF49Us', {
    stripeAccount: 'acct_1R4oHoBsHKjTjOb2',
    advancedFraudSignals: false,  // Disabilita i cookie in Stripe Elements
});

const CheckoutPage = () => {
    const [order, setOrder] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Recupera l'ordine e il clientSecret dal backend
        const fetchOrderDetails = async () => {
            const orderId = 1; // Recupera dinamicamente l'ID dell'ordine
            try {
                const { data } = await axios.post('/api/payment/create', { order_id: orderId });
                setOrder(data.order);  // Supponiamo che l'API restituisca anche i dettagli dell'ordine
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Errore nel recuperare i dettagli dell'ordine:", error);
            }
        };

        fetchOrderDetails();
    }, []);

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            console.error('Pagamento fallito:', error);
            alert('Pagamento fallito, riprova');
        } else if (paymentIntent.status === 'succeeded') {
            alert('Pagamento completato con successo!');
            // A questo punto, invia la conferma via email tramite Nodemailer (backend)
        }

        setIsProcessing(false);
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
                <h3>Totale: {order.total}€</h3>
                <h3>Spese di spedizione: {order.shipping_cost}€</h3>
            </div>
            <form onSubmit={handlePaymentSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || isProcessing}>Paga</button>
            </form>
        </div>
    );
};

// Usa il provider per Stripe.js
const CheckoutPageWithStripe = () => (
    <StripeProvider stripe={stripePromise}>
        <CheckoutPage />
    </StripeProvider>
);

export default CheckoutPageWithStripe;
