import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function LayoutSearchCart() {
    return (
        <>
            {/* Header che sarà visibile in questa sezione di layout */}
            <Header />
            <main>
                {/* Bottone per tornare alla pagina precedente */}
                <BackButton />
                {/* Outlet per rendere dinamicamente i componenti della route, 
                    il contenuto cambia in base alla route attiva */}
                <Outlet />
            </main>
            {/* Footer che sarà visibile in questa sezione di layout */}
            <Footer />
        </>
    )
}