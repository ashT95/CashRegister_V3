import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "./app.global.css";
import PaymentPage from "./app/pages/paymentPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
	defaultOptions: {
		cacheTime: Infinity,
		staleTime: Infinity,
	},
});

const persister = createSyncStoragePersister({
	storage: window.localStorage,
});

export default function App2() {
	return (
		<div>
			<PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
				<Provider store={store}>
					<PaymentPage />
				</Provider>
			</PersistQueryClientProvider>
		</div>
	);
}
