// import { getUser, logInLocal, resetUser } from "../../src/lib/user";
const logInLocal = async (email) => {

	chrome.storage.sync.set({ 'email': email }, function () { });

}
const resetUser = async () => {

	chrome.storage.sync.set({ 'email': "" }, function () { });

}
const getUser = async () => {

	return await chrome.storage.sync.get('email').then((res) => {
		return res.email;
	});

}

$(document).ready(async function () {

	const user = await getUser();

	if (!user) {

		$("#app").append(`
			<div class="app bg-dark bg-gradient p-4">
				<img style="height: 75px; width: auto;" src="./assets/icon128.png" class="img-fluid rounded mx-auto m-2" alt="logo">
				<div class="input-group has-validation">
					<input type="text" class="form-control" id="email" aria-describedby="inputGroupPrepend" >
				</div>
				<button id="login" type="button" class="btn btn-warning mt-1">Set Key</button>
			</div>
		`);

	} else {

		$("#app").append(`
			<div class="app bg-dark bg-gradient p-4">
				<img id="page" style="height: 75px; width: auto;" src="./assets/icon128.png" class="img-fluid rounded mx-auto m-2" alt="logo">
				<div class="input-group has-validation">
					<input value="${user}" type="text" class="form-control" readonly id="email" aria-describedby="inputGroupPrepend" >
				</div>
				<button id="reset" type="button" class="btn btn-warning  mt-1">Reset Key</button>
			</div>
		`);

	}

	$("body").on("click", "button#login", () => {
		const email = $("#email").val();
		$.get(`https://manhwa-tracker.herokuapp.com/check_and_create_user/?&email=${email}`)
			.then(
				(res) => {
					console.log(res);
					logInLocal(email);
					window.close();
				})
			.catch(
				err => {
					// alert("why error");
					alert(err.data.message)
					console.log(err.data.message);
				});
	});


	$("body").on("click", "button#reset", () => {
		window.close();
		resetUser();
	});

	$("body").on("click", "img#page", () => {
		chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
	});

});
