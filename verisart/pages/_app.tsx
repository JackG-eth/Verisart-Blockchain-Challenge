import "../css/styles.css";
import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../context";
import Navbar from "../components/Nav/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Web3ContextProvider>
			<>
				<Navbar />
				<Component {...pageProps} />
				<ToastContainer position="bottom-right" autoClose={5000} />
			</>
		</Web3ContextProvider>
	);
};

export default App;
