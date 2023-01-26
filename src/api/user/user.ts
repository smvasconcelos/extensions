const AMBIENT = import.meta.env.VITE_AMBIENT;

export const userApi = {
  logInLocal: async (email: string): Promise<void> => {
    if (AMBIENT == 'DEV') return
    chrome.storage.sync.set({ 'email': email }, function () { });
  },
  resetUser: async (): Promise<void> => {
    if (AMBIENT == 'DEV') return
    chrome.storage.sync.set({ 'email': "" }, function () { });
  },
  getUser: async (): Promise<string> => {
    if (AMBIENT == 'DEV') return 'smvasconcelos11@gmail.com'
    return await chrome.storage.sync.get('email').then((res) => {
      return res.email;
    });
  },
  setStats: async (manhwaCount: number, historyCount: number): Promise<void> => {
    if (AMBIENT == 'DEV') return
    chrome.storage.sync.set({ 'stats': { manhwaCount, historyCount } }, function () { });
  },
  getStats: async (): Promise<{ manhwaCount: number, historyCount: number } | void> => {
    if (AMBIENT == 'DEV') return await console.log();
    return await chrome.storage.sync.get('stats').then((res) => {
      return res.stats;
    });
  },
  resetStats: async (): Promise<void> => {
    if (AMBIENT == 'DEV') return
    chrome.storage.sync.set({ 'stats': "" }, function () { });
  },
}
