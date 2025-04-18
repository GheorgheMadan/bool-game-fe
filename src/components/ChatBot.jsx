// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../style/ChatBot.css";

// const ChatBot = ({ productId }) => {

//     // Stato per memorizzare le informazioni del prodotto
//     const [product, setProduct] = useState(null);

//     // Stato per gestire i messaggi della chat
//     const [messages, setMessages] = useState([
//         { text: "Ciao! Vuoi info sul prodotto?", sender: "bot" },
//     ]);

//     // Variabile per la visibilità del chatbot
//     const [isVisible, setIsVisible] = useState(true);

//     useEffect(() => {
//         if (productId) {
//             // Reset dei messaggi ogni volta che il productId cambia
//             setMessages([{ text: "Ciao! Vuoi info sul prodotto?", sender: "bot" }]);

//             // Effettua una chiamata API per ottenere i dettagli del prodotto
//             axios.get(`http://localhost:3000/api/products/${productId}`)
//                 .then(response => {
//                     setProduct(response.data);  // Salva i dati del prodotto nello stato

//                     // Crea i messaggi con le informazioni del prodotto
//                     const newMessages = [
//                         { text: `📢 Nome: ${response.data.name}`, sender: "bot" },
//                         { text: `💰 Prezzo: ${response.data.price}€`, sender: "bot" },
//                         { text: `📝 ${response.data.description}`, sender: "bot" },
//                     ];

//                     // Aggiungi i nuovi messaggi solo se non sono già presenti
//                     setMessages(prevMessages => {
//                         const alreadyHasProductInfo = prevMessages.some(
//                             (msg) =>
//                                 msg.text === newMessages[0].text ||
//                                 msg.text === newMessages[1].text ||
//                                 msg.text === newMessages[2].text
//                         );

//                         return alreadyHasProductInfo ? prevMessages : [...prevMessages, ...newMessages];
//                     });
//                 })
//                 .catch(error => console.error("Errore nel caricamento del prodotto:", error));
//         }

//         // Imposta un timer per nascondere il chatbot dopo 5 secondi (5000 ms)
//         const timer = setTimeout(() => {
//             setIsVisible(false);
//         }, 9000);

//         // Pulisci il timer se il componente viene smontato o se il productId cambia
//         return () => clearTimeout(timer);

//     }, [productId]);

//     return (
//         <>
//             {isVisible && (  // Mostra il chatbot solo se è visibile
//                 <div className="chatbot-container">
//                     <div className="chat-box">
//                         {messages.map((msg, index) => (
//                             <div key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
//                                 {msg.text}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default ChatBot;


