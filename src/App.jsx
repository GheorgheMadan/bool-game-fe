// import delle librerire necessarie per le rotte del app
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import del layout di default
import DefaultLayout from './Layouts/DefaultLayout'

// import delle pagine
import HomePage from './pages/HomePage'
import XboxPage from './pages/XboxPage'
import PLaystationPage from './pages/PlaystationPage'
import NintendoPage from './pages/NintendoPage'
import CartPage from './pages/CartPage'


// import del GlobalContext
import GlobalContext from './contexts/GlobalContext'



function App() {

  return (
    <>
      <GlobalContext.Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/playstation' element={<PLaystationPage />} />
              <Route path='/xbox' element={<XboxPage />} />
              <Route path='/nintendo' element={<NintendoPage />} />
              <Route path='/cart' element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  )
}

export default App
