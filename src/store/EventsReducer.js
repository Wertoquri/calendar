import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    events: [],
    loading: false,
    error: null
}

// Fetch events from server
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result.message || 'Failed to fetch events')
            }
            return result.events
        } catch (error) {
            return rejectWithValue(error.message || 'Network error')
        }
    }
)

// Add new event
export const addEvent = createAsyncThunk(
    'events/addEvent',
    async (eventData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventData)
            })
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result.message || 'Failed to add event')
            }
            return result.event
        } catch (error) {
            return rejectWithValue(error.message || 'Network error')
        }
    }
)

// Delete event
export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (eventId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result.message || 'Failed to delete event')
            }
            return eventId
        } catch (error) {
            return rejectWithValue(error.message || 'Network error')
        }
    }
)

const EventsReducer = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch events
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || action.error.message
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            // Add event
            .addCase(addEvent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || action.error.message
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.loading = false
                state.events.push(action.payload)
            })
            // Delete event
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(e => e.id !== action.payload)
            })
    }
})

export const { setEvents, clearError } = EventsReducer.actions

export default EventsReducer.reducer