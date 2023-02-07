
import { api } from "../server";
import { userApi } from "../user/user";

export interface ManhwaDataType {
  title: string;
  chapter: number;
  date: string;
  name: string;
  id: string;
  img: string;
}

export const manhwaApi = {
  removeManhwa: async (data: object, email: string) => {
    return await api.post('remove_manhwa', {
      params: JSON.stringify({
        email: email,
        data: data
      })
    }).then((res) => {
      return res;
    })
  },
  removeManhwaHistory: async (title: string, email: string) => {
    return await api.get('remove_history', {
      params: {
        url: title,
        email: email
      }
    })
  },
  getManhwaHistory: async (): Promise<ManhwaDataType[]> => {
    const email = await userApi.getUser();
    if (!email)
      return [];
    return await api.get('get_history', {
      params: {
        email: email
      }
    }).then((res) => {
      return res.data.data.manhwa;
    })
  },
  getManhwaHistorySaved: async (): Promise<ManhwaDataType[] | void> => {
    const email = await userApi.getUser();
    if (!email)
      return;
    return await api.get('get_manhwa', {
      params: {
        email: 'smvasconcelos11@gmail.com'
      }
    }).then(res => {
      return res.data.data.manhwa
    })
  },
  addManhwa: async (title: string, email: string, data: object) => {
    return api.post('add_manhwa', {
      params: JSON.stringify({
        url: title,
        email: email,
        ...data
      })
    }).then((res) => {
      console.log({ res });
      return res;
    }).catch(err => {
      console.log({ err });
      return err;
    });
  },
  addManhwaHistory: async (title: string, email: string) => {
    return await api.get('add_history', {
      params: {
        url: title,
        email: email
      }
    }).then((res) => {
      console.log(res);
      return res;
    }).catch(err => {
      return err;
    });
  }
}
