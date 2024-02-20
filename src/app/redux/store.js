import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import paymentReducer from "./slices/payment";

import {
	createStateSyncMiddleware,
	initMessageListener,
} from "redux-state-sync";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		payment: paymentReducer,
	},
	middleware: [createStateSyncMiddleware()],
});
initMessageListener(store);

export default store
