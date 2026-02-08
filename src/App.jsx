import React, { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import Modal from './components/Modal/Modal.jsx'
import { LuCalendarPlus2 } from "react-icons/lu";
import StorageProvider from './store/ContextStore.jsx';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  let [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <BrowserRouter>
      <StorageProvider>
        <Header />
        <Main />
        <Footer />
        {modalIsOpen && <Modal open={setModalIsOpen} />}
        <button className='addButton' onClick={() => setModalIsOpen(true)}><LuCalendarPlus2 /></button>
      </StorageProvider>
    </BrowserRouter>
  )
}

