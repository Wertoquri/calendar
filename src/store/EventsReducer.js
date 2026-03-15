import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    events: []
}

const EventsReducer = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
        state.events = [...state.events, action.payload]
    }
  }
});

export const { addEvent } = EventsReducer.actions

export default EventsReducer.reducer