import Header from "../components/Header";
import Footer from "../components/Footer";
import JumbotronCarousel from '../components/JumbotronCarousel'
import { Outlet, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function DefaultLayout() {
    const location = useLocation();

    // Verifica se siamo nella pagina 404
    const isNotFoundPage = location.pathname === "/404" || location.pathname === "/notfound";

    // Verifica se siamo sulla CartPage
    const isCartPage = location.pathname.startsWith("/cart");

    return (
        <>
            {/* Mostra l'header solo se non siamo sulla pagina 404 */}
            {!isNotFoundPage && <Header />}
            <JumbotronCarousel />
            <main>
                <BackButton />
                <Outlet />
            </main>
            {/* Mostra il footer solo se non siamo sulla pagina 404 */}
            {!isNotFoundPage && !isCartPage && <Footer />}
        </>
    )
}