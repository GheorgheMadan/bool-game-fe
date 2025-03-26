
import React from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const JumbotronCarousel = () => {
    const location = useLocation(); // Ottiene l'URL attuale

    // Definiamo le immagini per ogni pagina
    const imagesByPage = {
        "/": [
            { src: "./jumbotronoImage/xbox_jumbotron/xbox_series_x_s.jpg", alt: "Xbox Image", link: "/xbox" },
            { src: "./jumbotronoImage/playstation_jumbotron/play_4_5.jpg", alt: "PlayStation Image", link: "/playstation" },
            { src: "./jumbotronoImage/ac_shadows_jumbo.jpg", alt: "AC Shadows Image" },
            { src: "./jumbotronoImage/bleach_jumbo.jpg", alt: "Bleach Image" },
            { src: "./jumbotronoImage/nintendo_jumbotron/nintendo_switch.jpg", alt: "Nintendo Image", link: "/nintendo" },
            { src: "./jumbotronoImage/wwe_2k25_jumbo.jpg", alt: "WWE 2K25 Image" },
        ],
        "/playstation": [
            { src: "./jumbotronoImage/playstation_jumbotron/death_stranding_2.jpg", alt: "Death Stranding 2" },
            { src: "./jumbotronoImage/playstation_jumbotron/play_controller.jpg", alt: "PS Controller" },
            { src: "./jumbotronoImage/playstation_jumbotron/play_4_5.jpg", alt: "PS4/5" },
            { src: "./jumbotronoImage/playstation_jumbotron/play_vr.jpg", alt: "PS VR" }
        ],
        "/xbox": [
            { src: "./jumbotronoImage/xbox_jumbotron/xbox_console.jpg", alt: "Xbox Console" },
            { src: "./jumbotronoImage/xbox_jumbotron/accessori_xbox.jpg", alt: "Xbox Accessories" },
            { src: "./jumbotronoImage/xbox_jumbotron/xbox_series_x_s.jpg", alt: "Xbox Series X/S" },
            { src: "./jumbotronoImage/xbox_jumbotron/xbox.jpg", alt: "Xbox" }
        ],
        "/nintendo": [
            { src: "./jumbotronoImage/nintendo_jumbotron/nintendo_switch.jpg", alt: "Nintendo Switch" },
            { src: "./jumbotronoImage/nintendo_jumbotron/nintendo_donkey_kong_Country_Returns.jpg", alt: "Donkey Kong" },
            { src: "./jumbotronoImage/nintendo_jumbotron/nintendo_games.jpg", alt: "Nintendo Games" },
            { src: "./jumbotronoImage/nintendo_jumbotron/xenoblade_chronicles_game.jpg", alt: "Xenoblade" }
        ]
    };

    // Se la pagina attuale ha immagini definite, le usa, altrimenti fallback a un set predefinito
    const images = imagesByPage[location.pathname] || imagesByPage["/"];

    return (

        <Carousel key={location.pathname}>
            {images.map((image) => (
                <Carousel.Item>
                    {image.link ? (
                        <Link to={image.link}>
                            <img className="d-block w-100" src={image.src} alt={image.alt} />
                        </Link>
                    ) : (
                        <img className="d-block w-100" src={image.src} alt={image.alt} />
                    )}
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default JumbotronCarousel;

