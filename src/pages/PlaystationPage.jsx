
import PlaystationConsoles from '../components/PrincipalPageComponents/categoriesPlaystation/PlaystationConsoles'
import PlaystationGames from '../components/PrincipalPageComponents/categoriesPlaystation/PlaystationGames'
import PlaystationAccessories from '../components/PrincipalPageComponents/categoriesPlaystation/PlaystationAccessories'
import '../style/PrincipalPageStyle/PlaystationPageStyle.css';


export default function PlaystationPage() {
    return (
        <>

            <div className="playstation-products-container">
                <div className='playstation-products-container-2'>
                    <h2 className='playstation-h2'>Benvenuto nel mondo Playstation</h2>
                    <PlaystationConsoles />
                    <PlaystationAccessories />
                    <PlaystationGames />
                </div>
            </div>
        </>
    )
}