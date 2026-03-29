import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import Modal from './components/Modal/Modal.jsx'
import { LuCalendarPlus2 } from "react-icons/lu";
import StorageProvider from './store/ContextStore.jsx';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uploadTokenFromLocalStorage } from './store/AuthReducer.js';
import { fetchEvents } from './store/EventsReducer.js';

export default function App() {
  let dispatch = useDispatch();
  let token = useSelector((state) => state.auth.token)
  
  useEffect(() => {
    dispatch(uploadTokenFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchEvents());
    }
  }, [dispatch, token]);

  console.log(token)
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

