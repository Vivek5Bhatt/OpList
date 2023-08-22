import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LayoutComponent from "@/components/Dashboard/layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store, persistor } from "@/utlis/state/store/store";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const withoutAuthPages = [
    "/",
    "/register",
    "/plan",
    "/forgot-password",
    "/reset-password/[email]",
  ];
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!withoutAuthPages.includes(router.pathname) ? (
          <LayoutComponent>
            <Component {...pageProps} />
            <ToastContainer theme="colored" autoClose={2000} />
          </LayoutComponent>
        ) : (
          <GoogleOAuthProvider
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
          >
            <Component {...pageProps} />
            <ToastContainer theme="colored" autoClose={2000} />
          </GoogleOAuthProvider>
        )}
      </PersistGate>
    </Provider>
  );
};

export default App;
