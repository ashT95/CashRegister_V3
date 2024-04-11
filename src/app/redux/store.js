import {
	configureStore,
	applyMiddleware,
	combineReducers,
} from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import paymentReducer from "./slices/payment";
import productReducer from "./slices/product";

import {
	createStateSyncMiddleware,
	initMessageListener,
} from "redux-state-sync";


const store = configureStore({
	reducer: {
		cart: cartReducer,
		payment: paymentReducer,
		product: productReducer,
	},
	middleware: [createStateSyncMiddleware()],
});
initMessageListener(store);

export default store