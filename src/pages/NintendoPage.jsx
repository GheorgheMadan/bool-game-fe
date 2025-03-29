import NintendoProducts from "../components/PrincipalPageComponents/NintendoProducts"
import NintendoConsoles from "../components/PrincipalPageComponents/categoriesNintendo/NintendoConsoles"
import NintendoGames from "../components/PrincipalPageComponents/categoriesNintendo/NintendoGames"
import NintendoAccessories from "../components/PrincipalPageComponents/categoriesNintendo/NintendoAccessories"
export default function XboxPage() {
    return (
        <>
            <div className="nintendo-products-container">
                <div className='nintendo-products-container-2'>
                    <h2 className='nintendo-h2'>Benvenuto nel mondo Nintendo</h2>
                    <NintendoProducts />
                    <NintendoConsoles />
                    <NintendoAccessories />
                    <NintendoGames />
                </div>
            </div>
        </>
    )
}