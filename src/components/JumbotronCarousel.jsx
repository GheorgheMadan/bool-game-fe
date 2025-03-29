
import React from "react";
import { useLocation } from "react-router-dom";
import { Carousel, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../style/JumbotronStyle.css'

const JumbotronCarousel = () => {
    const location = useLocation(); // Ottiene l'URL attuale

    // Definiamo le immagini per ogni pagina

    const imagesByPage = {
        "/": [
            {
                src: "./jumbotronoImage/xbox_jumbotron/xbox_series_x_s.jpg",
                alt: "Xbox Image",
                link: "/xbox",
                title: "Scopri Xbox Series X/S",
                text: "La nuova generazione di giochi è qui! Scopri l'incredibile potenza e velocità di Xbox Series X/S, la console che porta i giochi al livello successivo.",
                buttonText: "Acquista ora",
                buttonLink: "/xbox",
                xboxLogo: "xbox-logo",
                greenBtn: "greenBtn animationButton"
            },
            {
                src: "./jumbotronoImage/playstation_jumbotron/play_4_5.jpg",
                alt: "PlayStation Image",
                link: "/playstation",
                title: "Benvenuto nella PlayStation 5",
                text: "Scopri i giochi esclusivi PS5, con prestazioni senza precedenti e un'esperienza immersiva come mai prima d'ora. Un mondo di giochi ti aspetta!",
                buttonText: "Scopri di più",
                buttonLink: "/playstation",
                animationButton: "animationButton",
                blackText: "blackText",
                logoPLay: "logoPlay"
            },
            {
                src: "./jumbotronoImage/ac_shadows_jumbo.jpg",
                alt: "AC Shadows Image",
                link: "/products/11",  // aggiunto link
                title: "Assassin's Creed Shadows",
                text: "Un'avventura epica ti aspetta in Assassin's Creed Shadows, dove ogni decisione conta e la storia prende vita. Preparati a diventare un leggendario assassino.",
                buttonText: "Gioca ora",
                buttonLink: "/products/11",
                redButton: "redButton animationButton"
            },
            {
                src: "./jumbotronoImage/bleach_jumbo.jpg",
                alt: "Bleach Image",
                link: "/products/13",  // aggiunto link
                title: "Bleach: L'avventura continua",
                text: "Entra nel mondo di Bleach con nuovi episodi e avventure, dove gli spiriti e i combattimenti sono sempre più intensi. Un viaggio che non finisce mai!",
                buttonText: "Scopri ora",
                buttonLink: "/products/13",
                redButton: "redButton",
                leftContainer: "leftContainer"
            },
            {
                src: "./jumbotronoImage/nintendo_jumbotron/nintendo_switch.jpg",
                alt: "Nintendo Image",
                link: "/products/129",
                title: "Scopri il Nintendo Switch",
                text: "Gioca ovunque con Nintendo Switch! La console portatile che ti permette di giocare sia a casa che in viaggio, con giochi per tutti i gusti.",
                buttonText: "Acquista ora",
                buttonLink: "/products/129",
                yellowBtn: "yellowBtn",
                nintendoLogo: "nintendoLogo"
            },
            {
                src: "./jumbotronoImage/wwe_2k25_jumbo.jpg",
                alt: "WWE 2K25 Image",
                link: "/products/14",  // aggiunto link
                title: "WWE 2K25: Scopri la nuova edizione",
                text: "Il ring è pronto, combatti ora! Scopri tutte le novità di WWE 2K25, il gioco che porta l'azione e i combattimenti a un nuovo livello.",
                buttonText: "Gioca ora",
                buttonLink: "/products/14",
                redButton: "redButton animationButton"
            }
        ],
        "/playstation": [
            {
                src: "./jumbotronoImage/playstation_jumbotron/death_stranding_2.jpg",
                alt: "Death Stranding 2",
                link: "/products/12",  // aggiunto link
                title: "Death Stranding 2",
                text: "Un nuovo capitolo dell'avventura straordinaria di Death Stranding, dove il destino del mondo è nelle tue mani. Un'esperienza di gioco unica ed emozionante.",
                buttonText: "Gioca ora",
                buttonLink: "/products/12",
                animationButton: "animationButton",
                blackText: "blackText",
                logoPLay: "logoPlay"
            },
            {
                src: "./jumbotronoImage/playstation_jumbotron/play_controller.jpg",
                alt: "PS Controller",
                link: "/products/107",  // aggiunto link
                title: "Scopri il nuovo controller PS5",
                text: "Un'esperienza di gioco ancora più immersiva con il nuovo controller PS5. La tecnologia avanzata ti farà sentire ogni colpo, ogni movimento.",
                buttonText: "Acquista ora",
                buttonLink: "/products/107",
                animationButton: "animationButton",
                blackText: "blackText",
                logoPLay: "logoPlay"
            },
            {
                src: "./jumbotronoImage/playstation_jumbotron/play_4_5.jpg",
                alt: "PS4/5",
                link: "/playstation/consoles",  // aggiunto link
                title: "PlayStation 4 e 5",
                text: "Gioca con i titoli più recenti su PS4 o PS5. Un catalogo di giochi che soddisferà ogni tipo di gamer, con esperienze coinvolgenti e grafiche mozzafiato.",
                buttonText: "Esplora",
                buttonLink: "/playstation",
                animationButton: "animationButton",
                blackText: "blackText",
                logoPLay: "logoPlay"
            },
            {
                src: "./jumbotronoImage/playstation_jumbotron/play_vr.jpg",
                alt: "PS VR",
                link: "/products/111",  // aggiunto link
                title: "Vivi la realtà virtuale con PS VR",
                text: "Immersione totale nel mondo dei giochi con PlayStation VR. Esplora mondi fantastici come se fossi davvero lì.",
                buttonText: "Acquista ora",
                buttonLink: "/products/111",
                animationButton: "animationButton",
                logoPLay: "logoPlay"
            }
        ],
        "/xbox": [
            {
                src: "./jumbotronoImage/xbox_jumbotron/xbox_console.jpg",
                alt: "Xbox Console",
                link: "/products/137",  // aggiunto link
                title: "Scopri la nuova Xbox Series X/S",
                text: "Console ad alte prestazioni per giochi incredibili. La Xbox Series X/S è la console definitiva per chi cerca potenza e velocità.",
                buttonText: "Acquista ora!",
                buttonLink: "/products/137",
                xboxLogo: "xbox-logo",
                blackText: "blackText",
                greenBtn: "greenBtn animationButton"
            },
            {
                src: "./jumbotronoImage/xbox_jumbotron/accessori_xbox.jpg",
                alt: "Xbox Accessories",
                link: "/xbox/accessories",  // aggiunto link
                title: "Accessori Xbox",
                text: "Migliora la tua esperienza di gioco con gli accessori Xbox. Controller, cuffie e molto altro per un gioco senza compromessi.",
                buttonText: "Esplora gli accessori",
                buttonLink: "/xbox/accessories",
                xboxLogo: "xbox-logo",
                blackText: "blackText",
                greenBtn: "greenBtn animationButton"
            },
            {
                src: "./jumbotronoImage/xbox_jumbotron/xbox_series_x_s.jpg",
                alt: "Xbox Series X/S",
                link: "/xbox/consoles",  // aggiunto link
                title: "Xbox Series X/S",
                text: "La console perfetta per ogni gamer. Con prestazioni straordinarie e giochi esclusivi, Xbox Series X/S è il futuro del gaming.",
                buttonText: "Scopri di più",
                buttonLink: "/xbox/consoles",
                xboxLogo: "xbox-logo",
                greenBtn: "greenBtn animationButton"
            },
            {
                src: "./jumbotronoImage/xbox_jumbotron/xbox.jpg",
                alt: "Xbox",
                link: "/xbox",  // aggiunto link
                title: "Gioca con Xbox",
                text: "Un catalogo di giochi vasto e avvincente. Con Xbox, l'esperienza di gioco è sempre emozionante e ricca di novità.",
                buttonText: "Esplora ora",
                buttonLink: "/xbox",
                xboxLogo: "xbox-logo",
                bgLogo: "bgLogo",
                greenBtn: "greenBtn animationButton"
            }
        ],
        "/nintendo": [
            {
                src: "./jumbotronoImage/nintendo_jumbotron/nintendo_switch.jpg",
                alt: "Nintendo Switch",
                link: "/products/129",  // aggiunto link
                title: "Nintendo Switch",
                text: "Gioca ovunque con la console ibrida. Nintendo Switch ti permette di giocare sia a casa che in movimento, senza compromessi sulla qualità.",
                buttonText: "Acquista ora",
                buttonLink: "/products/129",
                yellowBtn: "yellowBtn",
                nintendoLogo: "nintendoLogo"
            },
            {
                src: "./jumbotronoImage/nintendo_jumbotron/nintendo_donkey_kong_Country_Returns.jpg",
                alt: "Donkey Kong",
                link: "/donkey-kong",  // aggiunto link
                title: "Donkey Kong Country Returns",
                text: "Un ritorno all'avventura per tutti. Scopri le meraviglie di Donkey Kong Country in un viaggio che ti lascerà senza fiato.",
                buttonText: "Gioca ora",
                buttonLink: "/donkey-kong",
                yellowBtn: "yellowBtn",
                nintendoLogo: "nintendoLogo"
            },
            {
                src: "./jumbotronoImage/nintendo_jumbotron/nintendo_games.jpg",
                alt: "Nintendo Games",
                link: "/nintendo-games",  // aggiunto link
                title: "I migliori giochi per Nintendo",
                text: "Scopri titoli incredibili per Nintendo Switch. Una vasta gamma di giochi per tutti i gusti, dalla fantasia all'azione.",
                buttonText: "Esplora ora",
                buttonLink: "/nintendo-games",
                yellowBtn: "yellowBtn",
                nintendoLogo: "nintendoLogo"
            },
            {
                src: "./jumbotronoImage/nintendo_jumbotron/xenoblade_chronicles_game.jpg",
                alt: "Xenoblade",
                link: "/xenoblade",  // aggiunto link
                title: "Xenoblade Chronicles",
                text: "Un'epica avventura ti aspetta. Xenoblade Chronicles è un'avventura che ti porterà in un mondo di fantasy e azione senza precedenti.",
                buttonText: "Gioca ora",
                buttonLink: "/xenoblade",
                yellowBtn: "yellowBtn",
                nintendoLogo: "nintendoLogo"
            }
        ]
    };

    // Se la pagina attuale ha immagini definite, le usa, altrimenti fallback a un set predefinito
    const images = imagesByPage[location.pathname] || imagesByPage["/"];

    return (

        <Carousel key={location.pathname}>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    {image.link ? (
                        <Link to={image.link}>
                            <img className="d-block w-100 img-jumbotron" src={image.src} alt={image.alt} />
                        </Link>
                    ) : (
                        <img className="d-block w-100" src={image.src} alt={image.alt} />
                    )}
                    <Carousel.Caption className={`carousel-caption ${image.leftContainer || ""}`} >
                        <div className="container-details-jumbo" >
                            <div className={`${image.xboxLogo || ""} ${image.bgLogo || ""}  ${image.logoPLay || ""} ${image.nintendoLogo || ""}`}></div>
                            <h4 className={image.blackText}>{image.title}</h4>
                            <p className={image.blackText}>{image.text}</p>
                            {image.link && (
                                <>
                                    <Link to={image.link}>
                                        <Button className={`${image.redButton || ""} ${image.animationButton || ""} ${image.greenBtn || ""} ${image.yellowBtn || ""}`}>{image.buttonText}</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
            }
        </Carousel >
    );
};

export default JumbotronCarousel;

