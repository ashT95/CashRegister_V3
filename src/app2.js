import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "./app.global.css";
import PaymentPage from "./app/pages/paymentPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/redux/store";

export default function App2() {

	return (
		<div>
			<Provider store={store}>
				<PaymentPage />
			</Provider>
		</div>
	);
}
