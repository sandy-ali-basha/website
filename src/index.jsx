import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import RTLProvider from "theme/provider/RTLProvider";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
// * router
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import defaultImg from "assets/images/defaultImg.jpg";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
// 🔹 GLOBAL image fallback
function checkBackgroundImages() {
  document.querySelectorAll('[style*="background-image"]').forEach((el) => {
    const bg = el.style.backgroundImage;
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    if (!match) return;

    const url = match[1];
    const img = new Image();

    img.onerror = () => {
      el.style.backgroundImage = `url("${defaultImg}")`;
    };

    img.src = url;
  });
}
// run once on load
window.addEventListener("load", checkBackgroundImages);
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = defaultImg;
    }
  },
  true
);
// run again after route changes (SPA)
setTimeout(checkBackgroundImages, 500);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RTLProvider>
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId="775752714909-g4p45dg1brh27oje43v3a4ct397joa8s.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SnackbarProvider>
  </RTLProvider>
);

reportWebVitals();
