import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./app.global.css";
import MainPage from "./app/pages/mainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
	return (
		<div className="wrapper">
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<MainPage />
				</Provider>
			</QueryClientProvider>
		</div>
	);
}
