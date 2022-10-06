import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./cssconfigs/config.css";
import "./cssconfigs/color.css";
import "./cssconfigs//functions.css";
import "./cssconfigs/font.css";
import "./cssconfigs/input-forms.css";
import "./cssconfigs/modalsettings.css";
import "react-notifications/lib/notifications.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContainer } from "react-notifications";

const store = configureStore();
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchInterval: 10000,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>

			<NotificationContainer />
		</Provider>
	</QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
