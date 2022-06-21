'use strict';

import { addManhwaHistory } from "./lib/manhwa.js";
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

const setAction = async (val) => {
	if (val !== "") {
		await addManhwaHistory(window.location.href, val);
		$("body").append(`
				<div class="action-container">
						<img style="width: 50px; height: 50px;" src="https://i.imgur.com/uwQt9XE.png" />
				</div/>
			`);
		$("body").on("click", "div.action-container", async function (e) {
			const val = await getUser();
			if (val !== "") {
				const title = window.location.href;
				const email = val;
				// addManhwa(title, email);
			}
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
		const val = await getUser();
		setAction(val);
	}
});

