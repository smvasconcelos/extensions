'use strict';

import { addManhwa } from "./lib/manhwa.js";
import { getUser } from "./lib/user.js";

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    // console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    // console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

const tracker = [
	"readm",
	"asurascans",
	"reaperscans",
	"mangakakalot"
];

$(document).ready(async function () {

	const user = await getUser();

	if (tracker.some((item) => window.location.hostname.includes(item))) {

		if (user !== "") {
			$("body").append(`
				<div class="action-container">
						<img style="width: 50px; height: 50px;" src="https://i.imgur.com/uwQt9XE.png" />
				</div/>

			`);
			$("body").on("click", "div.action-container", async function (e) {
				const user = await getUser();
				if (user !== "") {
					const title = window.location.href;
					const email = user;
					addManhwa(title, email);
				}
			});

		}

	}

});
