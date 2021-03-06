import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../components/TopNav";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import "../../styles/tabs.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
