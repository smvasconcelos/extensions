(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/ContentScript.page.tsx-0fb2d34f.js")
    );
  })().catch(console.error);

})();
