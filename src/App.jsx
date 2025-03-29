// import delle librerie necessarie per le rotte dell'app
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

// import del GlobalContext e CartContext
import { GlobalProvider } from './contexts/GlobalContext';
import { CartProvider } from './contexts/CartContext';
import GlobalContextResults from './contexts/GlobalContextResult';

// import di Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

// import del layout di default
import DefaultLayout from './Layouts/DefaultLayout'
import LayoutSearchCart from './Layouts/LayoutSearchCart';

// import delle pagine
import HomePage from './pages/HomePage'
import XboxPage from './pages/XboxPage'
import PlaystationPage from './pages/PlaystationPage'
import NintendoPage from './pages/NintendoPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SingleProduct from './components/SingleProduct';
import SearchResultPage from './pages/SearchResultPage';

// import categorie Playstation
import PlaystationConsoles from './components/PrincipalPageComponents/categoriesPlaystation/PlaystationConsoles'
import PlaystationGames from './components/PrincipalPageComponents/categoriesPlaystation/PlaystationGames'
import PlaystationAccessories from './components/PrincipalPageComponents/categoriesPlaystation/PlaystationAccessories'
// import categorie xbox 
import XboxConsoles from './components/PrincipalPageComponents/categoriesXbox/XboxConsoles';
import XboxAccessories from './components/PrincipalPageComponents/categoriesXbox/XboxAccessories';
import XboxGames from './components/PrincipalPageComponents/categoriesXbox/XboxAccessories';
// import categorie nintendo
import NintendoConsoles from './components/PrincipalPageComponents/categoriesNintendo/NintendoConsoles';
import NintendoAccessories from './components/PrincipalPageComponents/categoriesNintendo/NintendoAccessories';
import NintendoGames from './components/PrincipalPageComponents/categoriesNintendo/NintendoGames';

// carica Stripe con la chiave pubblica
const stripePromise = loadStripe('pk_test_51R4oHvPXYjIqouRcxeNvWgRuFnQ1vo8PlqPEzVS6mDT2ix4nlzdDPaqwSVD5oHDfiTx0xdfcL0IzUQTsy4IU1bvA0079IF49Us');

function App() {
  const [results, setResults] = useState([]);
  return (
    <>
      <GlobalContextResults.Provider value={{ results, setResults }}>
        {/* Avvolgo l'intera app con il GlobalProvider e CartProvider */}
        <GlobalProvider>
          <CartProvider>
            <BrowserRouter>
              <Elements stripe={stripePromise}>
                <Routes>
                  <Route element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/playstation' element={<PlaystationPage />} />
                    <Route path='/xbox' element={<XboxPage />} />
                    <Route path='/nintendo' element={<NintendoPage />} />
                    <Route path='/checkout' element={<CheckoutPage stripePromise={stripePromise} />} />
                  </Route>
                  <Route element={<LayoutSearchCart />}>
                    <Route path='/search' element={<SearchResultPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/products/:productId' element={<SingleProduct />} />
                    <Route path='/playstation/consoles' element={<PlaystationConsoles />} />
                    <Route path='/playstation/games' element={<PlaystationGames />} />
                    <Route path='/playstation/accessories' element={<PlaystationAccessories />} />
                    <Route path='/xbox/console' element={<XboxConsoles />} />
                    <Route path='/xbox/games' element={<XboxGames />} />
                    <Route path='/xbox/accessories' element={<XboxAccessories />} />
                    <Route path='/nintendo/consoles' element={<NintendoConsoles />} />
                    <Route path='/nintendo/games' element={<NintendoGames />} />
                    <Route path='/nintendo/accessories' element={<NintendoAccessories />} />
                  </Route>
                </Routes>
              </Elements>
            </BrowserRouter>
          </CartProvider>
        </GlobalProvider>
      </GlobalContextResults.Provider>
    </>
  );
}


export default App;