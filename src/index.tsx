import { AppContainer } from "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";

import EditableSortableTable from "App";

const rootEl = document.getElementsByClassName("table-test")[0];
ReactDOM.render(
  <AppContainer>
      <EditableSortableTable />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept("./App", () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require("./App").default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}