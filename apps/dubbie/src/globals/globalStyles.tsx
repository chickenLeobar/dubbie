import React from "react";
import { css, Global } from "@emotion/react";
function globalStyles() {
  return (
    <Global
      styles={css`
        body {
          overflow-x: hidden;
        }
      `}
    />
  );
}

export default globalStyles;
