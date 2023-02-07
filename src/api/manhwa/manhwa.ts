
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
  removeManhwa: async (data: object, email: string) => {
    return await $.ajax({
      url: `https://manhwa-tracker.onrender.com/remove_manhwa`,
      type: "POST",
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify({
        email: email,
        data: data
      }),
      dataType: 'json',
      processData: false,
    }).then((res) => {
      return res;
    })
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
  },
  addManhwa: async (title: string, email: string, data: object) => {
    return await $.ajax({
      url: `https://manhwa-tracker.onrender.com/add_manhwa`,
      type: "POST",
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify({
        url: title,
        email: email,
        ...data
      }),
      dataType: 'json',
      processData: false,
    }).then((res) => {
      console.log({ res });
      return res;
    }).catch(err => {
      console.log({ err });
      return err;
    });
  },
  addManhwaHistory: async (title: string, email: string) => {
    return await $.get(`https://manhwa-tracker.onrender.com/add_history?url=${title}&email=${email}`).then((res) => {
      console.log(res);
      return res;
    }).catch(err => {
      return err;
    });
  }
}
