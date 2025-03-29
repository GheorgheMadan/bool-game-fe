import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function LayoutSearchCart() {
    return (
        <>
            <Header />
            <main><div className="sfondo">
                <Outlet />
            </div>
            </main>
            <Footer />
        </>
    )
}