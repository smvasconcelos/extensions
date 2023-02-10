import { manhwaApi } from '@/api/manhwa/manhwa';
import { userApi } from '@/api/user/user';
import logoAction from 'assets/icon128.png';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ActionButton, Wrapper } from './ContentScript.styles';
import { getManhwaInfo } from './useContentScript';

export function ContentScript(): JSX.Element {

  const [isTracker, setIsTracker] = useState(false);

  const tracker = [
    "readm",
    "asura",
    "reaperscans",
    "mangakakalot",
    "readmanganato",
    "mangasee123"
  ];

  const addManhwaToFirebase = async () => {
    const email = await userApi.getUser();
    if (email !== "") {
      const title = window.location.href;
      const data = await getManhwaInfo();
      console.log({ data });

      if (data)
        await manhwaApi.addManhwa(title, email, data);
    }
  }

  useEffect(() => {
    const startTracker = async () => {
      if (tracker.some((item) => window.location.hostname.includes(item))) {
        const user = await userApi.getUser();
        setIsTracker(true);
        await manhwaApi.addManhwaHistory(window.location.href, user);
      }
    }
    startTracker();
  }, [])

  return isTracker ? <Wrapper>
    <ActionButton onClick={() => addManhwaToFirebase()} src={chrome.runtime.getURL(logoAction)} />
  </Wrapper> : <></>
}
const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

ReactDOM.render(
  <React.StrictMode>
    <ContentScript />
  </React.StrictMode>,
  root,
)
