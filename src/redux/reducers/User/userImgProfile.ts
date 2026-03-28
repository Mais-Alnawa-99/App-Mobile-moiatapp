import {createSlice} from '@reduxjs/toolkit';

const userImgProfile = createSlice({
  name: 'userImgProfile',
  initialState: {
    userImgProfile: null,
  },
  reducers: {
    setUserImgProfile: (state, action) => {
      state.userImgProfile = action.payload?.userImgProfile;
    },
  },
});

export const {setUserImgProfile} = userImgProfile.actions;
export default userImgProfile.reducer;
