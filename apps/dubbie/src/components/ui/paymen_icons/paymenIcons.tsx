import React, { forwardRef, SVGProps, HtmlHTMLAttributes } from "react";
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from "react-icons/fa";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
const PaymentICons = styled.div<{ svgstyles: SerializedStyles }>`
  display: flex;
  justify-content: center;
  svg {
    margin: 10px;
    font-size: 35px;
    ${(props) => props.svgstyles}
  }
`;
type Props = {
  svgstyles?: SerializedStyles;
} & HtmlHTMLAttributes<HTMLDivElement>;
const paymenIcons = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <PaymentICons {...props} svgstyles={props?.svgstyles || css``} ref={ref}>
      <FaCcMastercard />
      <FaCcPaypal />
      <FaCcVisa />
    </PaymentICons>
  );
});

export default paymenIcons;
