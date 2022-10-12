import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html{
        margin: 0;
        padding: 0;
        font-size: 16px;
    }
    body{
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      width: 100vw;
    }
    h1{
        font-family:   sans-serif;
        margin: 0;
        padding: 0;   
    }
    p{
        margin: 0;
        padding: 0;
        }
    hr{
        margin: 6px 0;
        width: 100%;
        border: 1px solid var(--g-color-background)
        }
    h2{
      margin: 0;
      padding: 0;
    }
    h3{
        margin: 0;
        padding: 0;
    }
    ul{
      display: flex;
      align-items: space-evenly;
      grid-gap: 12px;
      width: 100%;
      height: 100%
    }
    
    p{
        font-family: sans-serif;
        margin: 0;
        padding: 0;
    }
    pre{
        font-family: sans-serif;
        margin: 0;
        padding: 0;
    }
    li{
        list-style: none;
        height: min-content;
    }
    ul{
        list-style  : none;
        margin: 0;
        padding: 0;
        width: min-content;
    }
    input:focus{
        outline: none;
    }
    
`;
