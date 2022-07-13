
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



export const asyncReduxFunction = createAsyncThunk(
  'user/asyncReduxFunction',
  async (userId, thunkAPI) => {
    console.log('Parameter:', userId);
    console.log('thunkAPI:', thunkAPI);
  }
)


const initialState = {
  userName:'',
  userId:null,
  meetingId:null,
}

const auth = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.meetingId = action.payload.meetingId;
      
    },
    clearUser: (state, action) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    }
  },


  extraReducers: {
    [asyncReduxFunction.pending]: (state, action) => {},
    [asyncReduxFunction.fulfilled]: (state, action) => {},
    [asyncReduxFunction.rejected ]: (state, action) => {},
  },
  
})

export const { 
  setUser,
  clearUser
} = auth.actions

export default auth.reducer