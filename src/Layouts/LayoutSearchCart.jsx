import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function LayoutSearchCart() {
    return (
        <>
            <Header />
            <main>
                <BackButton />
                <Outlet />
            </main>
            <Footer />
        </>
    )
}