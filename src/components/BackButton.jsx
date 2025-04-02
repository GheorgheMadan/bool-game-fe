import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../style/BackButton.css"

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Se siamo sulla homepage ("/"), non mostrare il pulsante
    if (location.pathname === "/") {
        return null;
    }

    return (
        <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />BACK
        </button>
    );
};

export default BackButton;