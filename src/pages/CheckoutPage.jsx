import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../contexts/CheckoutContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
// import '../style/Checkout.css'

// Inizializza Stripe con la tua chiave pubblica di test
const stripePromise = loadStripe("pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf");

const CheckoutForm = () => {
    const { clearCartAfterPayment } = useCheckout();
    const { cart } = useCart(); // Accesso al carrello dal contesto
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [clientSecret, setClientSecret] = useState(null);
    const [shippingCost, setShippingCost] = useState(0);

    // Stato per i dettagli dell'utente
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        fiscalCode: ''
    });

    // Stato per la gestione dei messaggi di pagamento
    const [paymentStatus, setPaymentStatus] = useState(''); // Stato per il messaggio di pagamento
    const [paymentMessage, setPaymentMessage] = useState(''); // Messaggio di stato del pagamento
    const [fadeOut, setFadeOut] = useState(false); // Gestione della sparizione del messaggio
    // Hook di Stripe
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Funzione per calcolare il totale dell'ordine
    useEffect(() => {
        const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);
        setTotal(totalAmount.toFixed(2));
        // Calcola il costo della spedizione
        const shipping = totalAmount > 40 ? 0 : 5.99; // Spedizione gratuita per ordini superiori a 40€
        setShippingCost(shipping.toFixed(2));
    }, [cart]);

    // Ottiene il clientSecret per Stripe al caricamento del carrello
    useEffect(() => {
        if (cart.length > 0) {
            axios.post('http://localhost:3000/api/payment/create-checkout-session', { cartItems: cart, userDetails })
                .then(response => {
                    console.log(response.data);
                    if (response.data.clientSecret) {
                        setClientSecret(response.data.clientSecret);
                    } else {
                        console.error('Client Secret mancante');
                    }
                })
                .catch(error => {
                    console.error('Errore nella creazione della sessione:', error);
                });
        }
    }, [cart, userDetails]);

    // Gestisce il cambiamento degli input dell'utente
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Gestisce il pagamento con Stripe
    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentStatus(null);
        setPaymentMessage('');

        // Verifica che tutti i campi del form siano compilati
        for (const key in userDetails) {
            if (!userDetails[key].trim()) {
                setPaymentStatus('error');
                setPaymentMessage('Tutti i campi del form devono essere compilati.');
                setLoading(false);
                return;
            }
        }

        // Controlla se Stripe ed Elements sono stati inizializzati correttamente
        if (!stripe || !elements) {
            console.error('Stripe non è caricato');
            setLoading(false);
            return;
        }

        // Conferma il pagamento con Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,  // Elementi del modulo di pagamento di Stripe
            confirmParams: {
                return_url: window.location.origin,  // URL a cui reindirizzare l'utente dopo il pagamento
            },
            redirect: "if_required",  // Evita il reindirizzamento se non necessario
        });

        if (!error && paymentIntent?.status === "succeeded") {
            console.log('✅ Pagamento riuscito');

            console.log('✅ Stock aggiornato con successo');

            try {
                // Invia la richiesta per inviare email dopo il pagamento
                await axios.post('http://localhost:3000/api/payment/send-order-emails', {
                    userDetails,
                    cartItems: cart,
                    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                });

                console.log('✅ Email inviate con successo');

                // Mostra il messaggio di successo
                setPaymentStatus('success');
                setPaymentMessage('Il pagamento è andato a buon fine!');
                setFadeOut(false);

                // Svuota il carrello e calcola la differenza dello stock del db e la aggiorna
                clearCartAfterPayment();
                console.log("Carrello svuotato");

                // Attendi 2 secondi e poi reindirizza alla Homepage
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);

                }, 2000);
            } catch (emailError) {
                console.error('❌ Errore nell’invio delle email:', emailError);
                setPaymentMessage('Pagamento riuscito, ma errore nell’invio delle email.');
            }
        } else {
            setPaymentStatus('error');
            setPaymentMessage('Si è verificato un errore nel pagamento. Riprova!');
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Checkout</h1>
            <h3>Totale: €{total}</h3>
            <div className="centered-price">Spedizione gratuita per ordini superiori a 40€</div>
            <div className="centered-price">
                Costo spedizione: €{shippingCost} {shippingCost === "0.00" && "(gratis)"}
            </div>
            <form>
                {/* Campi per i dettagli dell'utente */}
                <input type="text" name="firstName" value={userDetails.firstName} onChange={handleInputChange} placeholder="Nome" required />
                <input type="text" name="lastName" value={userDetails.lastName} onChange={handleInputChange} placeholder="Cognome" required />
                <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} placeholder="Email" required />
                <input type="text" name="address" value={userDetails.address} onChange={handleInputChange} placeholder="Indirizzo" required />
                <input type="text" name="city" value={userDetails.city} onChange={handleInputChange} placeholder="Città" required />
                <input type="text" name="state" value={userDetails.state} onChange={handleInputChange} placeholder="Stato" required />
                <input type="text" name="fiscalCode" value={userDetails.fiscalCode} onChange={handleInputChange} placeholder="Codice Fiscale" required />
            </form>
            {clientSecret && (
                <form onSubmit={handlePayment}>
                    <PaymentElement />
                    <button type="submit" disabled={loading || !stripe || !elements}>
                        {loading ? 'Caricamento...' : 'Paga'}
                    </button>
                </form>
            )}
            {/* Mostra il messaggio di stato del pagamento */}
            {paymentMessage && (
                <div className={`payment-status ${paymentStatus} ${fadeOut ? 'fade-out' : ''}`}>
                    {paymentMessage}
                </div>
            )}
        </div>
    );
};

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const { cart } = useCart();

    // Ottiene il clientSecret al caricamento della pagina
    useEffect(() => {
        if (cart.length > 0) {
            axios.post('http://localhost:3000/api/payment/create-checkout-session', { cartItems: cart })
                .then(response => {
                    console.log(response.data);
                    if (response.data.clientSecret) {
                        setClientSecret(response.data.clientSecret);
                    } else {
                        console.error('Client Secret mancante');
                    }
                })
                .catch(error => {
                    console.error('Errore nella creazione della sessione:', error);
                });
        }
    }, [cart]);

    return (
        <>
            {/* Renderizza il form solo se il clientSecret è stato ricevuto */}
            {clientSecret && <Elements stripe={stripePromise} options={{ clientSecret }}><CheckoutForm /></Elements>}
        </>
    );
};

