
import $ from "jquery";

export type ManhwaDataType = {
  title: string;
  chapter: number;
  date: string;
  name: string;
  id: string;
  img: string;
}

export const manhwaApi = {
  removeManhwa: async (title: string, email: string) => {
    return await $.get(`https://manhwa-tracker.onrender.com/remove_manhwa?url=${title}&email=${email}`).then((res) => { }).catch(err => {
      return err;
    });
  },
  removeManhwaHistory: async (title: string, email: string) => {
    return await $.get(`https://manhwa-tracker.onrender.com/remove_history?url=${title}&email=${email}`);
  },
  getManhwaHistory: async (): Promise<ManhwaDataType[]> => {
    return await $.get(`https://manhwa-tracker.onrender.com/get_history`).then(res => {
      return res.data;
    });
  },
  getManhwaHistorySaved: async (): Promise<ManhwaDataType[] | void> => {
    // const email = await userApi.getUser();
    // if (!email)
    //   return;
    const email = "smvasconcelos11@gmail.com";
    return await $.get(`https://manhwa-tracker.onrender.com/get_manhwa?&email=${email}`).then((res) => {
      return JSON.parse(res).data.manhwa;
    });
  }
}
