// @ts-ignore
window.process = window.process || { env: { NODE_ENV: "production" } };
window.process.env = import.meta.env || {};
import ReactDOM from "react-dom/client";
import { App } from "./components/ReactSPA";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
