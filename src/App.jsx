import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import Modal from './components/Modal/Modal.jsx'
import { LuCalendarPlus2 } from "react-icons/lu";
import { useSelector, useDispatch } from 'react-redux';
import { uploadTokenFromLocalStorage } from './store/AuthReducer.js';
import { fetchEvents } from './store/EventsReducer.js';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        // Upload token from localStorage on app start
        dispatch(uploadTokenFromLocalStorage());
    }, [dispatch]);

    useEffect(() => {
        // Fetch events when token is available
        if (token) {
            dispatch(fetchEvents());
        }
    }, [token, dispatch]);

    return (
        <BrowserRouter>
            <Header />
            <Main />
            <Footer />
            {modalIsOpen && <Modal open={setModalIsOpen} setOpen={setModalIsOpen} />}
            <button className='addButton' onClick={() => setModalIsOpen(true)}>
                <LuCalendarPlus2 />
            </button>
        </BrowserRouter>
    )
}

