import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
import "../style/SingleProduct.css";

export default function SingleProduct() {
  const [query, setQuery] = useState({});
  const [query2, setQuery2] = useState({});

  const productsData = () => {
    axios
      .get("http://localhost:3000/api/products/1")
      .then((res) => {
        setQuery(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    productsData();
  }, []);

  function fetchGames() {
    axios
      .get("http://localhost:3000/api/products/search?category=gioco")
      .then((res) => {
        setQuery2(res.data[0]);
        // console.log(res.data)
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    // VIDEOGAME CARD //

    <div className="card d-flex flex-row p-4 border rounded-lg shadow-lg">
      {/* Parte sinistra con titolo e prezzo */}
      <div className="card-body-left  ">
        <h5 className="card-title ">{query.name}</h5>
        <p className="card-text font-semibold text-gray-700 text-lg mb-4">
          {query.price}
        </p>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
          ducimus. Quidem illo vel, cum quia dolores libero quae rerum
          dignissimos, corporis tenetur ipsum ex doloremque animi natus nihil
          necessitatibus voluptates! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Incidunt, officia nemo, recusandae at excepturi
          eligendi eaque quisquam quo amet perspiciatis dignissimos ut
          voluptatem totam quae molestiae cumque similique autem aut! Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Tempora saepe
          perferendis blanditiis aliquam cupiditate. Iure debitis omnis
          perspiciatis recusandae aperiam assumenda enim, ducimus dolorum odit
          ullam atque voluptate repellat? Recusandae. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum expedita non quisquam ducimus harum
          at veritatis nesciunt pariatur repudiandae? Dignissimos eos
          repellendus distinctio officia praesentium saepe hic optio velit
          cumque.
        </p>
      </div>

      {/* Parte destra con immagine e info a destra */}
      <div className="card-body-right">
        <div className="flex-row">
          {/* Immagine a sinistra */}
          <div className="image-container">
            <img
              className="image-small"
              src={query.image_url}
              alt={query.name}
            />
            {/* Info a destra dell'immagine */}
            <div className="card-right-info">
              <div className="total-price">Prezzo totale: """"</div>
              <div className="shipping-cost"> Costo spedizione $9.99</div>
              <div className="tax">Tasse % 1,50</div>
              <div className="shipping-free">
                Spedizione gratuita per ordini superiori a 40$
              </div>
              <div className="available">Disponibile</div>
              <button className="add-cart">Aggiungi al carrello</button>
            </div>
          </div>
        </div>

        {/* Accordion posizionato sotto a tutta larghezza */}
        <div className="accordion-container w-full mt-4">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Sezione 1</Accordion.Header>
              <Accordion.Body>{query2.description}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Sezione 2</Accordion.Header>
              <Accordion.Body>Contenuto della seconda sezione.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
