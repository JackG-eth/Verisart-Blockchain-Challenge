import "../css/styles.css";
import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../context";
import Navbar from "../components/Nav/Nav";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Web3ContextProvider>
			<>
				<Navbar />
				<Component {...pageProps} />
			</>
		</Web3ContextProvider>
	);
};

export default App;
