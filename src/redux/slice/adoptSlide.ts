import { INotifycationProps } from '@/components/notifycations/Notifycation';
import { IInitAppStoreState, IPet, IPetDetail, IUser } from '@/configs/interface';
import { getTokenFromCookie } from '@/utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// init a store for app

interface IInitAdoptStoreState {
    petAdopt: IPetDetail | null;
}

const initState: IInitAdoptStoreState = {
    petAdopt: null,
};

export const adopt = createSlice({
    name: 'adopt',
    initialState: initState,
    reducers: {
        setPetAdoptId: (state, action: PayloadAction<IPetDetail>) => {
            state.petAdopt = action.payload;
        },
        clearPetAdoptId: (state) => {
            state.petAdopt = null;
        },
    },
});

export const { setPetAdoptId, clearPetAdoptId } = adopt.actions;
export default adopt.reducer;
