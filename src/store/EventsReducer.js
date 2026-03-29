import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
  loading: false,
  error: null
};

const EventsReducer = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload]
    }
  },
  extraReducers: (builders) => {
    builders.addCase(addNewEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builders.addCase(addNewEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    })
    builders.addCase(addNewEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload
    })
  }
});

export const addNewEvent = createAsyncThunk("events/addNewEvent", async (data, { getState, rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      },
      body: JSON.stringify(data)
    })
    let result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ error: result.error})
    }
    return result
  }
  catch (error) {
    throw error
  }
})

export const { addEvent } = EventsReducer.actions

export default EventsReducer.reducer