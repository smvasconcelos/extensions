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
