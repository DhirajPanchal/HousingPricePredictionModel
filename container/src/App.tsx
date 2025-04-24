import React, { Suspense } from "react";
import "./index.css";
import NavBar from "./component/NavBar";
import Loader from "./component/Loader";
import { Routes, Route } from "react-router-dom";
import NotFound from "./component/NotFound";
import { Provider } from "react-redux";
import { appStore } from "./store/store";
import Home from "./component/Home";

const EstimationRemoteApp = React.lazy(
  () => import("estimation/EstimationApp")
);
const AnalysisRemoteApp = React.lazy(() => import("analysis/AnalysisApp"));

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <NavBar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estimation/*" element={<EstimationRemoteApp />} />
            <Route path="/analysis/*" element={<AnalysisRemoteApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
