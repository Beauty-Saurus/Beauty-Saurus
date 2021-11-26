import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applycustomCss } from "../lib/bsmodules";
import rootReducer from "../modules";

const store = createStore(rootReducer, composeWithDevTools());

// 수정할 수 있는 기본 구현 예시입니다.
function Root({ children }) {
  useEffect(() => {
    applycustomCss();
  }, []);
  return (
    <>
      <Provider store={store}>
        {children}
      </Provider>
    </>
  )
}

export default Root;
