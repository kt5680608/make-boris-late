import { createGlobalStyle } from "styled-components";

import RFLEXREGULAR from "./R-FLEX-REGULAR.woff2";
import RFLEXBLACK from "./R-FLEX-BLACK.woff2";

export const FontStyles = createGlobalStyle`		    
  @font-face{
    font-family: "R-FLEX-REGULAR";
    src: url(${RFLEXREGULAR}) format('woff2');
  }
  @font-face{
    font-family: "R-FLEX-BLACK";
    src: url(${RFLEXBLACK}) format('woff2');
  }
  
`;
