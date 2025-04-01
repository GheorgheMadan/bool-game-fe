// import delle librerie necessarie per le rotte dell'app
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

// import del GlobalContext e CartContext
import { GlobalProvider } from './contexts/GlobalContext';
import { CartProvider } from './contexts/CartContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
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
import NotFoundPage from "./pages/NotFoundPage";

// import categorie Playstation
import PlaystationAccessoriesPage from './pages/categoriesPages/PlaystationAccessoriesPage';
import PlaystationConsolesPage from './pages/categoriesPages/PlaystationConsolesPage';
import PlaystationGamesPage from './pages/categoriesPages/PlaystationGamesPage';
// import categorie xbox 
import XboxAccessoriesPage from './pages/categoriesPages/XboxAccessoriesPage';
import XboxConsolesPage from './pages/categoriesPages/XboxConsolePage';
import XboxGamesPage from './pages/categoriesPages/XboxGamesPage';
// import categorie nintendo
import NintendoAccessoriesPage from './pages/categoriesPages/NintendoAccessoriesPage';
import NintendoConsolesPage from './pages/categoriesPages/NintendoConsolesPage';
import NintendoGamesPage from './pages/categoriesPages/NintendoGamesPage';

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
            <CheckoutProvider>
              <BrowserRouter>
                <Elements stripe={stripePromise}>
                  <Routes>
                    <Route element={<DefaultLayout />}>
                      <Route index element={<HomePage />} />
                      <Route path='/playstation' element={<PlaystationPage />} />
                      <Route path='/xbox' element={<XboxPage />} />
                      <Route path='/nintendo' element={<NintendoPage />} />
                      <Route path='/checkout' element={<CheckoutPage stripePromise={stripePromise} />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route element={<LayoutSearchCart />}>
                      <Route path='/search' element={<SearchResultPage />} />
                      <Route path='/cart' element={<CartPage />} />
                      <Route path='/products/:productId' element={<SingleProduct />} />
                      {/* ROTTE DELLE CATEGORIE PLAYSTATION  */}
                      <Route path='/playstation/consoles' element={<PlaystationConsolesPage />} />
                      <Route path='/playstation/games' element={<PlaystationGamesPage />} />
                      <Route path='/playstation/accessories' element={<PlaystationAccessoriesPage />} />
                      {/* ROTTE DELLE CATEGORIE XBOX */}
                      <Route path='/xbox/console' element={<XboxConsolesPage />} />
                      <Route path='/xbox/games' element={<XboxGamesPage />} />
                      <Route path='/xbox/accessories' element={<XboxAccessoriesPage />} />
                      {/* ROTTE DELLE CATEGORIRE NINTENDO */}
                      <Route path='/nintendo/consoles' element={<NintendoConsolesPage />} />
                      <Route path='/nintendo/games' element={<NintendoGamesPage />} />
                      <Route path='/nintendo/accessories' element={<NintendoAccessoriesPage />} />
                    </Route>
                  </Routes>
                </Elements>
              </BrowserRouter>
            </CheckoutProvider>
          </CartProvider>
        </GlobalProvider>
      </GlobalContextResults.Provider>
    </>
  );
}


export default App;