export default CheckoutPage;





// import React, { useEffect, useState } from 'react';
// import { useCart } from '../contexts/CartContext';
// import axios from 'axios';
// import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from 'react-router-dom';

// // Chiave pubblica Stripe
// const stripePromise = loadStripe("pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf");

// const CheckoutPage = () => {
//     // Estraiamo il carrello e la funzione clearCart dal contesto
//     const { cart, clearCart } = useCart();
//     const [loading, setLoading] = useState(false);
//     const [total, setTotal] = useState(0);
//     const [paymentStatus, setPaymentStatus] = useState(null);

//     // Stato per gestire i dettagli dell'utente
//     const [userDetails, setUserDetails] = useState({
//         firstName: '',
//         lastName: '',
//         address: '',
//         city: '',
//         postalCode: '',
//         state: '',
//         email: '',
//         fiscalCode: '',
//     });
//     const navigate = useNavigate();

//     // Calcola il totale del carrello quando cambia
//     useEffect(() => {
//         const calculatedTotal = cart.reduce(
//             (total, product) => total + product.price * product.quantity, 0
//         );
//         setTotal(calculatedTotal.toFixed(2));
//         // Log del totale calcolato
//         console.log('Totale carrello:', calculatedTotal.toFixed(2));
//     }, [cart]);

//     // Funzione per gestire il pagamento
//     const handleCheckout = async () => {

//         setLoading(true);

//         // Controlla che tutti i campi siano compilati
//         for (let key in userDetails) {
//             if (!userDetails[key]) {
//                 alert(`Campo ${key} mancante`);
//                 setLoading(false);
//                 return;
//             }
//         }

//         try {
//             console.log('Avvio del pagamento...');

