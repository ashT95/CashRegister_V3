import { createSlice } from "@reduxjs/toolkit";

let images = {}

const productSlice = createSlice({
	name: "product",
	initialState: {
		data: [],
		categoriesData: [],
        images: {},
		cartTextData: [],
		receiptTextData: [],
		paymentTextData: [],
	},
	reducers: {
		setData: (state, { payload }) => {
			return {...state, data: payload}
		},
		setCategories: (state, { payload }) => {
			return {...state, categoriesData: payload}
		},
        setImages: (state, {payload}) => {
			images = state.images;

            if (payload.id) {
                images[payload.id] = payload.blob;
            }

	
        },
		setCartText: (state, { payload }) => {
			return {...state, cartTextData: payload}
		},
		setReceiptText: (state, { payload }) => {
			return {...state, receiptTextData: payload}
		},
		setPaymentText: (state, { payload }) => {
			return {...state, paymentTextData: payload}
		},
	},
});

export const { setData, setImages, setCartText, setReceiptText, setPaymentText, setCategories  } = productSlice.actions;

export default productSlice.reducer;
