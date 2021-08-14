import React from "react";
import { css, Global } from "@emotion/react";

function globalStyles() {
  return (
    <Global
      styles={css`
        body {
          overflow-x: hidden;
        }
        .chakra-toast__inner {
          margin-bottom: 20px;
          background: white;
        }
      `}
    />
  );
}

export default globalStyles;
