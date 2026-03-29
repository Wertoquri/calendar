import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
  loading: false,
  error: null
}

// Async thunks must be defined before the slice
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/events", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      }
    })
    const result = await response.json()
    if (!response.ok) {
      return rejectWithValue({ error: result.error })
    }
    return result
  } catch (error) {
    throw error
  }
})

export const addNewEvent = createAsyncThunk("events/addNewEvent", async (data, { getState, rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      },
      body: JSON.stringify({
        title: data.title,
        date: data.date,
        time: data.time,
        color: data.color
      })
    })
    const result = await response.json()
    if (!response.ok) {
      return rejectWithValue({ error: result.error })
    }
    return result
  } catch (error) {
    throw error
  }
})

export const updateEvent = createAsyncThunk("events/updateEvent", async ({ id, ...data }, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/event/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      },
      body: JSON.stringify({
        title: data.title,
        date: data.date,
        time: data.time,
        color: data.color
      })
    })
    const result = await response.json()
    if (!response.ok) {
      return rejectWithValue({ error: result.error })
    }
    return result
  } catch (error) {
    throw error
  }
})

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/event/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      }
    })
    const result = await response.json()
    if (!response.ok) {
      return rejectWithValue({ error: result.error })
    }
    return id
  } catch (error) {
    throw error
  }
})

const EventsReducer = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload]
    },
    setEvents: (state, action) => {
      state.events = action.payload
    },
    clearEvents: (state) => {
      state.events = []
    }
  },
  extraReducers: (builder) => {
    // Fetch events
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.error || action.error.message
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false
      state.events = action.payload
    })
    // Add event
    builder.addCase(addNewEvent.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addNewEvent.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.error || action.error.message
    })
    builder.addCase(addNewEvent.fulfilled, (state, action) => {
      state.loading = false
      state.events = action.payload
    })
    // Update event
    builder.addCase(updateEvent.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.error || action.error.message
    })
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.loading = false
      state.events = action.payload
    })
    // Delete event
    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.error || action.error.message
    })
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false
      state.events = state.events.filter(event => event.id !== action.payload)
    })
  }
})

export const { addEvent, setEvents, clearEvents } = EventsReducer.actions

export default EventsReducer.reducer