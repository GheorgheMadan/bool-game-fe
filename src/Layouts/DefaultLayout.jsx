import Header from "../components/Header";
import Footer from "../components/Footer";
import JumbotronCarousel from '../components/JumbotronCarousel'
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <JumbotronCarousel />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}