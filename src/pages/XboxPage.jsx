import XboxProducts from "../components/PrincipalPageComponents/XboxProducts"
import XboxConsoles from "../components/PrincipalPageComponents/categoriesXbox/XboxConsoles"
import XboxAccessories from "../components/PrincipalPageComponents/categoriesXbox/XboxAccessories"
import XboxGames from "../components/PrincipalPageComponents/categoriesXbox/XboxGames"

export default function XboxPage() {
    return (
        <>
            <div className="xbox-products-container">
                <div className='xbox-products-container-2'>
                    <h2 className='xbox-h2'>Benvenuto nel mondo Xbox</h2>
                    < XboxProducts />
                    <XboxConsoles />
                    <XboxAccessories />
                    <XboxGames />
                </div>
            </div>
        </>
    )
}