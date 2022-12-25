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
  },
  setStats: async (manhwaCount: number, historyCount: number): Promise<void> => {
    chrome.storage.sync.set({ 'stats': { manhwaCount, historyCount } }, function () { });
  },
  getStats: async (): Promise<{ manhwaCount: number, historyCount: number }> => {
    return await chrome.storage.sync.get('stats').then((res) => {
      return res.stats;
    });
  },
  resetStats: async (): Promise<void> => {
    chrome.storage.sync.set({ 'stats': "" }, function () { });
  },
}
