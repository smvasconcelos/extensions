export const logInLocal = async (email) => {

	chrome.storage.sync.set({ 'email': email }, function () { });

}
export const resetUser = async () => {

	chrome.storage.sync.set({ 'email': "" }, function () { });

}
export const getUser = async () => {

	return await chrome.storage.sync.get('email').then((res) => {
		return res.email;
	});

}
