
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
      url: `${import.meta.env.VITE_API_URL}remove_manhwa`,
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
      console.log(res);
      return res;
    }).catch((err) => {
      console.log(err);
    })
  },
  removeManhwaHistory: async (title: string, email: string) => {
    return await $.get(`${import.meta.env.VITE_API_URL}remove_history?url=${title}&email=${email}`);
  },
  getManhwaHistory: async (): Promise<ManhwaDataType[]> => {
    const email = await userApi.getUser();
    if (!email)
      return [];
    return await $.get(`${import.meta.env.VITE_API_URL}get_history?&email=${email}`).then(res => {
      return res.data.manhwa;
    });
  },
  getManhwaHistorySaved: async (): Promise<ManhwaDataType[] | void> => {
    const email = await userApi.getUser();
    if (!email)
      return;
    return await $.get(`${import.meta.env.VITE_API_URL}get_manhwa?&email=${email}`).then((res) => {
      return res.data.manhwa;
    });
  }
}
