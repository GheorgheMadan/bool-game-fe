import React from "react";

import '../style/Footer.css'

//IMPORTO LOGO
import { ImFacebook2 } from "react-icons/im";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container-footer">
        <div className="sb_footer section_padding">
          <div className="overlay"></div>
          <div className="sb_footer-links">
            <div className="sb_footer-links_div">
              <h4>SERVIZI</h4>
              <a href="/Traccia il tuo ordine">
                <p>Traccia il tuo ordine</p>
              </a>
              <a href="/Ritiro Usato">
                <p>Ritiro Usato</p>
              </a>
              <a href="/Tutti i servizi">
                <p>Tutti i servizi</p>
              </a>
            </div>

            <div className="sb_footer-links_div">
              <h4>CONTATTI</h4>
              <a href="/Lavora con noi">
                <p>Lavora con noi</p>
              </a>
              <a href="/Servizio Clienti">
                <p>Servizio Clienti</p>
              </a>
              <a href="/Trova un negozio">
                <p>Trova un negozio</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>NOTE LEGALI</h4>
              <a href="/Condizioni di vendita">
                <p>Condizioni di vendita</p>
              </a>
              <a href="/Garanzi Legale">
                <p>Garanzi Legale</p>
              </a>
              <a href="/Recesso">
                <p>Recesso</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>BG PRO CLUB</h4>
              <a href="/Scopri il Club">
                <p>Scopri il Club</p>
              </a>
              <a href="/Regolamento">
                <p>Regolamento</p>
              </a>
              <a href="/Privacy">
                <p>Privacy</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>Coming soon on</h4>
              <div className="socialmedia">
                <p className="facebook">
                  <a href="https://www.facebook.com"> <ImFacebook2 /> </a>
                </p>
                <p className="twitter">
                  <a href="https://www.twitter.com"> <FaSquareTwitter /> </a>
                </p>
                <p className="twitch">
                  <a href="https://www.twitch.com"> <FaTwitch /> </a>
                </p>
                <p className="instagram">
                  <a href="https://www.instagram.com"> <FaInstagramSquare /> </a>
                </p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <div> ©{new Date().getFullYear()} NextLevelShop. All right reserved.</div>
              <ul>
                <li>
                  <a href="/terms">
                    <p>Terms & Conditions</p>
                  </a>
                </li>
                <li>
                  <a href="/privacy">
                    <p>Privacy</p>
                  </a>
                </li>
                <li>
                  <a href="/security">
                    <p>Security</p>
                  </a>
                </li>
                <li>
                  <a href="/cookie">
                    <p>Cookie Declaration</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div >
    </footer>
  );
};

export default Footer;
