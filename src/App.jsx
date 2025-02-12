import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Spinner from "./components/Spinner";
import { GlobalHistory } from "./components/GlobalHistory";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner size={100} />}>
        <Toaster position="top-right" />
        <GlobalHistory />
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;