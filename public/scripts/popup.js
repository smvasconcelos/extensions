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
			<div class="app bg-dark bg-gradient">
				<img src="./assets/icon48.png" class="img-fluid rounded mx-auto mt-2" alt="logo">
				<div class="input-group has-validation">
					<input type="text" class="form-control" id="email" aria-describedby="inputGroupPrepend" >
				</div>
				<button id="login" type="button" class="btn btn-warning mt-2">Set Key</button>
			</div>
		`);

	} else {

		$("#app").append(`
			<div class="app bg-dark bg-gradient">
				<img src="./assets/icon48.png" class="img-fluid rounded mx-auto mt-2" alt="logo">
				<div class="input-group has-validation">
					<input value="${user}" type="text" class="form-control" readonly id="email" aria-describedby="inputGroupPrepend" >
				</div>
				<button id="reset" type="button" class="btn btn-warning mt-2">Reset Key</button>
			</div>
		`);

	}


	$("body").on("click", "button#login", () => {
		const email = $("#email").val();
		logInLocal(email);
		window.close();
	});

	$("body").on("click", "button#reset", () => {
		window.close();
		resetUser();
	});

});
