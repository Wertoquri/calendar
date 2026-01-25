import React, { createContext, useEffect, useState } from 'react'

export const ContextStore = createContext()

export default function StoreProvider({ children }) {
    let [events, setEvents] = useState(localStorage.getItem("events") || [])
    const addEvent = (event) => {
        setEvents([...events, event])
    }

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
    }, [events])
    return (
        <ContextStore.Provider value={{ events, addEvent }}>
            {children}
        </ContextStore.Provider>
    )
}
