// import delle librerie necessarie per le rotte dell'app
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import di Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

// import del layout di default
import DefaultLayout from './Layouts/DefaultLayout'

// import delle pagine
import HomePage from './pages/HomePage'
import XboxPage from './pages/XboxPage'
import PlaystationPage from './pages/PlaystationPage'
import NintendoPage from './pages/NintendoPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductPage from './pages/ProductPage'

// import del GlobalContext
import { GlobalProvider } from './contexts/GlobalContext'


// carica Stripe con la chiave pubblica
const stripePromise = loadStripe('pk_test_51R4oHvPXYjIqouRcxeNvWgRuFnQ1vo8PlqPEzVS6mDT2ix4nlzdDPaqwSVD5oHDfiTx0xdfcL0IzUQTsy4IU1bvA0079IF49Us');

function App() {
  return (
    <>
      {/* Avvolgiamo l'intera app con il GlobalProvider */}
      <GlobalProvider>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/playstation' element={<PlaystationPage />} />
                <Route path='/xbox' element={<XboxPage />} />
                <Route path='/nintendo' element={<NintendoPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/product' element={<ProductPage />} />
                <Route path='/checkout' element={<CheckoutPage stripePromise={stripePromise} />} />
              </Route>
            </Routes>
          </Elements>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}
export default App;
