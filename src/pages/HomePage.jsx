import '../style/HomePageStyle.css'
import CardHomePage from '../components/CardHomePage'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
    return (
        <>
            <div className='general-container'>
                <CardHomePage />
            </div>
        </>
    )
}