import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "../style/CheckoutPage.css";

// Chiave pubblica Stripe
const stripePromise = loadStripe(
  "pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf"
);

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    fiscalCode: "",
  });
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2));
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      axios
        .post("http://localhost:3000/api/payment/create-checkout-session", { cartItems: cart, userDetails })
        .then((response) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus(null);
    setPaymentMessage("");

    for (const key in userDetails) {
      if (!userDetails[key].trim()) {
        setPaymentStatus("error");
        setPaymentMessage("Tutti i campi del form devono essere compilati.");
        setLoading(false);
        return;
      }
    }

    if (!stripe || !elements) {
      console.error("Stripe non è caricato");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (!error && paymentIntent?.status === "succeeded") {
      clearCart();
      try {
        await axios.post("http://localhost:3000/api/payment/send-order-emails", {
          userDetails,
          cartItems: cart,
          total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });
        setPaymentStatus("success");
        setPaymentMessage("Il pagamento è andato a buon fine!");
        setFadeOut(false);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }, 2000);
      } catch (emailError) {
        console.error("Errore nell’invio delle email:", emailError);
        setPaymentMessage("Pagamento riuscito, ma errore nell’invio delle email.");
      }
    } else {
      setPaymentStatus("error");
      setPaymentMessage("Si è verificato un errore nel pagamento. Riprova!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h3>Totale: €{total}</h3>
      <form>
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
            {loading ? "Caricamento..." : "Paga"}
          </button>
        </form>
      )}
      {paymentMessage && (
        <div className={`payment-status ${paymentStatus} ${fadeOut ? "fade-out" : ""}`}>
          {paymentMessage}
        </div>
      )}
    </div>
  );
};

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length > 0) {
      axios
        .post("http://localhost:3000/api/payment/create-checkout-session", { cartItems: cart })
        .then((response) => {
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

  return <>{clientSecret && <Elements stripe={stripePromise} options={{ clientSecret }}><CheckoutForm /></Elements>}</>;
};

export default CheckoutPage;
