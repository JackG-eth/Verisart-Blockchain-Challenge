import "../css/styles.css";
import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../context";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Web3ContextProvider>
			<>
				<Component {...pageProps} />
			</>
		</Web3ContextProvider>
	);
};

export default App;
