import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./app.global.css";
import MainPage from "./app/pages/mainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import PaymentPage from "./app/pages/paymentPage";

const queryClient = new QueryClient({
	defaultOptions: {
		cacheTime: 1000 * 60 * 60 * 24,
	},
});

const persister = createSyncStoragePersister({
	storage: window.localStorage,
});


export default function App() {
	return (
		<div className="wrapper">
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister }}
				onSuccess={() => queryClient.invalidateQueries()}
			>
				<Provider store={store}>
					<MainPage queryClient={queryClient} />
					<PaymentPage queryClient={queryClient} />
				</Provider>
			</PersistQueryClientProvider>
		</div>
	);
}
