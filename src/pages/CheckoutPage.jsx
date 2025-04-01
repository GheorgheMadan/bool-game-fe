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

// Inizializza Stripe con la tua chiave pubblica di test
const stripePromise = loadStripe(
  "pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf"
);

const CheckoutForm = () => {
  const { clearCartAfterPayment } = useCheckout();
  const { cart } = useCart(); // Accesso al carrello dal contesto
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  // Stato per i dettagli dell'utente
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

  // Funzione per calcolare il totale dell'ordine
  useEffect(() => {
    const totalAmount = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotal(totalAmount.toFixed(2));
    // Calcola il costo della spedizione
    const shipping = totalAmount > 40 ? 0 : 5.99; // Spedizione gratuita per ordini superiori a 40€
    setShippingCost(shipping.toFixed(2));
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
            setClientSecret(response.data.clientSecret);
          } else {
            console.error("Client Secret mancante");
          }
        })
        .catch((error) => {
          console.error("Errore nella creazione della sessione:", error);
        });
    }
  }, [cart, userDetails]);

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
      setPaymentStatus("error");
      setPaymentMessage("Si è verificato un errore nel pagamento. Riprova!");
    }
    setLoading(false);
  };

  return (
    <div className="container">
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

      <div className="centered-price">
        Spedizione gratuita per ordini superiori a 40€
      </div>

      <div className="centered-price">
        Costo spedizione: €{shippingCost}{" "}
        {shippingCost === "0.00" && "(gratis)"}
      </div>

      <form>
        {/* Campi per i dettagli dell'utente */}

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
        <form onSubmit={handlePayment}>
          <PaymentElement />
          <button
            className="pagamento"
            type="submit"
            disabled={loading || !stripe || !elements}
          >
            {loading ? "Caricamento..." : "Paga"}
          </button>
        </form>
      )}
      {/* Mostra il messaggio di stato del pagamento */}
      {paymentMessage && (
        <div
          className={`payment-status ${paymentStatus} ${
            fadeOut ? "fade-out" : ""
          }`}
        >
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
      axios
        .post("http://localhost:3000/api/payment/create-checkout-session", {
          cartItems: cart,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.clientSecret) {
            setClientSecret(response.data.clientSecret);
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
