import React, { useEffect } from "react";
import { applycustomCss } from "../lib/customCss";

// 수정할 수 있는 기본 구현 예시입니다.
function Root({ children }) {
  useEffect(() => {
    applycustomCss();
  }, []);
  return <>{children}</>;
}

export default Root;
