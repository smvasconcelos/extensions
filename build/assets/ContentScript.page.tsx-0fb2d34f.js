import{n as e,R as n,j as t,a as r}from"./emotion-styled.browser.esm-f5ef74c8.js";const c="/assets/icon128-0022192c.png",i=e.div`
  position: fixed;
  top: 20%;
  height: 100vh;
  right: 10px;
`,s=e.img`
  height: 5rem;
  width: auto;
  cursor: pointer;
`;function d(){return t(i,{children:t(s,{src:chrome.runtime.getURL(c)})})}const o=document.createElement("div");o.id="crx-root";document.body.append(o);n.render(t(r.StrictMode,{children:t(d,{})}),o);
