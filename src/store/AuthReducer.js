import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    loading: false,
    error: null,
    user: null
}

const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    uploadTokenFromLocalStorage: (state) => {
        const token = localStorage.getItem('token')
        state.token = token || null
    },
    setToken: (state, action) => {
        state.token = action.payload
        localStorage.setItem('token', action.payload)
    },
    removeToken: (state) => {
        state.token = null
        state.user = null
        localStorage.removeItem('token')
    },
    setUser: (state, action) => {
        state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.error || action.error?.message || 'Login failed'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.error = null
        localStorage.setItem('token', action.payload.token)
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.error || action.error?.message || 'Registration failed'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        // After successful registration, login automatically
        if (action.payload?.token) {
          state.token = action.payload.token
          localStorage.setItem('token', action.payload.token)
        }
      })
  }
})

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (!response.ok) {
        return rejectWithValue(result.message || 'Login failed')
      }
      return result
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (!response.ok) {
        return rejectWithValue(result.message || 'Registration failed')
      }
      
      // After successful registration, login automatically
      const loginResponse = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email, password: data.password })
      })
      const loginResult = await loginResponse.json()
      if (loginResponse.ok) {
        return loginResult
      }
      return result
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const { uploadTokenFromLocalStorage, setToken, removeToken, setUser } = AuthReducer.actions

export default AuthReducer.reducer