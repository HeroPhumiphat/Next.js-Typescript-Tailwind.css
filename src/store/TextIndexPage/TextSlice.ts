import { createSlice } from '@reduxjs/toolkit'

interface TypeValue {
    value: string;
}

const initialState: TypeValue = {
    value: 'HeroPhumiphat.'
}

const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        addText: (state, action: {payload: string}) => {
            state.value = action.payload
        }
    }
})

export const { addText } = textSlice.actions
export default textSlice.reducer;