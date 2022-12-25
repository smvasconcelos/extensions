
import $ from "jquery";
import { userApi } from "../user/user";

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
    const email = await userApi.getUser();
    if (!email)
      return [];
    return await $.get(`https://manhwa-tracker.onrender.com/get_history?&email=${email}`).then(res => {
      return JSON.parse(res).data.manhwa;
    });
  },
  getManhwaHistorySaved: async (): Promise<ManhwaDataType[] | void> => {
    const email = await userApi.getUser();
    if (!email)
      return;
    return await $.get(`https://manhwa-tracker.onrender.com/get_manhwa?&email=${email}`).then((res) => {
      return JSON.parse(res).data.manhwa;
    });
  }
}
