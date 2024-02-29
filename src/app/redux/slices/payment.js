import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
	name: "payment",
	initialState: {
		show: false,
		paid: 0,
		completed: false,
	},
	reducers: {
		showPayment: (state, { payload }) => {
			state.show = payload;
		},
		addPaymentItem: (state, { payload }) => {
			if (!state.completed) {
				 (state.paid += payload.value);
			}
		},
		resetPayment: (state, { payload }) => {
            state.paid = 0;
			state.completed = false;
		},
        donePayment: (state, { payload  }) => {
            state.completed = true;
        }
	},
});

export const { showPayment, addPaymentItem, resetPayment, donePayment } =
	paymentSlice.actions;

export default paymentSlice.reducer;
