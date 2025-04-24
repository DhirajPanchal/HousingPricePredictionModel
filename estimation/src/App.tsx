import React from "react";


import "./index.css";

import { Provider } from "react-redux";
import { appStore } from "./store/store";
import ViewContainer from "./component/ViewContainer";

const App = () => (
  <Provider store={appStore}>
    <div className="text-blue-900 text-3xl font-extrabold mb-0 p-2 m-0 place-self-center">
      <h2>Property Value Estimator (Microfrontend/Remote-1)</h2>
    </div>
    <div className="flex justify-center">
      <ViewContainer />
    </div>
  </Provider>
);

export default App;
