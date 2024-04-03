import { createSlice } from "@reduxjs/toolkit";

let images = {}

const productSlice = createSlice({
	name: "product",
	initialState: {
		data: {},
        images: {}
	},
	reducers: {
		setData: (state, { payload }) => {
			state.data = payload;
		},
        setImages: (state, {payload}) => {
            images = state.images;

            if (payload.id) {
                images[payload.id] = payload.blob;
            }
        }
	},
});

export const { setData, setImages  } = productSlice.actions;

export default productSlice.reducer;
