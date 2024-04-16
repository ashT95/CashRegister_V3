import { createSlice } from "@reduxjs/toolkit";
import { LOCALE_EN, LOCALE_ES } from "../../utils/constants";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		quantity: 0,
		cartItems: [],
		totalAmount: 0,
		checkout: false,
		locale: 'all',
	},
	reducers: {
		addToCart: (state, { payload }) => {
			const doesItemExist = state.cartItems.find(
				(item) => item.id === payload.id
			);
			if (!doesItemExist) {
				state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
			} else {
				let i;
				let q;
				state.cartItems.map((item, index) => {
					if (item.id === payload.id) {
						i = index
						item.quantity += 1
						q = item.quantity
					} 
				});

				state.cartItems.splice(i, 1)
				state.cartItems = [...state.cartItems, {...payload, quantity: q}]
		
				
			}

			state.quantity++;
			state.totalAmount += payload.price;
		},

		removeFromCart: (state, { payload }) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== payload.id
			);
			state.quantity -= payload.quantity;
			state.totalAmount -= payload.price * payload.quantity;
		},

		subtractItemQuantity: (state, { payload }) => {
			const subItem = state.cartItems.find((item) => item.id === payload.id);
			if (subItem.quantity === 1) {
				state.cartItems = state.cartItems.filter(
					(item) => item.id !== subItem.id
				);
			} else {
				subItem.quantity -= 1;
			}
			state.quantity--;
			state.totalAmount -= subItem.price;
		},
		removeLast: (state, { payload }) => {
			const subItem = state.cartItems.find((item) => item.id === payload.id);
			if (subItem.quantity === 1) {
				state.cartItems = state.cartItems.filter(
					(item) => item.id !== subItem.id
				);
			} else {
				subItem.quantity -= 1;
			}
			state.quantity--;
			state.totalAmount -= subItem.price;
		},
		clearAllItems: (state, { payload }) => {
			state.cartItems = []
			state.totalAmount = 0
			state.checkout = false
			state.quantity = 0
		},
		setCheckout: (state, { payload }) => {
			state.checkout = payload
		},
		setLocale: (state, {payload}) => {
			state.locale = payload
		}
	},
});

export const {
	addToCart,
	removeFromCart,
	addItemQuantity,
	subtractItemQuantity,
	removeLast,
	clearAllItems,
	setCheckout,
	setLocale
} = cartSlice.actions;

export default cartSlice.reducer;
