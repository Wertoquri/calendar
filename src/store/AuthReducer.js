import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form';

const initialState = {
    token: null,
    loading: false,
    error: null
}

const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    uploadTokenFromLocalStorage: (state) => {
        state.token = localStorage.getItem('token') || null

    },
    setToken: (state, action) => {
        state.token = action.payload
        localStorage.setItem('token', action.payload)
    },
    removeToken: (state) => {
        state.token = null
        localStorage.removeItem('token')
    }
  },
  extraReducers: (b) => {
    b.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    b.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message
    })
    b.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
    })
    b.addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    b.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message
    })
    b.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
    })
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (data, {rejectWithValue}) => {
    try{
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let result = await response.json();
        if(!response.ok){
            return rejectWithValue({error: result.message})
        }
        return result
    }catch(error){
        console.log(error)
        throw error
    }
})


export const registerUser = createAsyncThunk("auth/registerUser", async (data, {rejectWithValue, dispatch}) => {
    try{
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let result = await response.json();
        if(!response.ok){
            return rejectWithValue({error: result.message})
        }

        result = await dispatch(loginUser(data))
        return result
    }catch(error){
        console.log(error)
        throw error
    }
})

export const {uploadTokenFromLocalStorage, setToken, removeToken} = AuthReducer.actions

export default AuthReducer.reducer