//             // Invia i dati al backend per creare la sessione di pagamento con Stripe
//             const { data } = await axios.post('http://localhost:3000/api/payment/create-checkout-session', {
//                 cartItems: cart,
//                 userDetails,
//             });
//             console.log('Sessione di pagamento creata:', data);

//             // Se la sessione è stata creata con successo, reindirizza alla pagina di pagamento Stripe
//             if (data.sessionId) {
//                 const stripe = await stripePromise;
//                 const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

//                 if (error) {
//                     console.error('Errore Stripe:', error);
//                     setLoading(false);
//                     setPaymentStatus('error');
//                 }
//             }
//         } catch (error) {
//             console.error('Errore durante il checkout:', error);
//             setLoading(false);
//             setPaymentStatus('error');
//         }
//     };

//     // Aggiorna lo stato dei campi di input quando l'utente digita
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserDetails({ ...userDetails, [name]: value });
//     };

//     // Funzione per ripristinare lo stock dopo il pagamento
//     const adjustStock = async () => {
//         try {
//             console.log('Ripristino dello stock...');
//             await axios.post('http://localhost:3000/api/stock/adjust', {
//                 cartItems: cart,
//             });
//             console.log('Stock ripristinato con successo');
//         } catch (error) {
//             console.error('Errore durante il ripristino dello stock:', error);
//         }
//     };

//     // Se il pagamento è andato a buon fine, svuota il carrello, ripristina lo stock e reindirizza
//     useEffect(() => {
//         if (paymentStatus === 'success') {
//             clearCart();  // Pulisce il carrello dopo il pagamento
//             adjustStock(); // Ripristina lo stock
//             navigate('/'); // Reindirizza alla home appena il pagamento è completato
//         }
//     }, [paymentStatus, clearCart, navigate]);

//     // Mostra un messaggio di caricamento durante il processo di pagamento
//     if (loading) return <div>Caricamento...</div>;

//     return (

//         <div>
//             <h1>Checkout</h1>

//             {paymentStatus === 'error' && (
//                 <div>
//                     <h2>Errore nel pagamento. Riprova.</h2>
//                 </div>
//             )}

//             {/* Sezione riepilogo carrello */}
//             <div>
//                 <h2>Carrello</h2>
//                 {cart.length === 0 ? (
//                     <p>Il carrello è vuoto.</p>
//                 ) : (
//                     <ul>
//                         {cart.map((product) => (
//                             <li key={product.id}>
//                                 <div>
//                                     <img src={product.image_url || '/default-image.jpg'} alt={product.name || 'Prodotto'} width="100" />
//                                     <h3>{product.name || 'Nome prodotto non disponibile'}</h3>
//                                     <p>Prezzo: €{product.price}</p>
//                                     <p>Quantità: {product.quantity}</p>
//                                     <p>Totale: €{(product.price * product.quantity).toFixed(2)}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Form dati utente e pulsante per procedere al pagamento */}
//             <div>
//                 <h3>Totale: €{total}</h3>
//                 {cart.length > 0 && !paymentStatus && (
//                     <form onSubmit={handleCheckout}>
//                         <h2>Inserisci i tuoi dati</h2>
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={userDetails.firstName}
//                             onChange={handleInputChange}
//                             placeholder="Nome"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={userDetails.lastName}
//                             onChange={handleInputChange}
//                             placeholder="Cognome"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="address"
//                             value={userDetails.address}
//                             onChange={handleInputChange}
//                             placeholder="Indirizzo"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             value={userDetails.city}
//                             onChange={handleInputChange}
//                             placeholder="Città"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="postalCode"
//                             value={userDetails.postalCode}
//                             onChange={handleInputChange}
//                             placeholder="CAP"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="state"
//                             value={userDetails.state}
//                             onChange={handleInputChange}
//                             placeholder="Stato"
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             value={userDetails.email}
//                             onChange={handleInputChange}
//                             placeholder="Email"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="fiscalCode"
//                             value={userDetails.fiscalCode}
//                             onChange={handleInputChange}
//                             placeholder="Codice Fiscale"
//                             required
//                         />
//                         <button type="submit" disabled={loading}>
//                             {loading ? 'Caricamento...' : 'Procedi al pagamento'}
//                         </button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;
