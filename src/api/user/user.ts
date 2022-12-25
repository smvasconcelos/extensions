export const userApi = {
  logInLocal: async (email: string): Promise<void> => {
    chrome.storage.sync.set({ 'email': email }, function () { });
  },
  resetUser: async (): Promise<void> => {
    chrome.storage.sync.set({ 'email': "" }, function () { });
  },
  getUser: async (): Promise<string> => {
    return await chrome.storage.sync.get('email').then((res) => {
      return res.email;
    });
  }
}
