import { createSlice } from "@reduxjs/toolkit";
import { LOCALE_EN, LOCALE_ES } from "../../utils/constants";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		quantity: 0,
		cartItems: [],
		totalAmount: 0,
		checkout: false,
		locale: LOCALE_EN,
	},
	reducers: {
		addToCart: (state, { payload }) => {
			const doesItemExist = state.cartItems.find(
				(item) => item.id === payload.id
			);
			if (!doesItemExist) {
				state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
			} else {
				state.cartItems = state.cartItems.map((item) => {
					if (item.id === payload.id) {
						return { ...item, quantity: item.quantity + 1 };
						// item.quantity += 1
					} else {
						return item;
					}
				});
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

		addItemQuantity: (state, { payload }) => {
			state.cartItems = state.cartItems.map((item) => {
				if (item.id === payload.id) {
					return { ...item, quantity: item.quantity + 1 };
				} else {
					return item;
				}
			});
			state.quantity++;
			state.totalAmount += payload.price;
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
