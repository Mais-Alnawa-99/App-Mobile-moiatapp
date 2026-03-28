import { createSlice } from '@reduxjs/toolkit';
import { GetHSCodes } from '../thunk/HSCodes';
const initialState = {
    hSCodes: [],
    totalCount: 20,
    pageNumber: 1,
    pageSize: 20,
    searchText: "",
    isLoading: true,
    status: 'idle',
};

const HSCodes = createSlice({
    name: 'HSCodes',
    initialState,
    reducers: {
        setPageNumber(state, action) {
            state.pageNumber = action.payload;
        },
        setHSCodes(state, action) {
            state.hSCodes = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(GetHSCodes.pending, (state, action) => {
            state.isLoading = true;
        }),
            builder.addCase(GetHSCodes.fulfilled, (state, action) => {
                const newItems = action.payload?.result?.HSCodes || [];

                const existingIds = new Set(state.hSCodes.map(item => item.Id));
                const filteredNewItems = newItems.filter(item => !existingIds.has(item.Id));
                state.hSCodes = [...state.hSCodes, ...filteredNewItems];
                // state.hSCodes = [...state.hSCodes, ...action.payload?.result?.HSCodes]
                state.totalCount = action.payload?.result?.TotalCount;
                state.isLoading = false;
            }),
            builder.addCase(GetHSCodes.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});
export const { setPageNumber, setHSCodes } = HSCodes.actions;
export default HSCodes.reducer;
