import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useCheckout } from "../contexts/CheckoutContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "../style/CheckoutPage.css";
import { calculateTotal } from "./CartPage"; // Importa la funzione

// Inizializza Stripe con la tua chiave pubblica di test
const stripePromise = loadStripe(
  "pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf"
);

const CheckoutForm = () => {
  const { clearCartAfterPayment } = useCheckout();   // Funzione per svuotare il carrello dopo il pagamento
  const { cart } = useCart(); // Accesso al carrello dal contesto
  const [loading, setLoading] = useState(false);  // Stato di caricamento per il pagamento
  const [total, setTotal] = useState(0);  // Totale dell'ordine
  const [clientSecret, setClientSecret] = useState(null);  // Chiave cliente per Stripe
  const [shippingCost, setShippingCost] = useState(0);  // Costo della spedizione

  // Stato per i dettagli dell'utente (form)
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    fiscalCode: "",
  });

  // Stato per la gestione dei messaggi di pagamento
  const [paymentStatus, setPaymentStatus] = useState(""); // Stato per il messaggio di pagamento
  const [paymentMessage, setPaymentMessage] = useState(""); // Messaggio di stato del pagamento
  const [fadeOut, setFadeOut] = useState(false); // Gestione della sparizione del messaggio
  // Hook di Stripe
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Calcola il totale dell'ordine ogni volta che cambia il carrello
  useEffect(() => {
    const totalAmount = calculateTotal(cart); // Passa il carrello come parametro
    setTotal(totalAmount);
  }, [cart]);

  // Ottiene il clientSecret per Stripe al caricamento del carrello
  useEffect(() => {
    if (cart.length > 0) {
      axios
        .post("http://localhost:3000/api/payment/create-checkout-session", {
          cartItems: cart,
          userDetails,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.clientSecret) {
            setClientSecret(response.data.clientSecret);  // Imposta la clientSecret per Stripe
          } else {
            console.error("Client Secret mancante");
          }
        })
        .catch((error) => {
          console.error("Errore nella creazione della sessione:", error);
        });
    }
  }, [cart, userDetails]);  // Riprova ogni volta che il carrello o i dettagli utente cambiano

  // Gestisce il cambiamento degli input dell'utente
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gestisce il pagamento con Stripe
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus(null);
    setPaymentMessage("");

    // Verifica che tutti i campi del form siano compilati
    for (const key in userDetails) {
      if (!userDetails[key].trim()) {
        setPaymentStatus("error");
        setPaymentMessage("Tutti i campi del form devono essere compilati.");
        setLoading(false);
        return;
      }
    }

    // Controlla se Stripe ed Elements sono stati inizializzati correttamente
    if (!stripe || !elements) {
      console.error("Stripe non è caricato");
      setLoading(false);
      return;
    }

    // Conferma il pagamento con Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements, // Elementi del modulo di pagamento di Stripe
      confirmParams: {
        return_url: window.location.origin, // URL a cui reindirizzare l'utente dopo il pagamento
      },
      redirect: "if_required", // Evita il reindirizzamento se non necessario
    });

    if (!error && paymentIntent?.status === "succeeded") {
      console.log("✅ Pagamento riuscito");

      console.log("✅ Stock aggiornato con successo");

      try {
        // Invia la richiesta per inviare email dopo il pagamento
        await axios.post(
          "http://localhost:3000/api/payment/send-order-emails",
          {
            userDetails,
            cartItems: cart,
            total: cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          }
        );

        console.log("✅ Email inviate con successo");

        // Mostra il messaggio di successo
        setPaymentStatus("success");
        setPaymentMessage("Il pagamento è andato a buon fine!");
        setFadeOut(false);

        // Svuota il carrello e calcola la differenza dello stock del db e la aggiorna
        clearCartAfterPayment();
        console.log("Carrello svuotato");

        // Attendi 2 secondi e poi reindirizza alla Homepage
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }, 2000);
      } catch (emailError) {
        console.error("❌ Errore nell’invio delle email:", emailError);
        setPaymentMessage(
          "Pagamento riuscito, ma errore nell’invio delle email."
        );
      }
    } else {
      // Se il pagamento fallisce, mostra un messaggio di errore
      setPaymentStatus("error");
      setPaymentMessage("Si è verificato un errore nel pagamento. Riprova!");
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container">
      {/* CHECKOUT */}
      <div className="checkout">
        <h1>Checkout</h1>
      </div>

      {/* PREZZO TOTALE */}
      <div className="total_price">
        <h3>
          <i class="fa-solid fa-coins"></i> Totale: €{total}
        </h3>
      </div>

      {/* INSERISCI I TUOI DATI PERSONALI */}
      <div class="enter_details">
        <h2>
          <i class="fa-regular fa-id-card"></i> Inserisci i tuoi dati
        </h2>
      </div>

      {/* Campi per i dettagli dell'utente */}
      <form>
        <div className="personal_data">
          <div className="input_group">
            <label for="name">Nome</label>
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
              placeholder="Nome"
              required
            />
          </div>

          <div className="input_group">
            <label for="lastname">Cognome</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              placeholder="Cognome"
              required
            />
          </div>

          <div className="input_group">
            <label for="indirizzo">Indirizzo</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              placeholder="Indirizzo"
              required
            />
          </div>

          <div className="input_group">
            <label for="città">Città</label>
            <input
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              placeholder="Città"
              required
            />
          </div>

          <div className="input_group">
            <label for="cap">CAP</label>
            <input
              type="text"
              name="postalCode"
              value={userDetails.postalCode}
              onChange={handleInputChange}
              placeholder="CAP"
              required
            />
          </div>

          <div className="input_group">
            <label for="stato">Stato</label>
            <input
              type="text"
              name="state"
              value={userDetails.state}
              onChange={handleInputChange}
              placeholder="Stato"
              required
            />
          </div>

          <div className="input_group">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="input_group">
            <label for="codice_fiscale">ID code</label>
            <input
              type="text"
              name="fiscalCode"
              value={userDetails.fiscalCode}
              onChange={handleInputChange}
              placeholder="Codice Fiscale"
              required
            />
          </div>
        </div>
      </form>
      {/* BUTTON PAGAMENTO */}
      {clientSecret && (
        <form onSubmit={handlePayment} className="stripe-form">
          <PaymentElement />
          <button
            className="pagamento"
            type="submit"
            disabled={loading || !stripe || !elements}
          >
            {loading ? "Caricamento..." : "Acquista ora"}
          </button>
        </form>
      )}
      {/* Mostra il messaggio di stato del pagamento */}
      {paymentMessage && (
        <div
          className={`payment-status ${paymentStatus} ${fadeOut ? "fade-out" : ""
            }`}
        >
          {paymentMessage}
        </div>
      )}
    </div>
  );
};

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState(null);  // Stato per la chiave clientSecret di Stripe
  const { cart } = useCart();  // Ottieni il carrello dal contesto

  // Ottiene il clientSecret al caricamento della pagina
  useEffect(() => {
    if (cart.length > 0) {
      axios
        .post("http://localhost:3000/api/payment/create-checkout-session", {
          cartItems: cart,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.clientSecret) {
            setClientSecret(response.data.clientSecret);  // Imposta clientSecret se ricevuto
          } else {
            console.error("Client Secret mancante");
          }
        })
        .catch((error) => {
          console.error("Errore nella creazione della sessione:", error);
        });
    }
  }, [cart]);

  return (
    <>
      {/* Renderizza il form solo se il clientSecret è stato ricevuto */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default CheckoutPage;
