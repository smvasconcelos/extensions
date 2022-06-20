'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;

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

$(document).ready(function () {

	if (tracker.some((item) => window.location.hostname.includes(item))) {

		$("body").append(`

			<div class="action-container">
					<img style="width: 50px; height: 50px;" src="https://i.imgur.com/uwQt9XE.png" />
			</div/>

		`);

		$("body").on("click", "div.action-container", function (e) {

			const title = window.location.href;
			const email = "smvasconcelos11@gmail.com";

			$.get(`https://manhwa-tracker.herokuapp.com/add_manhwa?url=${title}&email=${email}`).then((res) => {
				// console.log(res);
			}).catch(err => {
				// console.log(err);
			});

		});

	}

});
