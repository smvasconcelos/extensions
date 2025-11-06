'use strict';

const tracker = [
  "readm",
  "asuracomic",
  "reaperscans",
  "mangakakalot",
  "readmanganato",
  "mangasee123",
  "mangagalaxy",
  "manhwaclan",
  "mangadex",
  "nightsup"
];


const setAction = async (user) => {
  if (user !== "") {

    await addManhwaHistory(window.location.href, user);

    $("body").append(`
      <div class="action-container">
          <img style="width: 50px; height: 50px;" src="https://i.imgur.com/uwQt9XE.png" />
      </div/>
    `);

    $("body").on("click", "div.action-container", async function (e) {
      // const user = "smvasconcelos11@gmail.com";
      const title = window.location.href;
      const email = user;
      let data = undefined;

      try {
        data = await getManhwaInfo();
      } catch (e) {
        console.error('Erro getting manhwa info', e);
      }

      if (data)
        await addManhwa(title, email, data);
    });

  } else {
    $(".action-container").remove();
  }
}

$(document).ready(async function () {
  if (tracker.some((item) => window.location.hostname.includes(item))) {
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "email") {
          const user = newValue;
          setAction(user);
        }
      }
    });
    const user = await getUser();
    setAction(user);
  }
});
